import { z } from 'zod';

export const SendMessageSchema = z.object({
  fileId: z.string(),
  message: z.string(),
});
