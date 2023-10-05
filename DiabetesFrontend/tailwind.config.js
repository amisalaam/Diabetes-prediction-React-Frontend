module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class', // Set dark mode to 'class'
  variants: {
    extend: {
      textOpacity: ['dark'],
    },
  },
};
