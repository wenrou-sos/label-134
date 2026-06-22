/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        base: {
          900: '#070b16',
          800: '#0b1120',
          700: '#0f172a',
          600: '#1e293b',
          500: '#334155',
        },
        accent: {
          teal: '#14b8a6',
          coral: '#f43f5e',
          amber: '#f59e0b',
          violet: '#8b5cf6',
          sky: '#38bdf8',
        },
      },
      fontFamily: {
        display: ['Sora', 'Noto Sans SC', 'sans-serif'],
        sans: ['Noto Sans SC', 'Sora', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 8px rgba(20,184,166,0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(20,184,166,0.6)' },
        },
      },
    },
  },
  plugins: [],
}
