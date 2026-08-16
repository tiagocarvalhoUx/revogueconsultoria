/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: { ink: '#0c0b0e', lime: '#7ffaab', panel: '#151419' },
      fontFamily: { sans: ['Poppins', 'sans-serif'], display: ['Poppins', 'sans-serif'] }
    }
  },
  plugins: []
}
