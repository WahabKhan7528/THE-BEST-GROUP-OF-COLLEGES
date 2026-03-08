import plugin from 'tailwindcss/plugin';

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
        primary: {
          DEFAULT: '#2563EB',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#2563EB',
          600: '#1D4E89',
          700: '#123A6B',
          800: '#0F2A52',
          900: '#0B1F3B',
          950: '#081628',
        },
        secondary: {
          DEFAULT: '#64748B',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        // Naming them for easy use
        surface: '#FFFFFF',
        background: '#F8FAFC',
        border: '#E2E8F0',
        'text-primary': '#1E293B',
        'text-secondary': '#64748B',
        college: {
          navy: '#0b1a2e',
          gold: '#c5a059',
        },
        // Dark mode surfaces using college-navy shades
        dark: {
          base: '#0b1a2e',        // college-navy — main bg
          surface: '#112240',     // slightly lighter navy — cards, panels
          elevated: '#1a2f4e',    // even lighter — elevated cards, modals
          border: 'rgba(197, 160, 89, 0.15)', // gold-tinted border
        },
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // Dark mode base styles using college-navy
    plugin(function ({ addBase }) {
      addBase({
        // Body & HTML dark mode
        'html.dark': {
          backgroundColor: '#0b1a2e',
          color: '#e2e8f0',
        },
        'html.dark body': {
          backgroundColor: '#0b1a2e',
          color: '#e2e8f0',
        },
        // Headings
        'html.dark h1, html.dark h2, html.dark h3, html.dark h4, html.dark h5, html.dark h6': {
          color: '#f1f5f9',
        },
        // Inputs, selects, textareas
        'html.dark input, html.dark select, html.dark textarea': {
          backgroundColor: '#112240',
          borderColor: 'rgba(197, 160, 89, 0.15)',
          color: '#e2e8f0',
        },
        'html.dark input::placeholder, html.dark select::placeholder, html.dark textarea::placeholder': {
          color: '#64748b',
        },
      });
    }),
  ],
}