/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js", // configure the Flowbite JS source template paths
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
