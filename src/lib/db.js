import postgres from 'postgres';
import 'dotenv/config';

const sql = postgres(process.env.DATABASE_URL);

// Create database tables
export async function initDatabase() {
  try {
    console.log('📦 Creating database tables...');
    
    // Endpoints table - stores webhook URLs
    await sql`
      CREATE TABLE IF NOT EXISTS endpoints (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        last_request_at TIMESTAMP,
        request_count INTEGER DEFAULT 0
      )
    `;
    
    // Webhook requests table - stores all received webhooks
    await sql`
      CREATE TABLE IF NOT EXISTS webhook_requests (
        id SERIAL PRIMARY KEY,
        endpoint_id TEXT NOT NULL REFERENCES endpoints(id),
        method TEXT NOT NULL,
        headers JSONB NOT NULL,
        body TEXT,
        query_params JSONB,
        ip_address TEXT,
        user_agent TEXT,
        received_at TIMESTAMP DEFAULT NOW()
      )
    `;
    
    // Index for faster queries
    await sql`
      CREATE INDEX IF NOT EXISTS idx_webhook_endpoint 
      ON webhook_requests(endpoint_id)
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_webhook_received 
      ON webhook_requests(received_at DESC)
    `;
    
    console.log('✅ Database tables created successfully!');
  } catch (error) {
    console.error('❌ Database error:', error.message);
    throw error;
  }
}

export { sql };