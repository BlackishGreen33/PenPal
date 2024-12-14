import { Hono } from 'hono';
import { Query } from 'node-appwrite';

import { DATABASE_ID, SCORES_ID } from '@/common/configs';
import sessionMiddleware from '@/common/libs/session-middleware';
import { type Score } from '@/common/types/scores';

const Scores = new Hono().get('/', sessionMiddleware, async (c) => {
  const user = c.get('user');
  const databases = c.get('databases');

  const scores = await databases.listDocuments<Score>(DATABASE_ID, SCORES_ID, [
    Query.equal('userId', user.$id),
    Query.orderDesc('$createdAt'),
  ]);

  return c.json({ data: scores.documents[0] });
});

export default Scores;
