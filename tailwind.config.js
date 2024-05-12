/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        
        "2sm": "450px",
        "3sm": "300px",
      },
    },
  },
  plugins: [],
};
