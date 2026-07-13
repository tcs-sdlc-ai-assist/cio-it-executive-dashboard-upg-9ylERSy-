/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        canon: {
          red: '#E60012',
          black: '#000000',
          grey: '#F5F5F5',
          white: '#FFFFFF',
        },
        success: '#28A745',
        warning: '#FFC107',
        danger: '#E60012',
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'Roboto', '"Segoe UI"', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1200px',
          '2xl': '1200px',
        },
      },
      maxWidth: {
        dashboard: '1200px',
      },
    },
  },
  plugins: [],
};