// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Here, 'iransans' will be used as a Tailwind class: font-iransans
        'iransans': ['IRANSans', 'sans-serif'], // 'IRANSans' must exactly match the font-family name in @font-face
      },
    },
  },
  plugins: [],
}