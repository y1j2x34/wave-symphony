/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    server: {
        port: 3000,
    },
    plugins: [solidPlugin({})],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        conditions: ['development', 'browser'],
    },
    build: {
        target: 'esnext',
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['node_modules/@testing-library/jest-dom/vitest', 'node_modules/whatwg-fetch/fetch.js'],
        isolate: false,
        coverage: {
            reporter: ['text-summary', 'cobertura', 'html'],
        },
    },
});
