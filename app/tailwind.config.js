/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mulish: ['Mulish_400Regular', 'Mulish_600SemiBold', 'Mulish_700Bold', 'Mulish_500Medium'],
      },
    },
  },
  plugins: [],
};
