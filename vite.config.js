import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_NO_SOCIAL': JSON.stringify(env.REACT_APP_NO_SOCIAL),
      'process.env.REACT_APP_USE_TRANSLATION': JSON.stringify(env.REACT_APP_USE_TRANSLATION)
    },
    plugins: [react()],
  }
})