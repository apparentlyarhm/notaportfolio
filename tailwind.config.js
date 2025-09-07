import { heroui } from "@heroui/theme";
// import { Flowbite } from "flowbite-react";
const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        scribble: "url('/scribble.svg')",
        'sunny-sky': "linear-gradient(109.6deg, rgba(254,253,205,0.4) 11.2%, rgba(163,230,255,0.4) 91.1%)",
      },
      keyframes: {
        draw: {
          "0%": { "stroke-dasharray": "0, 100", "stroke-dashoffset": "100" },
          "100%": { "stroke-dasharray": "100, 0", "stroke-dashoffset": "0" },
        },
        'gradient-zoom': {
          '0%': {
            backgroundSize: '200% 200%',
            backgroundPosition: '0% 0%',
          },
          '25%': {
            backgroundSize: '250% 250%',
            backgroundPosition: '50% 30%',
          },
          '50%': {
            backgroundSize: '300% 300%',
            backgroundPosition: '100% 100%',
          },
          '75%': {
            backgroundSize: '250% 250%',
            backgroundPosition: '50% 70%',
          },
          '100%': {
            backgroundSize: '200% 200%',
            backgroundPosition: '0% 0%',
          },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        draw: "draw 4s ease-in-out infinite",
        'gradient-zoom': 'gradient-zoom 10s ease-in-out infinite',
        'blink': 'blink 0.8s infinite steps(1, start)',
      },
      colors: {
        "off-white": "#f5f5f5", // Example off-white color
        "off-gray": "#2d2d2d", // Example off-gray color
      },
    },
  },
  darkMode: "class",
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-stroke-white': {
          '-webkit-text-stroke': '1px white',
          'color': 'transparent',
        },
        '.text-stroke-black': {
          '-webkit-text-stroke': '1px black',
          'color': 'transparent',
        },
      })
    },
    heroui({
      themes: {
        light: {},
        dark: {},
      },
    }),
    flowbite.plugin(),
  ],
};
