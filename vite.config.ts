import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html'
    }
  },
  server: {
    open: true,
    port: 3000
  },
  esbuild: {
    jsxFactory: 'createElement',
    jsxFragment: 'Fragment'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
}); 