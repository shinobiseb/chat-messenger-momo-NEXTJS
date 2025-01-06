import { url } from "inspector";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      orange: '#F15025',
      lightorange: '#F17325',
      black: '#1E1E1E',
      trueblack: '#000000',
      gray: '#CED0CE',
      darkgray: '#605f5e',
      lightgray: '#e6e8e6',
      yellow: '#ffc928',
      white: '#FFFFFF',
    },
    extend: {
      backgroundImage: {
        'background-svg': "url('https://images-ext-1.discordapp.net/external/zmsStY5FRnc-eyJ8QAFZiCVZuk8xJUsIkS-mG8epLJU/https/pouch.jumpshare.com/preview/b00EgR-45vJ8z9q0NGpW1kg6k8hs4VHkNjLSBN-N2DRCJfNCVs602Ck5jw6i_k0xpDaZ-yacXHkgYIk9EWBE6DOc-Fkr9NeYWUC7ON5uciI?format=webp&width=1420&height=946')",
      },
      fontFamily: {
        'roboto-thin': ['Roboto', 'sans-serif'],
        'roboto-light': ['Roboto', 'sans-serif'],
        'roboto-regular': ['Roboto', 'sans-serif'],
        'roboto-medium': ['Roboto', 'sans-serif'],
        'roboto-bold': ['Roboto', 'sans-serif'],
        'roboto-black': ['Roboto', 'sans-serif'],
        'roboto-thin-italic': ['Roboto', 'sans-serif'],
        'roboto-light-italic': ['Roboto', 'sans-serif'],
        'roboto-regular-italic': ['Roboto', 'sans-serif'],
        'roboto-medium-italic': ['Roboto', 'sans-serif'],
        'roboto-bold-italic': ['Roboto', 'sans-serif'],
        'roboto-black-italic': ['Roboto', 'sans-serif'],
      },
      fontWeight: {
        'thin': 100,
        'light': 300,
        'regular': 400,
        'medium': 500,
        'bold': 700,
        'black': 900,
      },
      fontStyle: {
        'normal': 'normal',
        'italic': 'italic',
      },
    },
  },
  plugins: [],
}