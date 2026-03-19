/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Establecemos Inter como la fuente principal del proyecto
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        background: '#0a0a0a',
        surface: '#121212',
        border: 'rgba(255,255,255,0.08)',
        primary: '#f8fafc',
        muted: '#94a3b8',
        accent: '#38bdf8',
      },
    },
  },
  plugins: [],
}