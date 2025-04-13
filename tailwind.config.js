/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        poppins: ["poppins", "sans serif"],
        mona: ["Mona Sans", "Helvetica Neue", "Helvetica, Arial", "sans-serif"],
        geist: ["Geist Mono", "monospace"],
        IBM_flex: ["IBM Plex Mono", "monospace"],
        compforta: ["Comfortaa, sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        background: "#ffffff",
        secondary: "#f2f7f5",
        third: "#e9eaec",
        primary: "#1E88E5",
        hover: "#1565C0",
        text: "#242529",
        merah: "#ffa7a7",
        biru: "#0ebdf6",
        kuning: "#f7d15e",
        darkmode: "#59168b",
      },
    },
  },
  plugins: [],
};
