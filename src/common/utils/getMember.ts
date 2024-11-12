import { type Databases, Query } from 'node-appwrite';

import { DATABASE_ID, MEMBERS_ID } from '@/common/configs';

interface GetMemberProps {
  databases: Databases;
  workspaceId: string;
  userId: string;
}

const getMember = async ({
  databases,
  workspaceId,
  userId,
}: GetMemberProps) => {
  const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
    Query.equal('workspaceId', workspaceId),
    Query.equal('userId', userId),
  ]);

  return members.documents[0];
};

export default getMember;
