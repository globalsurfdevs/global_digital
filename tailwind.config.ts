import type { Config } from "tailwindcss";

export default {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      container: {
        screens: {
          xs: "450px",
          sm: "610px",
          md: "738px",
          lg: "994px",
          xl: "1250px",
          xxl: "1490px",
          "3xl": "1590px",
        },
      },
      colors: {
        primary: "#E43D30",
        bglight: "#f9f9f9",
      },
      fontSize: {
        font16: "1rem",
        font19: "1.1875rem",
        font25: "1.5625rem",
        font30: "1.875rem",
        font35: "2.1875rem",
        font65: "4.0625rem",
      },
      lineHeight: {
        lh1p07: "1.076923076923077",
        lh1p4: "1.4",
        lh1p33:"1.33333333",
        lh2p3: "2.333333333333333",
        lh1p66: "1.66666666666"
      },
    },
  },
  plugins: [],
} satisfies Config;
