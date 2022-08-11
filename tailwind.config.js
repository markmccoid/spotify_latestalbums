/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      flex: {
        25: "1 1 25%",
        75: "1 1 75%",
      },
    },
    fontFamily: {
      body: ["Andada Pro", "serif"],
      // sans: ["ui-sans-serif", "system-ui"],
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("tailwind-scrollbar"),
    require("@tailwindcss/forms"),
  ],
};
