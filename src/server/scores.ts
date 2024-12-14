import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { Query } from 'node-appwrite';

import { DATABASE_ID, SCORES_ID } from '@/common/configs';
import sessionMiddleware from '@/common/libs/session-middleware';
import { updateScoreSchema } from '@/common/schemas/scores';
import { type Score } from '@/common/types/scores';

const Scores = new Hono()
  .get('/', sessionMiddleware, async (c) => {
    const user = c.get('user');
    const databases = c.get('databases');

    const scores = await databases.listDocuments<Score>(
      DATABASE_ID,
      SCORES_ID,
      [Query.equal('userId', user.$id), Query.orderDesc('$createdAt')]
    );

    return c.json({ data: scores.documents[0] });
  })
  .patch(
    '/',
    sessionMiddleware,
    zValidator('form', updateScoreSchema),
    async (c) => {
      const user = c.get('user');
      const databases = c.get('databases');

      const { operator } = c.req.valid('form');

      const scores = await databases.listDocuments<Score>(
        DATABASE_ID,
        SCORES_ID,
        [Query.equal('userId', user.$id), Query.orderDesc('$createdAt')]
      );
      const scoreDoc = scores.documents[0];
      const { score, freeCount } = scoreDoc;

      let newScore;

      if (operator === 'add') {
        if (Number(freeCount) === 10) {
          newScore = await databases.updateDocument(
            DATABASE_ID,
            SCORES_ID,
            scoreDoc.$id,
            {
              score: String(Number(score) + 10),
            }
          );
        } else {
          newScore = await databases.updateDocument(
            DATABASE_ID,
            SCORES_ID,
            scoreDoc.$id,
            {
              freeCount: String(Number(freeCount) + 1),
            }
          );
        }
      } else if (operator === 'sub') {
        if (Number(freeCount) === 0) {
          newScore = await databases.updateDocument(
            DATABASE_ID,
            SCORES_ID,
            scoreDoc.$id,
            {
              score: String(Number(score) - 10),
            }
          );
        } else {
          newScore = await databases.updateDocument(
            DATABASE_ID,
            SCORES_ID,
            scoreDoc.$id,
            {
              freeCount: String(Number(freeCount) - 1),
            }
          );
        }
      }

      return c.json({ data: newScore });
    }
  );

export default Scores;
