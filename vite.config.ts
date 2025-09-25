import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['@ant-design/charts'],
          supabase: ['@supabase/supabase-js'],
          antd: ['antd']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})