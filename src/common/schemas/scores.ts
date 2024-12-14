import { z } from 'zod';

export const createScoreSchema = z.object({
  score: z.string(),
  freeCount: z.string(),
});

export const updateScoreSchema = z.object({
  score: z.string(),
  freeCount: z.string(),
});
