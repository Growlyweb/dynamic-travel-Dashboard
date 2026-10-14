import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // WSL gets no file change events from Windows drives (/mnt/e), so hot reload serves stale modules
    watch: process.env.WSL_DISTRO_NAME ? { usePolling: true, interval: 300 } : undefined,
    allowedHosts: [
      'maybe-robin-phoenix-mailing.trycloudflare.com',
    ],
  },
})
