/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",    // all your React source files 
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // flowbite-react
  ],
  theme: {
    extend: { 
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
