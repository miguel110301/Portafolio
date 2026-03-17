/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a', // Un negro casi puro, muy elegante
        surface: '#121212', // Ligeramente más claro para tarjetas
        border: 'rgba(255,255,255,0.08)',
        primary: '#f8fafc', // Texto principal (casi blanco)
        muted: '#94a3b8', // Texto secundario
        accent: '#38bdf8', // Un azul sutil para detalles (tipo iOS)
      },
      backgroundImage: {
        'glow-gradient': 'radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.15), transparent 50%)',
      }
    },
  },
  plugins: [],
}