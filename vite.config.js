import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: { host: "0.0.0.0", allowedHosts: ["terminal.local"] },
  plugins: [react()],
  build: {
    // Keep production bundles from publishing source maps for internal source disclosure.
    sourcemap: false,
  },
})
