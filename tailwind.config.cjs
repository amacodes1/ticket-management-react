module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "container-xl": "1440px",
      },
      colors: {
        "brand-purple": "#C6B9FF", // light purple
        "brand-deep": "#6B46C1",
        "brand-black": "#0B0B0B",
      },
    },
  },
  plugins: [],
};
