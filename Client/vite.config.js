import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_BACKEND_SERVER': JSON.stringify(env.REACT_APP_BACKEND_SERVER)
    },
    plugins: [react()],
    build: {
      outDir: '../Server/build',
      emptyOutDir: true
    }
  }
})
