/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 60s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-montserrat)', 'sans-serif'],
      },
      colors: {
        champagne: {
          bg: '#F7F4EB',
          card: '#EFECE2',
          border: '#DFD9CB',
        },
        bronze: {
          400: '#FAF4E8',
          500: '#B38F4D',
          600: '#B38F4D',
        },
        espresso: {
          DEFAULT: '#1E1E1E',
          light: '#4A453E',
        },
      },
    },
  },
  plugins: [],
};
