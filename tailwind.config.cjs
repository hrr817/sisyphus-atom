// tailwind.config.cjs

module.exports = {
  // add this section
  purge: ["./src/**/*.html", "./src/**/*.svelte"],

  // or 'media' or 'class'
  darkMode: false,

  theme: {
    extend: {},
  },

  variants: {
    extend: {},
  },

  plugins: [],
  content: ["./src/**/*.{html,js,svelte,ts}"],
  important: true,
};
