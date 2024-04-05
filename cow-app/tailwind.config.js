/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        sans: ['Fredoka', 'sans-serif'],
      },
      colors:{
        'brownppal': '#36190D',
        'amarello' : '#FFA72F',
        'brownsec'  : '582B1C',
        'rederror' :  '#FF2530',
        'greensucess' : '#66B04C'
      }
    },
  },
  plugins: [],
};
