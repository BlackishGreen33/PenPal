import { z } from 'zod';

export const updateScoreSchema = z.object({
  operator: z.string(),
});
