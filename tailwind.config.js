module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      gentiumBasic: "Gentium Basic"
    },
    theme: {
      screens: {
        tablet: "820px",
        laptop: "1024px",
        desktop: "1280px"
      }
    },
    extend: {
      boxShadow: {
        accordion: "-1.74129px 3.48259px 21.7662px rgba(238, 238, 233, 1)",
        table: "0px 4.62128px 18.4851px rgba(53, 55, 81, 0.06)",
        overview: "-2px 4px 25px rgba(238, 238, 233, 1)"
      }
    }
  },
  plugins: []
};
