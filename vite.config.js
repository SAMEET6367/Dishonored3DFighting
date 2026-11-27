import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    watch: {
      ignored: ['**/*.mp4', '**/main image/**', '**/Players/**', '**/last image/**', '**/Enemies/**'],
    },
  },
});
