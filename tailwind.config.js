module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/stories/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cochin', 'Georgia', 'Times', 'Times New Roman'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
