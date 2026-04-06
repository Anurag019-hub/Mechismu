import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Raise the warning threshold (chunks will be smaller after splitting)
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime
          vendor: ['react', 'react-dom'],
          // Router (separate — only needed after initial render)
          router: ['react-router-dom'],
          // Animation libraries
          gsap: ['gsap', '@gsap/react'],
          motion: ['motion'],
          // Icon library
          icons: ['lucide-react'],
        },
      },
    },
  },
})
