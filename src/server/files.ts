import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { Query } from 'node-appwrite';
import { z } from 'zod';

import { DATABASE_ID, FILES_ID } from '@/common/configs';
import sessionMiddleware from '@/common/libs/session-middleware';
import { type File } from '@/common/types/files';
import { getMember } from '@/common/utils';

const Files = new Hono()
  .get(
    '/',
    sessionMiddleware,
    zValidator('query', z.object({ workspaceId: z.string() })),
    async (c) => {
      const user = c.get('user');
      const databases = c.get('databases');
      const { workspaceId } = c.req.valid('query');

      if (!workspaceId) {
        return c.json({ error: 'Missing workspaceId' }, 400);
      }

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const files = await databases.listDocuments<File>(DATABASE_ID, FILES_ID, [
        Query.equal('workspaceId', workspaceId),
        Query.orderDesc('$createdAt'),
      ]);

      return c.json({ data: files });
    }
  )
  .get('/:fileId', sessionMiddleware, async (c) => {
    const user = c.get('user');
    const databases = c.get('databases');
    const { fileId } = c.req.param();

    const file = await databases.getDocument<File>(
      DATABASE_ID,
      FILES_ID,
      fileId
    );

    const member = await getMember({
      databases,
      workspaceId: file.workspaceId,
      userId: user.$id,
    });

    if (!member) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    return c.json({ data: file });
  })
  .get('/uploadStatus/:fileId', sessionMiddleware, async (c) => {
    const user = c.get('user');
    const databases = c.get('databases');
    const { fileId } = c.req.param();

    const file = await databases.getDocument<File>(
      DATABASE_ID,
      FILES_ID,
      fileId
    );

    const member = await getMember({
      databases,
      workspaceId: file.workspaceId,
      userId: user.$id,
    });

    if (!member) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    return c.json({ data: file.uploadStatus });
  })
  .delete('/:fileId', sessionMiddleware, async (c) => {
    const databases = c.get('databases');
    const { fileId } = c.req.param();

    const existingFile = await databases.getDocument<File>(
      DATABASE_ID,
      FILES_ID,
      fileId
    );

    if (!existingFile) {
      return c.json({ error: 'File not found' }, 400);
    }

    await databases.deleteDocument(DATABASE_ID, FILES_ID, fileId);

    return c.json({ data: { $id: existingFile.$id } });
  });

export default Files;
