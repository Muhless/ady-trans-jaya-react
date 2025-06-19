/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
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
        sidebar: "#405189",
        bg: "#f4f3f9",
        third: "#f1f4f9",
        cardbg: "#ffffff",
        text: "#242529",
        merah: "#ffa7a7",
        biru: "#0ebdf6",
        kuning: "#f7d15e",
        darkmode: "#59168b",
        background: "hsl(var(--background))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        foreground: "hsl(var(--foreground))",
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  safelist: ["bg-yellow-100", "text-yellow-800", "border-yellow-300", "bg-purple-100", "text-purple-800", "border-purple-300"],
  plugins: [import("tailwindcss-animate")],
};
