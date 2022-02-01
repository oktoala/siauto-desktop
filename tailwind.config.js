module.exports = {
  purge: ['./src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        'my-primary': '#68B116',
        'my-blue': '#242A45',
        'my-grey': '#b3b3b3',
        'my-black': '#1f1f1f',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
