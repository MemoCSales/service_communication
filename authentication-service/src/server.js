import Fastify from 'fastify';
import fastifyBcrypt from 'fastify-bcrypt';
import fastifyCors from '@fastify/cors';
import dotenv from 'dotenv';
import { createAccountRoute } from './routes/registration-route.js';
import { createAuthenticationRoute } from './routes/authentication-route.js';
import { getUserByEmail, getUserById } from './services/database-service.js';

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

  fastify.get('/api/test', async(request, reply) => {
    return { message: 'Authentication service API wordking'};
  });

fastify.get('/api/users/:id', async (request, reply) => {
  try {
    const user = await getUserById(request.params.id);
    if (!user) {
      reply.status(404).send({ error: 'User not found' });
      return;
    }
    // Don't send password in response
    const { password, ...userData } = user;
    reply.send(userData);
  } catch (error) {
    console.error('Detailed error:', error);
    reply.status(500).send({ error: 'Internal server error' });
  }
});

try {
  await fastify.listen({ port: 3000, host: '0.0.0.0' });
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}

export { fastify };