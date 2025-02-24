import Fastify from 'fastify';
import fastifyBcrypt from 'fastify-bcrypt';
import fastifyCors from '@fastify/cors';
import dotenv from 'dotenv';
import { createAccountRoute } from './routes/registration-route.js';
import { createAuthenticationRoute } from './routes/authentication-route.js';
import { matchmakingDb } from './database/connection.js';

dotenv.config();

const fastify = Fastify({
 logger: true
});

await fastify.register(fastifyCors, {
  origin: ['http://matchmaking:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
});

fastify.register(fastifyBcrypt, {
  saltWorkFactor: 12
});

fastify.route(createAccountRoute);
fastify.route(createAuthenticationRoute);

fastify.get('/', (request, reply) => {
  return { message: 'Fastify server running' };
});

fastify.get('/test-matchmaking-db', async(request, reply) => {
    try {
      const matches = await matchmakingDb('matchmaking').select('*');
      reply.send({
        message: 'Successfully fetching matchmaking table information',
        matchCount: matches.length,
        matches
      });
    } catch (error) {
      console.error('Database error:', error);
      reply.status(500).send({
        error: 'Failed to fetch matchmaking table information',
        details: error.message
      });
    }
  });

try {
  await fastify.listen({ port: 3000, host: '0.0.0.0' });
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}

export { fastify };