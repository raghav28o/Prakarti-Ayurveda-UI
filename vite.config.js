import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Whenever your code calls '/auth', Vite sends it to the backend
      '/auth': {
        target: 'http://localhost:8090',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})