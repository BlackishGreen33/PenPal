import { z } from 'zod';

export const getDocumentsSchema = z.object({
  workspaceId: z.string(),
  limit: z.string(),
  cursor: z.string(),
});

export const createDocumentSchema = z.object({
  title: z.string().trim().min(1, '此为必填项'),
  initialContent: z.string(),
  workspaceId: z.string(),
});

export const updateDocumentSchema = z.object({
  title: z.string().trim().min(1, '此为必填项'),
  workspaceId: z.string(),
});
