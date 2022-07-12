/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('config/tailwind/config')],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
}
