import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, FileText, Terminal } from 'lucide-react';
import { useRef } from 'react';
import TechMatrix from '../components/TechMatrix';

function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Efectos de scroll
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section ref={containerRef} id="hero" className="relative min-h-[110vh] flex items-start pt-32 md:pt-44 overflow-hidden bg-[#050505]">
      {/* Grilla Técnica de fondo */}
      <motion.div 
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [0, 200]),
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
          backgroundSize: '50px 50px' 
        }}
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LADO IZQUIERDO: Información */}
        <motion.div style={{ opacity, y, scale }} className="lg:col-span-7 flex flex-col items-start">
          <div className="flex items-center gap-3 px-3 py-1.5 rounded-sm border border-white/10 bg-white/5 mb-8 w-fit">
            <span className="flex h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="protocol-label !mb-0 !opacity-100">Systems_Status: Operational</span>
          </div>

          <h1 className="section-title mb-6 leading-[0.9]">
            ENGINEERING <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/50 to-transparent">
              SOLUTIONS.
            </span>
          </h1>

          <p className="text-base md:text-lg text-muted max-w-lg mb-10 font-medium leading-relaxed border-l-2 border-white/10 pl-6">
            Como Automation & Backend Engineer, diseño arquitecturas orientadas a eventos que eliminan cuellos de botella operativos. 
            Especializado en orquestación con n8n y sistemas robustos en Python.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="/#projects" className="group flex items-center gap-4 bg-white text-black px-6 py-3.5 rounded-sm font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-accent transition-all">
              Deployments <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="/CVAutomat.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-4 border border-white/20 px-6 py-3.5 rounded-sm font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-white/5 transition-all text-white">
              <FileText size={14} /> Documentation
            </a>
          </div>
        </motion.div>

        {/* LADO DERECHO: Visual */}
        <div className="lg:col-span-5 hidden lg:block sticky top-44">
           <TechMatrix />
           <div className="mt-8 flex justify-end">
              <div className="text-[9px] font-mono text-muted/40 uppercase tracking-[0.4em] rotate-90 origin-right translate-y-12">
                Dev_Stack.v2026
              </div>
           </div>
        </div>
      </div>
      
      {/* Indicador de scroll lateral */}
      <div className="absolute right-10 bottom-20 hidden md:block">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-16 bg-gradient-to-b from-accent to-transparent"
        />
      </div>
    </section>
  );
}

export default Hero;