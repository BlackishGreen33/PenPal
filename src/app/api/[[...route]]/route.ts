import { trpcServer } from '@hono/trpc-server';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import * as route from '@/server';
import { appRouter } from '@/server/trpc';

const app = new Hono().basePath('/api');

app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
  })
);

// eslint-disable-next-line unused-imports/no-unused-vars
const routes = app
  .route('/auth', route.Auth)
  .route('/members', route.Members)
  .route('/workspaces', route.Workspaces)
  .route('/projects', route.Projects)
  .route('/tasks', route.Tasks)
  .route('/liveblocks-auth', route.LiveblocksAuth)
  .route('/sentry-example-api', route.SentryExampleApi);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
