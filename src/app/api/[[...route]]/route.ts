import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import * as route from '@/server';

const app = new Hono().basePath('/api');

// eslint-disable-next-line unused-imports/no-unused-vars
const routes = app
  .route('/auth', route.Auth)
  // .route('/members', members)
  .route('/workspaces', route.Workspaces)
  // .route('/projects', projects)
  // .route('/tasks', tasks);
  .route('/liveblocks-auth', route.LiveblocksAuth)
  .route('/sentry-example-api', route.SentryExampleApi);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
