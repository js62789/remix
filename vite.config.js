import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';

const isStorybook = process.argv[1]?.includes('storybook');

export default defineConfig({
  plugins: [!isStorybook && remix()],
  server: {
    port: 3000,
  },
});
