import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';

let server;
const BASE_URL = 'http://localhost:3001';

describe('WebHookHub API Tests', () => {

  before(async () => {
    // Start test server on different port
    process.env.PORT = '3001';
    process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres@localhost:5432/webhookhub_test';

    // Import and start server
    const { default: startServer } = await import('./index.js');
    server = startServer;
  });

  after(() => {
    server?.close();
  });

  it('should return healthy status', async () => {
    const response = await fetch(`${BASE_URL}/health`);
    const data = await response.json();

    assert.strictEqual(response.status, 200);
    assert.strictEqual(data.status, 'healthy');
  });

  it('should create new endpoint', async () => {
    const response = await fetch(`${BASE_URL}/api/endpoints`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': 'test-user'
      },
      body: JSON.stringify({ name: 'Test Endpoint' })
    });

    const data = await response.json();

    assert.strictEqual(response.status, 201);
    assert.ok(data.id);
    assert.ok(data.url);
    assert.strictEqual(data.name, 'Test Endpoint');
  });

  it('should receive and store webhook', async () => {
    // First create endpoint
    const createRes = await fetch(`${BASE_URL}/api/endpoints`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': 'test-user'
      },
      body: JSON.stringify({ name: 'Webhook Test' })
    });

    const endpoint = await createRes.json();

    // Send webhook
    const webhookRes = await fetch(`${BASE_URL}/w/${endpoint.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ test: 'data', timestamp: Date.now() })
    });

    const webhookData = await webhookRes.json();

    assert.strictEqual(webhookRes.status, 200);
    assert.strictEqual(webhookData.received, true);
    assert.ok(webhookData.id);
  });

  it('should retrieve webhook history', async () => {
    // Create endpoint
    const createRes = await fetch(`${BASE_URL}/api/endpoints`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': 'test-user'
      },
      body: JSON.stringify({ name: 'History Test' })
    });

    const endpoint = await createRes.json();

    // Send 3 webhooks
    for (let i = 0; i < 3; i++) {
      await fetch(`${BASE_URL}/w/${endpoint.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: i })
      });
    }

    // Get history
    const historyRes = await fetch(`${BASE_URL}/api/endpoints/${endpoint.id}/requests`);
    const history = await historyRes.json();

    assert.strictEqual(historyRes.status, 200);
    assert.ok(history.length >= 3);
  });

  it('should return 404 for non-existent endpoint', async () => {
    const response = await fetch(`${BASE_URL}/w/nonexistent123`, {
      method: 'POST',
      body: JSON.stringify({ test: 'data' })
    });

    assert.strictEqual(response.status, 404);
  });
});