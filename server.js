import path from 'path';
import url from 'url';
import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyCompress from '@fastify/compress';
import { createRequestHandler } from '@mcansh/remix-fastify';
import { Server } from 'socket.io';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const viteDevServer =
  process.env.NODE_ENV === 'production'
    ? undefined
    : await import('vite').then((vite) =>
      vite.createServer({
        server: { middlewareMode: true },
      }),
    );

const remixHandler = createRequestHandler({
  build: viteDevServer
    ? () => viteDevServer.ssrLoadModule('virtual:remix/server-build')
    : await import('./build/server/index.js'),
});

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyCompress);

// Attach the socket.io server to the HTTP server
fastify.decorate('io', new Server(fastify.server));

// Close the socket server when the fastify instance is closed
fastify.addHook('onClose', (fastify, done) => {
  fastify.io.close();
  done();
});

// Then you can use `io` to listen the `connection` event and get a socket
// from a client
fastify.io.on('connection', (socket) => {
  // from this point you are on the WS connection with a specific client
  console.log(socket.id, 'connected');

  socket.emit('confirmation', 'connected!');

  socket.on('event', (data) => {
    console.log(socket.id, data);
    socket.emit('event', 'pong');
  });
});

if (viteDevServer) {
  let middie = await import('@fastify/middie').then((mod) => mod.default);
  await fastify.register(middie);
  fastify.use(viteDevServer.middlewares);
} else {
  // Vite fingerprints its assets so we can cache forever.
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'build/client/assets'),
    prefix: '/assets/',
  });
}

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'build/client'),
});

fastify.all('/', remixHandler);

const port = process.env.PORT || 3000;
fastify.listen({ port }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Fastify server listening at ${address}`);
});
