import { z } from 'zod';

export const createWorkspaceSchema = z.object({
  name: z.string().trim().min(1, '此为必填项'),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === '' ? undefined : value)),
    ])
    .optional(),
});

export const updateWorkspaceSchema = z.object({
  name: z.string().trim().min(1, '最少需要 1 个字符').optional(),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === '' ? undefined : value)),
    ])
    .optional(),
});
