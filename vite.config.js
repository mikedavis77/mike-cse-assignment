import { defineConfig } from 'vite';
import environmentPlugin from 'vite-plugin-environment';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [environmentPlugin(['ALGOLIA_APP_ID', 'ALGOLIA_API_KEY', 'ALGOLIA_INDEX'])],
});
