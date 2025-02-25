import { User } from '../models/User.js';

export const userRoutes = async (fastify) => {
  // GET endpoint to retrieve all users
  fastify.get('/users/:id', async (request, reply) => {
      const users = await User.findById(request.params.id);
      if (!user) {
        reply.code(404).send({
          error: 'User not found'
        });
        return;
      }
      reply.send(users);
  });

  // POST endpoint
  fastify.post('/users', async (request, reply) => {
    // Query
    const { username, email, password } = request.body;
    const user = await User.create({ username, email, password });
    reply.code(201).send(user);
  });

  // GET endpoint
fastify.get('/api/users/:id', async (request, reply) => {
  try {
    const user = await getUserByEmail(request.params.id);
    if (!user) {
      reply.status(404).send({
        error: 'User not found'
      });
      return;
    }
    const { password, ...userData } = user;
    reply.send(userData);
  } catch (error) {
    reply.status(500).send({
      error: 'Internatl server error'
    });
  }
});
}