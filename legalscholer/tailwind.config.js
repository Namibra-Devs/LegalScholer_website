import path from "path";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // navy blue
        accent: "#F59E0B",  // golden accent
      },
    },
  },
  plugins: [],
};
