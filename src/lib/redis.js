import { createClient } from 'redis';
import 'dotenv/config';

const redis = createClient({
  url: process.env.REDIS_URL
});

redis.on('error', (err) => console.error('❌ Redis error:', err.message));
redis.on('connect', () => console.log('✅ Redis connected'));

await redis.connect();

// For publishing real-time updates
export const publisher = redis.duplicate();
await publisher.connect();

// For receiving real-time updates
export const subscriber = redis.duplicate();
await subscriber.connect();

export { redis };