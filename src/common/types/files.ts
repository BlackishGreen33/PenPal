import { Models } from 'node-appwrite';

export enum MemberRole {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  FAILED = 'FAILED',
  SUCCESS = 'SUCCESS',
}

export type File = Models.Document & {
  name: string;
  uploadStatus: MemberRole;
  url: string;
  key: string;
  messageId: string;
  userId: string;
};
