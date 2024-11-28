import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: "0.0.0.0", // Expose to all network interfaces
    port: 3000, // Default port
    strictPort: true, // If port is in use, don't try another one
    open: true // Open browser on server start
  }
});
