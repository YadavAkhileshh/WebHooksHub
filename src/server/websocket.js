import { Server } from 'socket.io';
import { subscriber } from '../lib/redis.js';

export function setupWebSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: { 
      origin: '*',
      methods: ['GET', 'POST']
    }
  });
  
  console.log('🔌 WebSocket server initialized');
  
  io.on('connection', (socket) => {
    console.log('👤 Client connected:', socket.id);
    
    // When client wants to watch an endpoint
    socket.on('subscribe', async (endpointId) => {
      console.log(`📡 Client ${socket.id} watching ${endpointId}`);
      
      socket.join(`endpoint:${endpointId}`);
      
      // Subscribe to Redis channel
      await subscriber.subscribe(`webhook:${endpointId}`, (message) => {
        const webhook = JSON.parse(message);
        
        // Send to all clients watching this endpoint
        io.to(`endpoint:${endpointId}`).emit('webhook', webhook);
        
        console.log(`📤 Sent webhook to clients watching ${endpointId}`);
      });
    });
    
    // When client stops watching
    socket.on('unsubscribe', async (endpointId) => {
      console.log(`📴 Client ${socket.id} stopped watching ${endpointId}`);
      
      socket.leave(`endpoint:${endpointId}`);
      await subscriber.unsubscribe(`webhook:${endpointId}`);
    });
    
    socket.on('disconnect', () => {
      console.log('👋 Client disconnected:', socket.id);
    });
  });
  
  return io;
}