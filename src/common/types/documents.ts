import { Models } from 'node-appwrite';

export type Document = Models.Document & {
  title: string;
  initialContent: string;
  workspaceId: string;
  userId: string;
};
