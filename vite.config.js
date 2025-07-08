import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';

const isStorybook = process.argv[1]?.includes('storybook');

export default defineConfig({
  plugins: [!isStorybook && reactRouter()],
  server: {
    port: 3000,
  },
});
