import fastify from 'fastify';


interface IQueryString
{
  'name': string;
  'pwd': string;
};

interface IHeaders
{
  'h-Custom': string;
}

interface IReply
{
  200: { success: boolean };
  302: { url: string };
  '4xx': { error: string };
}

const server = fastify({logger: true});

server.post<{
  Querystring: IQueryString,
  Headers: IHeaders,
  Reply: IReply
}>('/register', {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'pwd'],
      properties: {
        name: { type: 'string' },
        pwd: { type: 'string' }
      }
    },
    response: {
      '2xx': {
        type: 'object',
        properties: { success: { type: 'boolean' } }
      },
      '4xx': {
        type: 'object',
        properties: { error: { type: 'string' } }
      },
      302: {
        type: 'object',
        properties: { error: { type: 'string' } }
      }
    }
  }
}, async (request, reply) => {
  const {name, pwd} = request.query;
  const customHeader = request.headers['h-Custom'];
  console.log(name, pwd, customHeader);
  reply.code(200).send({success: true});
  // reply.code(200).send("ZzZ");
  // reply.code(404).send({error: 'Not found'});
  // return `logged in!`;
});

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
