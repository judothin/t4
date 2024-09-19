/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./*.html', './src/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
      screens: {
        'mdm': {'max': '768px'},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
}
