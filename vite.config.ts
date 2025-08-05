import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/contact-form': 'http://localhost:3001',
      '/newsletter': 'http://localhost:3001',
      '/upload-photos': 'http://localhost:3001',
      '/images': 'http://localhost:3001'
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react']
  },
  define: {
    'process.env': {} // Prevents Vite from crashing on process.env in frontend
  }
});