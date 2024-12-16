import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { ID, Query } from 'node-appwrite';

import { DATABASE_ID, DOCUMENTS_ID } from '@/common/configs';
import sessionMiddleware from '@/common/libs/session-middleware';
import {
  createDocumentSchema,
  getDocumentsSchema,
  updateDocumentSchema,
} from '@/common/schemas/documents';
import { type Document } from '@/common/types/documents';
import { getMember } from '@/common/utils';

const Documents = new Hono()
  .get(
    '/',
    sessionMiddleware,
    zValidator('query', getDocumentsSchema),
    async (c) => {
      const user = c.get('user');
      const databases = c.get('databases');

      const { workspaceId, limit, cursor } = c.req.valid('query');

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

      // let documents;

      // if (cursor === '') {
      const documents = await databases.listDocuments<Document>(
        DATABASE_ID,
        DOCUMENTS_ID,
        [
          Query.equal('workspaceId', workspaceId),
          Query.orderDesc('$createdAt'),
          Query.limit(Number(limit)),
        ]
      );
      // } else {
      //   documents = await databases.listDocuments<Document>(
      //     DATABASE_ID,
      //     DOCUMENTS_ID,
      //     [
      //       Query.equal('workspaceId', workspaceId),
      //       Query.orderDesc('$createdAt'),
      //       Query.limit(Number(limit)),
      //       Query.cursorAfter(cursor),
      //     ]
      //   );
      // }

      return c.json({ data: documents });
    }
  )
  .get('/:documentId', sessionMiddleware, async (c) => {
    const user = c.get('user');
    const databases = c.get('databases');
    const { documentId } = c.req.param();

    const document = await databases.getDocument<Document>(
      DATABASE_ID,
      DOCUMENTS_ID,
      documentId
    );

    const member = await getMember({
      databases,
      workspaceId: document.workspaceId,
      userId: user.$id,
    });

    if (!member) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    return c.json({ data: document });
  })
  .post(
    '/',
    sessionMiddleware,
    zValidator('form', createDocumentSchema),
    async (c) => {
      const databases = c.get('databases');
      const user = c.get('user');

      const { title, initialContent, workspaceId } = c.req.valid('form');

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: 'Unathorized' }, 401);
      }

      const document = await databases.createDocument(
        DATABASE_ID,
        DOCUMENTS_ID,
        ID.unique(),
        {
          title,
          initialContent,
          workspaceId,
        }
      );

      return c.json({ data: document });
    }
  )
  .patch(
    '/:documentId',
    sessionMiddleware,
    zValidator('form', updateDocumentSchema),
    async (c) => {
      const databases = c.get('databases');
      const user = c.get('user');

      const { documentId } = c.req.param();
      const { title, workspaceId } = c.req.valid('form');

      const existingDocument = await databases.getDocument<Document>(
        DATABASE_ID,
        DOCUMENTS_ID,
        documentId
      );

      const member = await getMember({
        databases,
        workspaceId: existingDocument.workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const document = await databases.updateDocument(
        DATABASE_ID,
        DOCUMENTS_ID,
        documentId,
        {
          title,
          workspaceId,
        }
      );

      return c.json({ data: document });
    }
  )
  .delete('/:documentId', sessionMiddleware, async (c) => {
    const databases = c.get('databases');
    const user = c.get('user');

    const { documentId } = c.req.param();

    const existingProject = await databases.getDocument<Document>(
      DATABASE_ID,
      DOCUMENTS_ID,
      documentId
    );

    const member = await getMember({
      databases,
      workspaceId: existingProject.workspaceId,
      userId: user.$id,
    });

    if (!member) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    await databases.deleteDocument(DATABASE_ID, DOCUMENTS_ID, documentId);

    return c.json({ data: { $id: existingProject.$id } });
  });

export default Documents;
