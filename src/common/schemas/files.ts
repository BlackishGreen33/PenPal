import { z } from 'zod';

export const createFileSchema = z.object({
  name: z.string().trim().min(1, '此为必填项'),
  workspaceId: z.string(),
  key: z.string(),
  file: z.union([
    z.instanceof(File),
    z.string().transform((value) => (value === '' ? undefined : value)),
  ]),
});

export const updateFileSchema = z.object({
  uploadStatus: z.enum(['PROCESSING', 'SUCCESS', 'FAILED']),
});
