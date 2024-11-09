/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5f6FFF", // Custom primary color
      },
      gridTemplateColumns: {
        'autoFill': 'repeat(auto-fill, minmax(200px, 1fr))', // Custom grid layout
      },
    },
  },
  plugins: [],
};
