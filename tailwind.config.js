/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    colors: {
      'primary': '#1B1464', //este es el azulito oscuro principal
      'secondary': '#0071BC', //esto esta de cambiar
      'third': '#F2F2F2',
      'aux': '#662D91',     //esto tambien
    }
  },
};
export const plugins = [];

