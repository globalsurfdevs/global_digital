import flowbite from "flowbite-react/tailwind";

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      screens: {
        xs: "450px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        xxl: "1400px",
        "3xl": "1650px",
      },
      container: {
        screens: {
          xs: "450px",
          sm: "568px",
          md: "768px",
          lg: "992px",
          xl: "1200px",
          xxl: "1400px",
          "3xl": "1650px",
        },
      },
      colors: {
        primary: "#E63E31",
        bglight: "#f9f9f9",
        gray1: "#77787B",
        dgray: "#F2F2F2",
        white: "#ffffff",
        gray2: "#424242",
        clrE6E6E6: "#E6E6E6",
      },
      fontSize: {
        font14: "clamp(0.7rem,1.2vw,0.875rem)",
        font16: "clamp(0.7rem, 1.5vw, 1rem)",
        font19: "clamp(15px, 2vw, 19px)",
        font25: "clamp(0.9rem, 3vw, 1.5625rem)",
        font30: "clamp(1.5rem, 2.5vw, 1.875rem)",
        font35: "clamp(1.6rem, 3.5vw, 2.1875rem)",
        font65: "clamp(1.9rem, 4.5vw, 4.0625rem)",
        font80: "clamp(2.5rem, 8vw, 5rem)",

        fontsmall30: "clamp(1rem, 2.5vw, 1.875rem)",
      },
      lineHeight: {
        lh0p76: "0.7692307692307692",
        lh1p07: "1.076923076923077",
        lh1p22: "1.2",
        lh1p26: "1.266666666666667",
        lh1p33: "1.33333333",
        lh1p78: "1.785714285714286",
        lh1p48: "1.48",
        lh1p4: "1.4",
        lh2p3: "2.333333333333333",
        lh1p66: "1.66666666666",
        lh1p18: "1.1875",
        lh95: "95",
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};

export default config;