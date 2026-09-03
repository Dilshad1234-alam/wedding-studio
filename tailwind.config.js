/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        champagne: {
          bg: '#F7F4EB',
          card: '#EFECE2',
          border: '#DFD9CB',
        },
        bronze: {
          400: '#C7A263',
          500: '#B38F4D',
          600: '#9E7738',
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
