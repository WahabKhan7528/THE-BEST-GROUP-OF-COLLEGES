import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        college: {
          navy: '#0b1a2e',
          gold: '#c5a059',
        },
        // Dark mode surfaces using college-navy shades
        dark: {
          base: '#0b1a2e',        
          surface: '#112240',     
          elevated: '#1a2f4e',    
          border: 'rgba(197, 160, 89, 0.15)', 
        },
      },
    },
  },
  plugins: [forms],
}