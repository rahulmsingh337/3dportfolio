import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Inline the built CSS into index.html (one fewer render-blocking round trip).
function inlineCss() {
  return {
    name: 'inline-css',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html;
        for (const [name, file] of Object.entries(ctx.bundle)) {
          if (name.endsWith('.css') && file.type === 'asset') {
            const base = name.split('/').pop().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const re = new RegExp('<link[^>]*rel="stylesheet"[^>]*href="[^"]*' + base + '"[^>]*>');
            if (re.test(html)) {
              html = html.replace(re, () => '<style>' + String(file.source) + '</style>');
              delete ctx.bundle[name];
            }
          }
        }
        return html;
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), inlineCss()],
  base: '/',
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('motion')) return 'motion';
          if (id.includes('lucide')) return 'icons';
          if (id.includes('node_modules')) return 'vendor';
        }
      }
    }
  }
})
