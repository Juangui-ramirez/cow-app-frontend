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
        'brownsec'  : '#582B1C',
        'rederror' :  '#FF2530',
        'greensucess' : '#66B04C'
      }
    },
    
    screens: {
      'sm': '600px',
      // => @media (min-width: 600px) { ... }

      'md': '769px',
      // => @media (min-width: 769px) { ... }

      'lg': '900px',
      // => @media (min-width: 900px) { ... }

      'xl': '1200px',
      // => @media (min-width: 1400px) { ... }
    },
  },
  plugins: [],
};
