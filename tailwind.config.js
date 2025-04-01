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
      },
      colors: {
        // primary: "#161819",
        // secondary: "#242529",
        // text: "#e5e5e9",
        primary: "#ffffff",
        secondary: "#e5e5e9",
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
