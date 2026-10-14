import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // ... your existing server config (like port, host, etc.)
    allowedHosts: [
      'maybe-robin-phoenix-mailing.trycloudflare.com',
      // If you want to allow all trycloudflare tunnels automatically, you can use:
      // true, 
    ]
  }
})
