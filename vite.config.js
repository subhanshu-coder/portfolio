import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/3dportfolio/', 
  plugins: [react()],
  // This must match your repository name!
});
