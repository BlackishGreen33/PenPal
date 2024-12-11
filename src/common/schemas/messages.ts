import { z } from 'zod';

export const getMessagesSchema = z.object({
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.string().nullish(),
  fileId: z.string(),
});

export const SendMessageSchema = z.object({
  fileId: z.string(),
  message: z.string(),
});
