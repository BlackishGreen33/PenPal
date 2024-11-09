import { Hono } from 'hono';

const SentryExampleApi = new Hono().get('/', async (c) =>
  c.json({ data: 'Testing Sentry Error...' })
);

export default SentryExampleApi;
