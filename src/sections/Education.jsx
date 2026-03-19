import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import RevealText from '../components/RevealText';

function Education() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="education" className="py-16 md:py-32 relative bg-[#050505]">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="mb-20">
          <RevealText as="span" className="protocol-label" delay={0}>
            Academic_History
          </RevealText>
          <RevealText as="h2" className="section-title" delay={0.12}>
            Education.
          </RevealText>
        </div>

        <div className="relative" ref={containerRef}>
          <div className="absolute left-[11px] md:left-[calc(25%-33px)] top-2 bottom-0 w-[2px] bg-white/5" />
          
          <motion.div 
            style={{ scaleY, originY: 0 }} 
            className="absolute left-[11px] md:left-[calc(25%-33px)] top-2 bottom-0 w-[2px] bg-white/80 shadow-[0_0_15px_rgba(255,255,255,0.4)] z-0" 
          />

          <div className="space-y-12 md:space-y-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12"
            >
              <div className="pl-10 md:pl-0 md:col-span-1">
                <span className="text-xs font-bold text-muted/60 font-mono tracking-widest uppercase">2023 — Present</span>
              </div>
              
              <div className="md:col-span-3 group relative">
                <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="absolute -left-[35px] md:-left-[55px] top-1.5 w-4 h-4 rounded-full bg-background border-[3px] border-white/80 z-10 shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-transform group-hover:scale-150" 
                />
                
                <div className="glass-panel p-6 md:p-8 rounded-sm hover:border-white/20 transition-all duration-500">
                  <h3 className="item-title mb-1">B.S. in Software Engineering</h3>
                  <span className="tech-subtitle mb-6 !text-white/60">Universidad Autónoma de Querétaro</span>
                  
                  <p className="text-muted leading-relaxed mb-8 text-lg">
                    Currently in the 6th semester. Focused on building high-performance systems and fault-tolerant architectures.
                  </p>
                  
                  <div className="flex flex-wrap gap-x-12 gap-y-4 bg-white/[0.02] p-4 rounded-sm border border-white/5">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-mono text-muted/40 uppercase tracking-widest">Main_Focus</span>
                      <span className="text-white/80 font-bold uppercase tracking-tighter">Database Design</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-mono text-muted/40 uppercase tracking-widest">Current_Status</span>
                      <span className="text-accent font-bold uppercase tracking-tighter animate-pulse">Executing_Cycle_06</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;