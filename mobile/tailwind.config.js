/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans", "sans-serif"],
      },
      colors: {
        cardBorder: "#EDEDED",
        starColor: "#FFCD48",
        gradientStart: "#28CE9C",
        gradientEnd: "#6AC9FF",
      },
      borderRadius: {
        "4xl": "36px",
      },
    },
  },
  plugins: [],
};
