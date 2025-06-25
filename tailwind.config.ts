import flowbite from "flowbite-react/tailwind";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  safelist: [
    // Safelist all grid-related classes
    "grid",
    "grid-cols-1",
    "grid-cols-2",
    "grid-cols-3",
    "grid-cols-4",
    "grid-cols-5",
    "grid-cols-6",
    "grid-cols-7",
    "grid-cols-8",
    "grid-cols-9",
    "grid-cols-10",
    "grid-cols-11",
    "grid-cols-12",

    // Safelist all col-span classes
    "col-span-1",
    "col-span-2",
    "col-span-3",
    "col-span-4",
    "col-span-5",
    "col-span-6",
    "col-span-7",
    "col-span-8",
    "col-span-9",
    "col-span-10",
    "col-span-11",
    "col-span-12",

    // Include responsive variants (e.g., lg:col-span-9, xl:grid-cols-12)
    {
      pattern: /col-span-\d{1,2}/, // Matches all col-span-1, col-span-2, ..., col-span-12
      variants: ["lg", "xl", "md", "sm"], // Includes responsive variants
    },
    {
      pattern: /grid-cols-\d{1,2}/, // Matches all grid-cols-1, grid-cols-2, ..., grid-cols-12
      variants: ["lg", "xl", "md", "sm"], // Includes responsive variants
    },
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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
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
        font95: "clamp(2.5rem, 8vw, 6rem)",
        font100: "clamp(2.5rem, 8vw, 6.5rem)",
        font120: "clamp(3rem, 8vw, 7.5rem)",
        fontsmall30: "clamp(1rem, 2.5vw, 1.875rem)",
      },
      lineHeight: {
        lh0p76: "0.7692307692307692",
        lh1: "1",
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        "140": "140px",
        "75": "75px",
      },
    },
  },
  plugins: [flowbite.plugin(), require("tailwindcss-animate")],
};

export default config;