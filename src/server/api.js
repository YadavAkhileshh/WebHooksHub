import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';

const app = new Hono();

// Serve static files from public directory
app.use('/*', serveStatic({ root: './public' }));

// Fallback to index.html for root
app.get('/', serveStatic({ path: './public/index.html' }));

export default app;