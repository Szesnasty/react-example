/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // `svgr` pozwala wczytać pliki z `src/assets/icons` jako komponenty (`*.svg?react`),
  // dzięki czemu ikona zostaje inline'owym `<svg>` i dziedziczy `currentColor`.
  plugins: [react(), svgr()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
  },
})
