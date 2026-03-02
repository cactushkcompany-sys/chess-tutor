import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4CAF50",
        secondary: "#2196F3",
        success: "#8BC34A",
        warning: "#FFC107",
      },
    },
  },
  plugins: [],
} satisfies Config;
