import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { Query } from 'node-appwrite';
import { z } from 'zod';

import { DATABASE_ID, FILES_ID } from '@/common/configs';
import sessionMiddleware from '@/common/libs/session-middleware';
import { File } from '@/common/types/files';

const Files = new Hono().get(
  '/',
  sessionMiddleware,
  zValidator('query', z.object({ workspaceId: z.string() })),
  async (c) => {
    const databases = c.get('databases');
    const { workspaceId } = c.req.valid('query');

    if (!workspaceId) {
      return c.json({ error: 'Missing workspaceId' }, 400);
    }

    const files = await databases.listDocuments<File>(DATABASE_ID, FILES_ID, [
      Query.equal('workspaceId', workspaceId),
      Query.orderDesc('$createdAt'),
    ]);

    return c.json({ data: files });
  }
);

export default Files;
