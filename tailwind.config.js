/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: '#FF9933',
          dark: '#E68A00',
          light: '#FFB366',
        },
        indiaGreen: {
          DEFAULT: '#138808',
          dark: '#0E6606',
          light: '#1AC20B',
        },
        cream: {
          DEFAULT: '#FFFDF5',
          dark: '#F5F5DC',
        },
        accent: {
          DEFAULT: '#F4C430',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
