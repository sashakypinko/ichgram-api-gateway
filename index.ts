import fastify, {FastifyRequest} from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyHttpProxy from '@fastify/http-proxy';
import fastifyJwt from '@fastify/jwt';
import {JwtPayload} from './types';
import 'dotenv/config';

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const host = process.env.HOST || 'localhost';

const app = fastify({logger: true});

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET_KEY || 'secret',
});

app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
});

app.addHook('onRequest', async (request: FastifyRequest) => {
  request.headers['x-system-call'] = '';

  try {
    const decoded = await request.jwtVerify<JwtPayload>();
    request.headers['x-user-id'] = decoded.userId;
    request.headers['x-user-scopes'] = decoded.userScopes.join(',');
  } catch (err) {
    request.headers['x-user-id'] = '';
    request.headers['x-user-scopes'] = '';
  }
});

app.register(fastifyHttpProxy, {
  upstream: process.env.AUTH_SERVICE_URL || 'http://localhost:3002',
  prefix: '/auth',
  http2: false,
});

app.register(fastifyHttpProxy, {
  upstream: process.env.CORE_SERVICE_URL || 'http://localhost:3003',
  prefix: '/core',
  http2: false,
  websocket: true,
});

app.register(fastifyHttpProxy, {
  upstream: process.env.MEDIA_SERVICE_URL || 'http://localhost:3004',
  prefix: '/media',
  http2: false,
});

app.listen({port, host}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`API Gateway running at ${address}`);
});
