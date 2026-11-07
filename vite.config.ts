import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          framer: ['framer-motion'],
          vendor: ['react', 'react-dom', 'lucide-react', '@supabase/supabase-js'],
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
})


