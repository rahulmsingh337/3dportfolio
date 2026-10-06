import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('gsap'))   return 'gsap';
          if (id.includes('motion')) return 'motion';
          if (id.includes('lucide')) return 'icons';
          if (id.includes('node_modules')) return 'vendor';
        }
      }
    }
  }
})
