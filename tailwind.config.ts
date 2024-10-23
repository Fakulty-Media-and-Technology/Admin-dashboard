import { Manrope } from "next/font/google";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/screens/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        black1: "#161616",
        black2: "#181818",
        black3: "#212121",
        black4: "#3A3A39",
        grey_1: "#252424",
        grey_2: "#DEDEDE",
        grey_500: "#C4C4C4",
        grey_600: "#747474",
        grey_700: "#848282",
        grey_800: "#909090",
        grey_dark: "#323232",
        input_grey: "#BCC1CA73",
        border_dark: "#3D3C41",
        border_grey: "#D9D9D938",
        red: "#FF1313",
        yellow: "#F8A72D",
        red_500: "#CD201F",
        blue_200: "#379AE6",
        green_400: "#29A87C",
      },
      fontFamily: {
        // manrope_400: [inter2.className],
      },
    },
  },
  plugins: [],
};
export default config;
