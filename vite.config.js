import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',  // Use '/' for Vercel, '/barakahfi/' for GitHub Pages
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
