'use server';

import { Query } from 'node-appwrite';

import { DATABASE_ID, DOCUMENTS_ID, MEMBERS_ID } from '@/common/configs';
import { type Document } from '@/common/types/documents';
import { getUserColor } from '@/common/utils';

import { createSessionClient } from '../appwrite';
import liveblocks from '../liveblocks';

export const getDocuments = async (ids: string[]) => {
  const { databases } = await createSessionClient();

  const mergeDocuments: Document[] = [];

  for (const roomId of ids) {
    const documents = await databases.listDocuments<Document>(
      DATABASE_ID,
      DOCUMENTS_ID,
      [Query.equal('roomId', roomId), Query.orderDesc('$createdAt')]
    );
    mergeDocuments.push(...documents.documents);
  }

  return mergeDocuments;
};

export const getUsers = async () => {
  const { databases, account } = await createSessionClient();

  const user = await account.get();

  const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
    Query.equal('userId', user.$id),
  ]);

  const users = members.documents.map((user) => ({
    id: user.$id,
    name: user.name,
    avatar: user.name,
    color: '',
    email: user.email,
  }));

  return users;
};

export const getLiveBlocks = async (room: string) => {
  const { account } = await createSessionClient();

  const user = await account.get();

  const name = user.name;
  const session = liveblocks.prepareSession(user.$id, {
    userInfo: {
      name,
      avatar: name
        ? name.charAt(0).toUpperCase()
        : (user.email.charAt(0).toUpperCase() ?? 'U'),
      color: getUserColor(user.$id),
      id: user.$id,
      email: user.email,
    },
  });
  session.allow(room, session.FULL_ACCESS);
  const { body } = await session.authorize();

  return body;
};
