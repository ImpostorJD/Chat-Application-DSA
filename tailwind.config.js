/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   
    extend: {
      colors: {
        "primary-color" : "#FFF2D8",
        "primary-variant" : "#EAD7BB",
        "secondary-color" : "#BCA37F",
        "accent" : "#113946"
      },
    },
  },
  plugins: [],
}

