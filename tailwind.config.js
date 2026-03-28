/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        background: '#050505',
        surface: '#0d0d0d',
        border: 'rgba(255,255,255,0.06)',
        primary: '#f1f5f9',
        muted: '#64748b',
        accent: '#e2e8f0',
      },
    },
  },
  plugins: [],
}