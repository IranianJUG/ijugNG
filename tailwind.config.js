/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        'zeus': {
          '50': '#f5f6f0',
          '100': '#e9e9d8',
          '200': '#d4d3b4',
          '300': '#bcb888',
          '400': '#a8a167',
          '500': '#998f59',
          '600': '#83764b',
          '700': '#6a5c3e',
          '800': '#5a4d39',
          '900': '#4f4434',
          '950': '#32291f',
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["winter", "dracula"],
  },
}
