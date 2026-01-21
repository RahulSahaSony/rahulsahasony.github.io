// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // This should be '/' for username.github.io domains
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Add this to ensure proper MIME types
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  // Add this to ensure proper MIME types
  preview: {
    headers: {
      'Content-Type': 'text/javascript',
    },
  },
})
