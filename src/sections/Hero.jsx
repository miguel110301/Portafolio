import { motion } from 'framer-motion';
import { ArrowRight, Terminal, FileText } from 'lucide-react';

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-glow-gradient pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium tracking-wide text-muted uppercase">Disponible para proyectos</span>
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-primary mb-6 leading-tight max-w-4xl"
        >
          Construyendo sistemas que <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
            automatizan el trabajo.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg md:text-xl text-muted max-w-2xl mb-10 leading-relaxed"
        >
          Diseño arquitecturas backend, integro APIs y desarrollo aplicaciones enfocadas en rendimiento, utilidad y operaciones reales.
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a href="/#projects" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-background px-8 py-3.5 rounded-full font-medium hover:scale-105 transition-transform duration-200">
            Ver Proyectos <ArrowRight size={18} />
          </a>
          <a href="/#contact" className="w-full sm:w-auto flex items-center justify-center gap-2 glass-panel text-primary px-8 py-3.5 rounded-full font-medium hover:bg-white/5 transition-colors duration-200">
            <Terminal size={18} /> Hablemos
          </a>
          <a href="/CV_Miguel_Moreno.pdf" download className="w-full sm:w-auto flex items-center justify-center gap-2 text-muted hover:text-primary px-6 py-3.5 rounded-full font-medium transition-colors duration-200">
            <FileText size={18} /> Descargar CV
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;