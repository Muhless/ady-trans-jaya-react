/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        background: "#f0f4f9",
        text: "#212529",
        primary: "#127ABF",
        secondary:'#E3E6E8',
        card:'#FFFFFF',
        highlight: "#50FA7B",
        hover:"#0A5A8E",
        accent:'#FFD700',
        border:'#D1D5DB',
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
