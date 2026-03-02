/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#080150', // The deep blue
          accent: '#85ff00', // The neon green
          light: '#f9fafb',
        }
      }
    },
  },
  plugins: [],
}