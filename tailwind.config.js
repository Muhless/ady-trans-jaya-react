/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"]
      },
      colors: {
        primary: "#242529",
        secondary: "#363740",
        third:"#a7abff"
      },
    },
  },
  plugins: [],
};
