module.exports = {
  purge: ['./src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'my-primary': '#68B116',
        'my-blue': '#242A45',
        'my-grey': '#d9d9d9',
        'my-black': '#1f1f1f',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
