/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FAFAFA',
          surface: '#FFFFFF',
          card: '#FFFFFF',
          border: 'rgba(0, 0, 0, 0.08)',
          black: '#111111',
          dark: '#1C1D21',
          green: {
            DEFAULT: '#00C853',
            glow: '#00E871',
            dark: '#009624',
            light: '#69F0AE',
            subtle: '#E8F5E9',
          },
          neutral: {
            50: '#FAFAFA',
            100: '#F5F5F7',
            200: '#E5E7EB',
            300: '#D1D5DB',
            400: '#9CA3AF',
            500: '#6B7280',
            600: '#4B5563',
            700: '#374151',
            800: '#1F2937',
            900: '#111827',
          }
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Space Grotesk', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 45px -10px rgba(0, 0, 0, 0.07), 0 0 1px 1px rgba(0, 0, 0, 0.04)',
        'luxury-hover': '0 30px 60px -12px rgba(0, 0, 0, 0.12), 0 0 20px 0 rgba(0, 200, 83, 0.15)',
        'glow-green': '0 0 35px -5px rgba(0, 200, 83, 0.35)',
        'glow-green-sm': '0 0 15px -2px rgba(0, 200, 83, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'marquee': 'marquee 28s linear infinite',
        'marquee-reverse': 'marqueeReverse 32s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      }
    },
  },
  plugins: [],
}
