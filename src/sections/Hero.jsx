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

  // Scroll effects: text fades out and matrix rises slightly
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section ref={containerRef} id="hero" className="relative min-h-[110vh] flex items-start pt-32 md:pt-44 overflow-hidden bg-[#050505]">
      {/* Technical background grid that moves with scroll */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT SIDE: Info */}
        <motion.div style={{ opacity, y, scale }} className="lg:col-span-7 flex flex-col items-start">
          <div className="flex items-center gap-3 px-3 py-1 rounded-sm border border-white/10 bg-white/5 mb-8">
            <span className="flex h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[9px] font-mono tracking-[0.3em] text-accent uppercase">Systems_Status: Operational</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.9]">
            ENGINEERING <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/50 to-transparent">
              SOLUTIONS.
            </span>
          </h1>

          <p className="text-base md:text-lg text-muted max-w-lg mb-10 font-medium leading-relaxed border-l-2 border-white/10 pl-6">
            As an Automation & Backend Engineer, I design event-driven architectures that eliminate operational bottlenecks.
            Specialized in orchestration with n8n and robust systems in Python.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="/#projects" className="group flex items-center gap-4 bg-white text-black px-6 py-3.5 rounded-sm font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-accent transition-all">
              Deployments <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="/CVAutomat.pdf" target="_blank" className="flex items-center gap-4 border border-white/20 px-6 py-3.5 rounded-sm font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-white/5 transition-all text-white">
              <FileText size={14} /> Documentation
            </a>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Visual */}
        <div className="lg:col-span-5 hidden lg:block sticky top-44">
           <TechMatrix />
           <div className="mt-8 flex justify-end">
              <div className="text-[9px] font-mono text-muted/40 uppercase tracking-[0.4em] rotate-90 origin-right translate-y-12">
                Dev_Stack.v2026
              </div>
           </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
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