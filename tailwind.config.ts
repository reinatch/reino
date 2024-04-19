import type { Config } from 'tailwindcss';
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        Terminal: ["terminal", ...fontFamily.sans],
        Authentic_l: ["authentic_l", ...fontFamily.sans],
        Authentic_n: ["authentic_n", ...fontFamily.sans],
        Authentic_b: ["authentic_b", ...fontFamily.sans],
        Sligoil: ["sligoil", ...fontFamily.sans],
    }
    },
  },
  plugins: [],
};
export default config;
