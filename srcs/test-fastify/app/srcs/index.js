import Fastify from 'fastify';
const fastify = Fastify({logger:true});

fastify.get('/', async (request, reply) => {
    return {message: 'Bonjour Fastify !'};
});

const start = async () => {
    try
    {
        await fastify.listen({port: 3000, host: '0.0.0.0'});
        fastify.log.info('Serveur demarre sur le port 3000');
    } catch (err)
    {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();
