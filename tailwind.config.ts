import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        screens: {
            xs: '450px',
            sm: '610px',
            md: '738px',
            lg: '994px',
            xl: '1250px',
            xxl: '1490px',
            '3xl': '1590px'
        }
    },
    colors: {
        primary: '#E43D30'
    },
    },
  },
  plugins: [],
} satisfies Config;
