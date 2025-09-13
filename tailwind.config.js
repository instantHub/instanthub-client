/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "2sm": "450px",
        "3sm": "300px",
        "14inch": "1367px", // Custom breakpoint for 14-inch laptops
      },
      colors: {
        primary: {
          DEFAULT: "#34abeb", // Default primary color
          light: "#d6eefb", // Lighter shade
          dark: "#1E40AF", // Darker shade
          cyan: "#00BCD4", // Cyan Darker shade
          cyanlight: "#e7fcff", // Cyan Lighter shade
        },
        secondary: {
          DEFAULT: "#1a1a1a", // Default secondary color
          light: "#ebebeb", // Lighter shade
          dark: "#D97706", // Darker shade
        },
        instant: {
          start: "#A7438B", // magenta-purple
          mid: "#7A84B0", // blended midpoint
          end: "#4AC0CC", // teal-cyan
        },
      },

      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-fast": "marquee-fast 25s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-150%)" },
        },
        "marquee-fast": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-450%)" },
        },
      },
    },
  },
  plugins: [],
};
