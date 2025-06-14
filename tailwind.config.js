/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        holicraft: {
          terracotta: '#B25A3C',
          mustard: '#D39E42',
          blush: '#E2B6A0',
          cream: '#F9F6F1',
          beige: '#EFE5DC',
          white: '#FFFDFB',
          brown: '#4A2C1A',
          charcoal: '#5B4B3A',
          clay: '#C2A899',
          hover: '#934830',
        }
      }
    }
  },
  plugins: [],
}; 