/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx,ts}"],
  // prefix: ".my-extension-overlay",
  theme: {
    colors: {
      primary: "#212121cc",
      secondary: "#fa7930ff",
      darkblue: "#364570ff",
      lightgreen: "#9cbec6ff",
      white: "#fff",
      chipbg: "#34495e",
    },
    extend: {
      fontFamily: {
        lexend: ["Lexend", "sans-serif"],
        montSerrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
