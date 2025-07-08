import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isStorybook = process.argv[1]?.includes('storybook');

export default defineConfig({
  plugins: [!isStorybook && react()],
  server: {
    port: 3000,
  },
});
