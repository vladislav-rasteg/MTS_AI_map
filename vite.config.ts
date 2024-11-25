import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './build',
  },
  resolve: {
    alias: {
      src: "/src",
      app: "/src/app",
      shared: "/src/shared",
      pages: "/src/pages",
      widgets: "/src/widgets",
      feautures: "/src/feautures",
      blocks: "/src/blocks"
    }
  }
})
