import { Hono } from 'hono';
import { handle } from 'hono/vercel';

// import auth from '@/common/server/auth';
// import members from '@/features/members/server/route';
// import projects from '@/features/projects/server/route';
// import tasks from '@/features/tasks/server/route';
// import workspaces from '@/features/workspaces/server/route';
import LiveblocksAuth from '@/common/server/liveblocks-auth';
import SentryExampleApi from '@/common/server/sentry-example-api';

const app = new Hono().basePath('/api');

// eslint-disable-next-line unused-imports/no-unused-vars
const routes = app
  // .route('/auth', auth)
  // .route('/members', members)
  // .route('/workspaces', workspaces)
  // .route('/projects', projects)
  // .route('/tasks', tasks);
  .route('/liveblocks-auth', LiveblocksAuth)
  .route('/sentry-example-api', SentryExampleApi);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
