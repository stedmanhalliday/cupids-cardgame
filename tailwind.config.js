module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      'serif': ['Suranna', 'Georgia', 'ui-serif', 'serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
