import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  base: '/team-assignment-01/',
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        member: fileURLToPath(new URL('./member.html', import.meta.url))
      }
    }
  }
});
