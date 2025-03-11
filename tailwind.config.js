/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        dark: {
          100: '#1E1E1E',
          200: '#2D2D2D',
          300: '#3C3C3C',
          400: '#4B4B4B',
          500: '#5A5A5A',
          600: '#696969',
          700: '#787878',
          800: '#878787',
          900: '#969696',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        }
      },
    },
  },
  plugins: [],
} 