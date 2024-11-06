import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, '此为必填项'),
});

export const registerSchema = z.object({
  name: z.string().trim().min(1, '此为必填项'),
  email: z.string().email(),
  password: z.string().min(8, '最少需要 8 个字符'),
});
