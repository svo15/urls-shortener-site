/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      'Cyan':'hsl(180, 66%, 49%)',
      'Dark-Violet':'hsl(257, 27%, 26%)',
      'Gray': 'hsl(0, 0%, 75%)',
      'Grayish-Violet':'hsl(257, 7%, 63%)',
      'Very-Dark-Blue':'hsl(255, 11%, 22%)',
      'Very-Dark-Violet': 'hsl(260, 8%, 14%)'
    },
    backgroundImage:{
      'input-desk':"url('../images/bg-shorten-desktop.svg')",
      'input-mobile':"url('../images/bg-shorten-mobile.svg')",
      'fotter-desk':"url('../images/bg-boost-desktop.svg')",
      'fotter-mobile':"url('../images/bg-boost-mobile.svg')"
    },
    extend: {},
  },
  plugins: [],
}

