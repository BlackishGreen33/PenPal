import { Models } from 'node-appwrite';

export type Score = Models.Document & {
  userId: string;
  score: string;
  freeCount: string;
};
