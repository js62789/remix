import path from 'path';
import url from 'url';
import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyCompress from '@fastify/compress';
import { createRequestHandler } from '@mcansh/remix-fastify';

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
