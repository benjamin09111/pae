const { addDynamicIconSelectors } = require('@iconify/tailwind');
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        '1': '1px',
      },
      borderColor: {
        'custom': 'rgba(60, 30, 12, 0.277)',
        "bluecustom" : "rgb(85, 187, 210)"
      },
      textColor: {
        'custom': 'rgb(85, 187, 210)',
      },
    },
  },
  plugins: [
    // Iconify plugin
    addDynamicIconSelectors(),
],
}

