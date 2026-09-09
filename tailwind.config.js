/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF8F5',
          100: '#FBF9F5',
          200: '#F5F0E6',
          300: '#EBE2D0',
        },
        gold: {
          400: '#E2C275',
          500: '#D4AF37',
          600: '#C5A059',
          700: '#9B7B34',
        },
        charcoal: {
          800: '#262626',
          900: '#1A1A1A',
          950: '#111111',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
