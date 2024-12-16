import { z } from 'zod';

export const createDocumentSchema = z.object({
  title: z.string().trim().min(1, '此为必填项'),
  initialContent: z.string(),
  workspaceId: z.string(),
});
