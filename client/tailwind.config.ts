import flowbitePlugin from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/@material-tailwind/react/components/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        oxygen: ["Oxygen", "sans-serif"],
      },
    },
  },
  plugins: [flowbitePlugin],
};

export default tailwindConfig;
