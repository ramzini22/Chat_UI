/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { envs } from './envs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: envs.host,
    port: envs.port,
  },
  define: {
    'process.env': {},
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
});
