/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "first-blue":"var(--color-secondary-1-1st-blue)",
        "second-blue":"var(--color-secondary-1-2nd-blue)"
      }
    },
  },
  plugins: [],
}

