module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
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
}
