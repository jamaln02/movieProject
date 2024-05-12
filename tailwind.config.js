/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "../node_modules/@material-tailwind/react/components/**/*.{js,jsx}",
    "../node_modules/@material-tailwind/react/theme/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
    screens: {
      sm: "480px",
      md: "650px",
      lg: "992px",
    },
    dropShadow: {
      "3xl": "0 5px 5px rgba(0 ,0 ,0 , 50%)",
    },
  },
  darkMode: "class",
  plugins: [],
});
