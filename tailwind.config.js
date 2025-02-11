/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        primary: "#F5F5F5",
        secondary: "#364F6B",
        third: "#3FC1C9",
        fourth: "#a7abff",
        fifth: "#DBEBEB",
        kuning: "#fdd47b",
        orange: "#fea755",
        merah: "#e76d78",
        hijau: "#87e1ca",
        sky: "#80dae0",
        biru: "#5fc1eb",
      },
    },
  },
  plugins: [],
};
