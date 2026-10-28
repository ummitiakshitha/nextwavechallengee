/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nxtwave: {
          blue: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            500: '#3b82f6',
            600: '#1565D8', // NxtWave Brand Primary Blue
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#0A2540', // Deep NxtWave Navy
          },
          dark: '#0A192F',
          navy: '#0E1E38',
          accent: '#00B290',
          orange: '#F3705A',
          amber: '#FFD15C',
          slate: '#475569',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'nxt': '0 4px 20px -2px rgba(21, 101, 216, 0.12), 0 2px 6px -1px rgba(0, 0, 0, 0.06)',
        'nxt-hover': '0 12px 30px -4px rgba(21, 101, 216, 0.22), 0 4px 12px -2px rgba(0, 0, 0, 0.08)',
        'card': '0 2px 12px rgba(15, 23, 42, 0.06)',
        'glow': '0 0 24px rgba(21, 101, 216, 0.35)',
      }
    },
  },
  plugins: [],
}
