import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// vite.config.js

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001', // The backend API URL
        changeOrigin: true,             // Avoid CORS issues
        rewrite: (path) => path.replace(/^\/api/, ''),  // Optional: Remove '/api' from the URL
      },
    },
  },
});

// export default defineConfig({
//   plugins: [react()],
//     server: {
//       proxy: {
//         '/api': 'http://localhost:5000', // Proxy API requests to the Flask server
//       }
//     }
// });
