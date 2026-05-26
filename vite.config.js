import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import generateSitemap from 'vite-plugin-sitemap'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    generateSitemap({
      hostname: 'https://mechismu.nvcti.in',
      dynamicRoutes: [
        '/contact',
        '/about',
        '/team',
        '/sponsors',
        '/cars',
        '/wins',
        '/projects',
      ],
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    chunkSizeWarningLimit: 600,
    cssCodeSplit: true,
    cssMinify: 'esbuild',
    assetsInlineLimit: 4096,
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          gsap: ['gsap', '@gsap/react'],
          motion: ['motion'],
          icons: ['lucide-react'],
        },
      },
    },
  },
})