/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      margin : "2px"
    },
    extend: {
      colors : {
        "pur" : "#8e7cc3",
      }
    },
  },
  plugins: [],
}

