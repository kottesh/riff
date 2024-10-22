/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors :{
        "comp" : "rgba(24, 27, 34, 255)",
        "concol" : "rgba(255, 218, 185)",
        "appcol" : "rgba(11, 14, 21, 255)",
        "glass" : "rgba(176, 176, 176, 0.33)",
        "pur" : "#8e7cc3",
        "cardhover" : "rgba(209,202,231,0.2)"
      },
      height :{
        '100': '27rem',
        '101': '33rem'
      },
      width :{
        '100' : '63rem',
        
      },
      boxShadow: {
        'top': '0 -4px 4px rgba(0, 0, 0, 0.2)', 
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 10s linear infinite',
      },
    },
  },
  plugins: [],
}

