import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // base is '/' for Netlify (served from root domain)
  // GitHub Pages users: change to '/3dportfolio/'
  base: '/',
})
