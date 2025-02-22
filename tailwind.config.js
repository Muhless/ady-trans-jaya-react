/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        poppins: ["poppins", "sans serif"],
        mona: ["Mona Sans", "Helvetica Neue", "Helvetica, Arial", "sans-serif"],
      },
      colors: {
        background: "#E7ECEF",
        text: "#212529",
        primary: "#6096BA",
        secondary: "#8B8C89",
        card: "#274C77",
        highlight: "#fca311",
        hover: "#A3CEF1",
        sidebar: "#ffffff",
        accent: "#FFD700",
        border: "#8B8C89",
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
