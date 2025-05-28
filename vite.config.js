import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_NO_SOCIAL': JSON.stringify(env.REACT_APP_NO_SOCIAL),
      'process.env.REACT_APP_USE_TRANSLATION': JSON.stringify(env.REACT_APP_USE_TRANSLATION),
      'process.env.REACT_APP_ENABLE_CACHE': JSON.stringify(env.REACT_APP_ENABLE_CACHE)
    },
    plugins: [react()],
  }
})