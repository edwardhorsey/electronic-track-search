module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/stories/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cochin', 'Georgia', 'Times', 'Times New Roman'],
      },
      minHeight: {
        '700': '700px',
      },
    },
    screens: {
      xxs: '360px', // this is custom
      xs: '480px', // this is custom
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};
