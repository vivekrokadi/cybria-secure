/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(to right, #2B7BE4, #FF5CA8, #7C3AED)',
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          from: {
            boxShadow: '0 0 20px rgba(43, 123, 228, 0.3), 0 0 40px rgba(255, 92, 168, 0.2), 0 0 60px rgba(124, 58, 237, 0.1)',
          },
          to: {
            boxShadow: '0 0 30px rgba(43, 123, 228, 0.4), 0 0 50px rgba(255, 92, 168, 0.3), 0 0 70px rgba(124, 58, 237, 0.2)',
          },
        },
      },
    },
  },
  plugins: [],
}