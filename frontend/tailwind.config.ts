/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--font-rubik)", "Rubik", "sans-serif"],
        secondary: ["DM Sans", "sans-serif"],
        spotify: ["Spotify Mix", "sans-serif"],
      },
      colors: {
        "spotify-green": "#1ed760",
        "spotify-black": "#121212",
        "spotify-dark-gray": "#191414",
        "sidebar-inactive": "#949EA2",
      },
    },
  },
  plugins: [],
};
