module.exports = {
  content: [
      "./screens/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./App.{js,jsx,ts,tsx}",
  ],
  theme: {
      fontFamily: {
        'sans': ['IBMPlexSans-Regular', 'IBMPlexSans-Bold', 'IBMPlexSans-SemiBold', 'sans-serif', 'Helvetica', 'Arial', 'sans-serif'],
        'ibm': ['IBMPlexSans-Bold'],
      },
      extend: {},
  },
  plugins: [],
};