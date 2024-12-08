import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import * as route from '@/server';

const app = new Hono().basePath('/api');
// eslint-disable-next-line unused-imports/no-unused-vars
const routes = app
  .route('/auth', route.Auth)
  .route('/members', route.Members)
  .route('/workspaces', route.Workspaces)
  .route('/projects', route.Projects)
  .route('/tasks', route.Tasks)
  .route('/files', route.Files)
  .route('/sentry-example-api', route.SentryExampleApi);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
