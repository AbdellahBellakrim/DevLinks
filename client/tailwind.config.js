/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "custom-blue": "0.5px 0.5px 80px 0.5px rgba(99, 60, 255, 0.5)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
