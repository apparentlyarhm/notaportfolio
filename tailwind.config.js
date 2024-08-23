import { nextui } from "@nextui-org/theme";
// import { Flowbite } from "flowbite-react";
const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        scribble: "url('/scribble.svg')",
      },
      keyframes: {
        draw: {
          "0%": { "stroke-dasharray": "0, 100", "stroke-dashoffset": "100" },
          "100%": { "stroke-dasharray": "100, 0", "stroke-dashoffset": "0" },
        },
      },
      animation: {
        draw: "draw 4s ease-in-out infinite",
      },
      colors: {
        "off-white": "#f5f5f5", // Example off-white color
        "off-gray": "#2d2d2d", // Example off-gray color
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {},
        dark: {},
      },
    }),
    flowbite.plugin(),
  ],
};
