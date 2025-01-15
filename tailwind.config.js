/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'radial': 'radial-gradient(circle, #FF61B2, #FE0D89)',
      },
    },
    fontFamily: {
      railway:['Raleway','serif'],
      notoJp:['Noto Sans JP','serif']
    }
  },
  plugins: [],
}

