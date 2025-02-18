import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/superhero-wordle/', // ✅ Replace with your GitHub repo name
  build: {
    outDir: 'dist', // ✅ Ensure the build output goes to 'dist'
  },
});
