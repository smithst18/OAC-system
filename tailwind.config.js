/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    colors: {
      'primary': '#0B2D4E', //este es el azulito oscuro principal
      'primary-light':'#2E3192',
      'secondary': '#ecfeff', //esto esta de cambiar
      'third': '#C7EAFB',
      'aux': '#1172BA',     //esto tambien
    }
  },
};
export const plugins = [];

