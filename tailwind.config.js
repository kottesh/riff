/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                comp: "rgba(24, 27, 34, 255)",
                concol: "rgba(255, 218, 185)",
                appcol: "rgba(11, 14, 21, 255)",
                glass: "rgba(176, 176, 176, 0.33)",
                pur: "#8e7cc3",
                cardhover: "rgba(209,202,231,0.2)",
            },
            height: {
                100: "27rem",
                101: "33rem",
            },
            width: {
                100: "63rem",
            },
            boxShadow: {
                top: "0 -4px 4px rgba(0, 0, 0, 0.2)",
            },
            fontFamily: {
                sans: ["Helvetica", "Arial", "sans-serif"],
                raleway: ["Raleway", "sans-serif"],
                figtree: ["Figtree", "sans-serif"],
            },
            animation: {
                "marquee" : "marquee 10s linear infinite",
                "music-bar-1": "music-bar-1 1s ease-in-out infinite",
                "music-bar-2": "music-bar-2 1s ease-in-out infinite",
                "music-bar-3": "music-bar-3 1s ease-in-out infinite",
            },
            keyframes: {
                "music-bar-1": {
                    "0%, 100%": { height: "4px" },
                    "50%": { height: "12px" },
                },
                "music-bar-2": {
                    "0%, 100%": { height: "12px" },
                    "50%": { height: "4px" },
                },
                "music-bar-3": {
                    "0%, 100%": { height: "8px" },
                    "50%": { height: "16px" },
                },
            },
        },
    },
    plugins: [],
};
