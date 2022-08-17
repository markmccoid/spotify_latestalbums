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
      colors: {
        highlight_bg: "#22202d",
        highlight_txt: "#fbf9fc",
        orange_mm: "#ff7d33",
        mm_light: "#9e9fee",
        btn_bg_sel: "#14101d",
        btn_bg: "#232035",
        btn_txt: "#fbf9fc",
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
