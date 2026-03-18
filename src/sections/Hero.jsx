import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import NetworkBackground from '../components/NetworkBackground';
import TechMatrix from '../components/TechMatrix'; // <-- Tu nuevo componente 100% código

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden">
      <NetworkBackground />
      <div className="absolute inset-0 bg-glow-gradient pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full flex flex-col md:flex-row items-center text-center md:text-left mt-10 gap-12">
        
        {/* LADO IZQUIERDO: TEXTO */}
        <div className="flex-1 flex flex-col items-center md:items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-wide text-primary uppercase">Accepting high-impact roles</span>
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-primary mb-6 leading-[1.1]"
          >
            I architect systems that <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-400 to-purple-400">
              scale businesses.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-muted max-w-xl mb-10 leading-relaxed font-light"
          >
            Senior-level execution in event-driven automation, resilient backend infrastructure, and native ecosystem development. I don't just write code; I solve operational bottlenecks.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a href="/#projects" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-background px-8 py-3.5 rounded-xl font-bold hover:scale-105 transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Explore Architecture <ArrowRight size={18} strokeWidth={2.5} />
            </a>
            <a href="/CV_Miguel_Moreno.pdf" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-primary px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-colors duration-200">
              <FileText size={18} /> View Resume
            </a>
          </motion.div>
        </div>

        {/* LADO DERECHO: LA MATRIZ DE ANIME.JS */}
        <div className="flex-1 w-full">
          <TechMatrix />
        </div>

      </div>
    </section>
  );
}

export default Hero;