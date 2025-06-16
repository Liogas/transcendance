import fastify from 'fastify';

const server = fastify({logger: true});

server.get('/ping', async (request, reply) => {
  return {value: 'pong'};
});

server.get('/users', async (request, reply) => {
  reply.send([{id:1, name: 'Gaston'}]);
});

server.get('/users/:id', async (request, reply) => {
  const { id } = request.params;
  reply.send([{id:1, name: `Gaston ${id}` }]);
});

server.post('/users', (request, reply) => {
  const newUser = request.body;
  reply.code(201).send( {id: 2, ...newUser });
})

const start = async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log(`Server listening at localhost:3000`);
  } catch (err)
  {
    server.log.error(err);
    process.exit(1);
  }
};

start();
