/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#1E1E1E",
      },
      colors: {
        red: {
          primary: "#ff0000",
        }
      }
    },
  },
  plugins: [],
}