/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './pages/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // classes used across the projects
        Terminal: ['terminal', ...defaultTheme.fontFamily.sans],
        Authentic_l: ['authentic_l', ...defaultTheme.fontFamily.sans],
        Authentic_n: ['authentic_n', ...defaultTheme.fontFamily.sans],
        Authentic_b: ['authentic_b', ...defaultTheme.fontFamily.sans],
        Sligoil: ['sligoil', ...defaultTheme.fontFamily.sans],
        Proto: ['proto', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
