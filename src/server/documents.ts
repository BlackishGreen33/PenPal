import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { ID, Query } from 'node-appwrite';
import { z } from 'zod';

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
  .get(
    '/roomIds',
    sessionMiddleware,
    zValidator('query', z.object({ roomIds: z.string().array() })),
    async (c) => {
      const databases = c.get('databases');
      const { roomIds } = c.req.valid('query');

      const mergeDocuments: Document[] = [];

      for (const roomId of roomIds) {
        const documents = await databases.listDocuments<Document>(
          DATABASE_ID,
          DOCUMENTS_ID,
          [Query.equal('roomId', roomId), Query.orderDesc('$createdAt')]
        );
        mergeDocuments.push(...documents.documents);
      }

      return c.json({ data: mergeDocuments });
    }
  )
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
  // .post(
  //   '/liveblocks-auth',
  //   sessionMiddleware,
  //   zValidator('form', z.object({ room: z.string(), workspaceId: z.string() })),
  //   async (c) => {
  //     const user = c.get('user');
  //     const databases = c.get('databases');

  //     const { room, workspaceId } = c.req.valid('form');
  //     const documents = await databases.listDocuments<Document>(
  //       DATABASE_ID,
  //       DOCUMENTS_ID,
  //       [Query.equal('roomId', room), Query.orderDesc('$createdAt')]
  //     );
  //     if (!documents) {
  //       return c.json({ error: 'Unathorized' }, 401);
  //     }
  //     const document = documents.documents[0];

  //     const isOwner = document.workspaceId === workspaceId;
  //     if (!isOwner) {
  //       return c.json({ error: 'Unauthorized' }, 401);
  //     }

  //     const member = await getMember({
  //       databases,
  //       workspaceId,
  //       userId: user.$id,
  //     });
  //     if (!member) {
  //       return c.json({ error: 'Unathorized' }, 401);
  //     }

  //     const name = user.name;
  //     const session = liveblocks.prepareSession(user.$id, {
  //       userInfo: {
  //         name,
  //         avatar: name
  //           ? name.charAt(0).toUpperCase()
  //           : (user.email.charAt(0).toUpperCase() ?? 'U'),
  //         color: getUserColor(user.$id),
  //         id: user.$id,
  //         email: user.email,
  //       },
  //     });
  //     session.allow(room, session.FULL_ACCESS);
  //     const { body, status } = await session.authorize();

  //     return c.json({ data: body }, status as StatusCode);
  //   }
  // )
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
