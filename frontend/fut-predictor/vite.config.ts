import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/b': {
        target: 'http://127.0.0.1:5000', // your backend dev server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});



