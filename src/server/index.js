import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { nanoid } from 'nanoid';
import fs from 'fs';
import path from 'path';

const app = new Hono();

// Metrics storage
let metrics = {
  webhook_requests_total: 0,
  endpoints_created_total: 0,
  request_duration_sum: 0,
  request_duration_count: 0
};

// Enable CORS for all routes
app.use('*', cors());

// In-memory storage
let endpoints = [];
let webhooks = [];

// Add logging middleware
app.use('*', async (c, next) => {
  console.log(`${c.req.method} ${c.req.path}`);
  await next();
});

// Serve static files manually
app.get('/assets/*', async (c) => {
  const filePath = c.req.path.replace('/assets/', '')
  try {
    const file = fs.readFileSync(path.join(process.cwd(), 'dist', 'assets', filePath))
    const ext = path.extname(filePath)
    const contentType = ext === '.js' ? 'application/javascript' : 
                       ext === '.css' ? 'text/css' : 'application/octet-stream'
    return new Response(file, {
      headers: { 'Content-Type': contentType }
    })
  } catch {
    return c.notFound()
  }
})

app.get('/vite.svg', async (c) => {
  try {
    const file = fs.readFileSync(path.join(process.cwd(), 'dist', 'vite.svg'))
    return new Response(file, {
      headers: { 'Content-Type': 'image/svg+xml' }
    })
  } catch {
    return c.notFound()
  }
})

// Prometheus metrics endpoint
app.get('/metrics', (c) => {
  const avgDuration = metrics.request_duration_count > 0 
    ? metrics.request_duration_sum / metrics.request_duration_count 
    : 0;

  const prometheusMetrics = `# HELP webhook_requests_total Total number of webhook requests
# TYPE webhook_requests_total counter
webhook_requests_total ${metrics.webhook_requests_total}

# HELP endpoints_created_total Total number of endpoints created
# TYPE endpoints_created_total counter
endpoints_created_total ${metrics.endpoints_created_total}

# HELP http_request_duration_ms Average HTTP request duration
# TYPE http_request_duration_ms gauge
http_request_duration_ms ${avgDuration}

# HELP active_endpoints Current number of active endpoints
# TYPE active_endpoints gauge
active_endpoints ${endpoints.length}

# HELP total_webhooks_received Total webhooks received
# TYPE total_webhooks_received gauge
total_webhooks_received ${webhooks.length}
`;

  return c.text(prometheusMetrics);
});

// API Routes
app.post('/api/endpoints', async (c) => {
  try {
    const { name } = await c.req.json();
    const endpointId = nanoid(10);
    
    const endpoint = {
      id: endpointId,
      name,
      createdAt: new Date(),
      request_count: 0
    };
    
    endpoints.push(endpoint);
    metrics.endpoints_created_total += 1; // Track metric
    console.log(`✅ Created endpoint: ${endpointId}`);

    return c.json({
      id: endpointId,
      url: `http://localhost:3000/w/${endpointId}`,
      name,
      createdAt: endpoint.createdAt
    }, 201);
  } catch (error) {
    console.error('❌ Create endpoint error:', error);
    return c.json({ error: error.message }, 500);
  }
});

app.get('/api/endpoints', (c) => {
  console.log(`📋 Returning ${endpoints.length} endpoints`);
  return c.json(endpoints);
});

app.delete('/api/endpoints/:id', (c) => {
  const { id } = c.req.param();
  const index = endpoints.findIndex(e => e.id === id);
  if (index === -1) {
    return c.json({ error: 'Endpoint not found' }, 404);
  }
  endpoints.splice(index, 1);
  webhooks = webhooks.filter(w => w.endpoint_id !== id);
  console.log(`🗑️ Deleted endpoint: ${id}`);
  return c.json({ success: true });
});

app.get('/api/webhooks', (c) => {
  console.log(`📥 Returning ${webhooks.length} total webhooks`);
  return c.json(webhooks.map(w => ({
    id: w.id,
    endpoint: w.endpoint_id,
    method: w.method,
    headers: w.headers,
    body: w.body,
    timestamp: w.received_at
  })));
});

app.get('/api/endpoints/:id/requests', (c) => {
  const { id } = c.req.param();
  const endpointWebhooks = webhooks.filter(w => w.endpoint_id === id);
  console.log(`📥 Returning ${endpointWebhooks.length} webhooks for ${id}`);
  return c.json(endpointWebhooks);
});

// Webhook receiver
app.all('/w/:id', async (c) => {
  try {
    const { id } = c.req.param();
    
    const endpoint = endpoints.find(e => e.id === id);
    if (!endpoint) {
      return c.json({ error: 'Endpoint not found' }, 404);
    }

    const method = c.req.method;
    const headers = Object.fromEntries(c.req.raw.headers);
    const body = await c.req.text();
    const ipAddress = c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'localhost';

    const webhook = {
      id: nanoid(),
      endpoint_id: id,
      method,
      headers,
      body,
      ip_address: ipAddress,
      received_at: new Date()
    };
    
    webhooks.push(webhook);
    endpoint.request_count++;
    metrics.webhook_requests_total += 1; // Track metric

    console.log(`📥 Webhook received: ${method} /w/${id} from ${ipAddress}`);

    return c.json({
      received: true,
      timestamp: new Date().toISOString(),
      endpoint_id: id
    });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    return c.json({ error: error.message }, 500);
  }
});

app.get('/health', (c) => {
  return c.json({ status: 'healthy', endpoints: endpoints.length, webhooks: webhooks.length });
});

// Serve React App for all non-API routes
app.get('*', (c) => {
  try {
    const html = fs.readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf-8')
    return c.html(html)
  } catch (error) {
    return c.html(`
      <!DOCTYPE html>
      <html>
        <head><title>WebhookHub - Building...</title></head>
        <body>
          <div style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:Arial">
            <div style="text-align:center">
              <h1>🚀 WebhookHub</h1>
              <p>React frontend is building... Please run:</p>
              <code>cd frontend && npm install && npm run build</code>
            </div>
          </div>
        </body>
      </html>
    `)
  }
})

console.log('🚀 Starting WebhookHub...');

serve({
  fetch: app.fetch,
  port: process.env.PORT || 3000,
  hostname: '0.0.0.0'
}, (info) => {
  console.log(`✅ WebhookHub running on http://localhost:${info.port}`);
  console.log(`📡 API endpoints available at /api/*`);
  console.log(`🎯 Webhook receiver at /w/:id`);
});