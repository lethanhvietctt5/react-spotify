module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  mode: "jit",
  theme: {
    extend: {
      colors: {
        greenLight: "#1db954",
        start: "#121212",
        end: "#212121",
        itemSelected: "#141414",
        greyLighter: "#282828",
        backgroundLight: "rgba(40,40,40,0.4)",
        sidebarBackground: "#000000",
        footerBackground: "#181818",
      },
      container: {
        screens: {
          mobile: "23rem",
        },
      },
      width: {
        "1/7": "14.2857143%",
        "2/7": "28.5714286%",
        "3/7": "42.8571429%",
        "4/7": "57.1428571%",
        "5/7": "71.4285714%",
        "6/7": "85.7142857%",
      },
    },

    minWidth: {
      md: "768px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
