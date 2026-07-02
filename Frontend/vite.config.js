import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three')) {
              return 'three';
            }
            if (id.includes('ogl')) {
              return 'ogl';
            }
            if (id.includes('gsap')) {
              return 'gsap';
            }
            return 'vendor';
          }
        }
      }
    }
  }
})
