/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'radial-pink': 'radial-gradient(circle, #FF61B2, #FE0D89)',
        'radial-orange': 'radial-gradient(circle, #FFEA04, #FF9800)'
      },
    },
    fontFamily: {
      railway:['Raleway','serif'],
      notoJp:['Noto Sans JP','serif']
    }
  },
  plugins: [],
}

