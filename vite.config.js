import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Keep production bundles from publishing source maps for internal source disclosure.
    sourcemap: false,
  },
})
