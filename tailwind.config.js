/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      animation: {
        'pulse': 'pulse 0.3s ease-in-out',
        'bounce': 'bounce 0.4s ease-in-out',
      }
    },
  },
  plugins: [],
};