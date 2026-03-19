import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import RevealText from '../components/RevealText';

function Experience() {
  const containerRef = useRef(null);
  
  // Magia de Framer Motion: Rastrear el scroll dentro de esta sección
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Suavizamos el progreso para que la línea se dibuje como si fuera líquida
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const experiences = [
    {
      year: "2025 — Present",
      role: "Backend & Automation Engineer",
      company: "Logistics Systems (Remote)",
      description: "Architect of event-driven automation systems. Integration of n8n workflows with Django APIs and WhatsApp Business API for logistics optimization.",
      tech: ["Python", "Django", "n8n", "WhatsApp API"]
    },
    {
      year: "2023 — Present",
      role: "Freelance Software Engineer",
      company: "Remote",
      description: "Design and deployment of backend microservices and REST APIs. Infrastructure management in Linux environments with Nginx and Gunicorn.",
      tech: ["REST APIs", "Linux", "Docker", "Gunicorn"]
    }
  ];

  return (
    <section id="experience" className="py-32 relative bg-[#050505]">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="mb-20">
          <RevealText as="span" className="protocol-label" delay={0}>
            Trajectory_Log
          </RevealText>
          <RevealText as="h2" className="section-title" delay={0.12}>
            Experience.
          </RevealText>
        </div>

        <div className="relative" ref={containerRef}>
          {/* LÍNEA DE FONDO (Gris/Apagada) */}
          <div className="absolute left-[11px] md:left-[calc(25%-33px)] top-2 bottom-0 w-[2px] bg-white/5" />
          
          {/* LÍNEA ANIMADA (Azul/Accent) QUE CRECE CON EL SCROLL */}
          <motion.div 
            style={{ scaleY, originY: 0 }} 
            className="absolute left-[11px] md:left-[calc(25%-33px)] top-2 bottom-0 w-[2px] bg-accent shadow-[0_0_15px_rgba(56,189,248,0.6)] z-0" 
          />

          <div className="space-y-24">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12"
              >
                <div className="pl-10 md:pl-0 md:col-span-1">
                  <span className="text-xs font-bold text-muted/60 font-mono tracking-widest uppercase">{exp.year}</span>
                </div>
                
                <div className="md:col-span-3 group relative">
                  {/* NODO ANIMADO */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="absolute -left-[35px] md:-left-[55px] top-1.5 w-4 h-4 rounded-full bg-background border-[3px] border-accent z-10 shadow-[0_0_10px_rgba(56,189,248,0.5)] transition-transform group-hover:scale-150" 
                  />
                  
                  <div className="glass-panel p-6 md:p-8 rounded-sm hover:border-accent/30 transition-colors duration-500 hover:bg-white/[0.02]">
                    <h3 className="item-title mb-1">{exp.role}</h3>
                    <span className="tech-subtitle mb-6">{exp.company}</span>
                    <p className="text-muted text-lg leading-relaxed mb-8 max-w-2xl">{exp.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech, i) => (
                        <span key={i} className="text-[10px] font-bold text-white/50 border border-white/10 px-3 py-1 rounded-sm uppercase tracking-tighter bg-white/[0.02] hover:text-accent hover:border-accent/50 cursor-default transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;