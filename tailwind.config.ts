import prelinePlugin from 'preline/plugin';
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'selector',
    content: ['./src/**/*.{ts,tsx}', './index.html', 'node_modules/preline/dist/*.js'],
    theme: {
        extend: {},
    },
    plugins: [prelinePlugin],
};
