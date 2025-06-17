import fastify from 'fastify';

const server = fastify({logger: true});

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

/*
* Test pour la notion : json-schema-to-typescript (voir ./schemas/*.json)
*/
import BodyRegisterSchema from './schemas/bodyRegister.json';
import type { BodyRegisterSchema as BodyRegisterSchemaInterface } from './types/bodyRegister';

import HeaderRegisterSchema from './schemas/headersRegister.json';
import type { HeaderRegisterSchema as HeaderRegisterSchemaInterface } from './types/headersRegister';

import ReplyRegisterSchema from './schemas/replyRegister.json';
import type { ReplyRegisterSchema as ReplyRegisterSchemaInterface } from './types/replyRegister';

server.post<{
  Body: BodyRegisterSchemaInterface,
  Headers: HeaderRegisterSchemaInterface,
  Reply: ReplyRegisterSchemaInterface
}>('/register', {
  schema: {
    body: BodyRegisterSchema,
    response: ReplyRegisterSchema,
    headers: HeaderRegisterSchema
  }
}, async (request, reply) => {
  const {name, pwd} = request.body;
  const customHeader = request.headers['h-Custom'];
  console.log(name, pwd, customHeader);
  reply.code(200).send({success: true});
});


/*
* Test pour la notion : typebox
*/

interface IBody
{
  'name': string;
  'pwd': string;
};

interface IHeaders
{
  'h-custom': string;
}

interface IReply
{
  200: { success: boolean };
  302: { url: string };
  '4xx': { error: string };
}

import { Type } from '@sinclair/typebox'
import type { Static } from '@sinclair/typebox'

export const User = Type.Object({
  name: Type.String(),
  pwd: Type.String()
});

export const SuccessReply = Type.Object({
  success: Type.Boolean()
});

export const ErrorReply = Type.Object({
  error: Type.String()
})

server.post<{
  Body: IBody,
  Headers: IHeaders,
  Reply: IReply
}>('/register_typebox', {
  schema: {
    body: User,
    response: {
      '2xx': SuccessReply,
      '4xx': ErrorReply
    }
  }
}, async (request, reply) => {
  const {name, pwd} = request.body;
  const customHeader = request.headers['h-custom'];
  console.log(name, pwd, customHeader);
  reply.code(200).send({success: true});
});

/*
* Test pour les notions : type générique & JSON Schema
*/
server.post<{
  Body: IBody,
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
  const {name, pwd} = request.body;
  const customHeader = request.headers['h-Custom'];
  console.log(name, pwd, customHeader);
  reply.code(200).send({success: true});
});



start();
