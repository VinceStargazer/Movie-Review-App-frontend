/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#171717",
        secondary: "#272727",
        tertiary: '#373737',
        fourth: '#575757',
        "dark-subtle": "rgba(255, 255, 255, 0.5)",
        "light-subtle": "rgba(39, 39, 39, 0.5)",
        zinc: "#f2f2f2",
        gray: "#e0e0e0",
        "light-fourth": "#c0c0c0",
        "highlight-dark": "#ffc200",
        highlight: "#603e05",
        "highlight-deep": "#e09211",
        "dark-blue": "#4985e2",
        "light-blue": "#04307d",
      },
    },
    fontFamily: {
      sans: ["Helvetica", "Arial", "ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      display: ["Oswald"],
      body: ['"Open Sans"'],
    },
  },
  plugins: [],
};
