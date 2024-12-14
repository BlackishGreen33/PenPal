import { z } from 'zod';

export const createFileSchema = z.object({
  key: z.string(),
  name: z.string().trim().min(1, '此为必填项'),
  workspaceId: z.string(),
  url: z.string(),
  uploadStatus: z.enum(['PROCESSING', 'SUCCESS', 'FAILED']),
});

export const updateFileSchema = z.object({
  uploadStatus: z.enum(['PROCESSING', 'SUCCESS', 'FAILED']),
});
