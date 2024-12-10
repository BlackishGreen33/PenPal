import { Models } from 'node-appwrite';

export type Message = Models.Document & {
  text: string;
  isUserMessage: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  fileId: string;
};
