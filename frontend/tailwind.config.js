module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      laptop: "768px",
      desktop: "1024px",
    },
    extend: {
      fontFamily: {
        Stardos: ["Stardos Stencil", "cursive"],
        Ubuntu: ["Ubuntu-Bold", "cursive"],
        Poppins: ["Poppins", "cursive"],
      },
    },
  },
  plugins: [],
};
