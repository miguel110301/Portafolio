import { motion } from 'framer-motion';

function Experience() {
  const experiences = [
    {
      year: "2025 — Present",
      role: "Backend & Automation Engineer",
      company: "Logistics Systems (Remote)",
      description: "Arquitecto de sistemas de automatización orientados a eventos. Integración de flujos de n8n con APIs de Django y WhatsApp Business API para optimización logística.",
      tech: ["Python", "Django", "n8n", "WhatsApp API"]
    },
    {
      year: "2023 — Present",
      role: "Freelance Software Engineer",
      company: "Remote",
      description: "Diseño y despliegue de microservicios backend y APIs REST. Gestión de infraestructura en entornos Linux con Nginx y Gunicorn.",
      tech: ["REST APIs", "Linux", "Docker", "Gunicorn"]
    }
  ];

  return (
    <section id="experience" className="py-32 relative bg-[#050505] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* TÍTULO DE SECCIÓN */}
        <div className="mb-20">
          <span className="text-accent font-mono text-[10px] tracking-[0.4em] uppercase block mb-4">Trajectory_Log</span>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">Experience.</h2>
        </div>

        <div className="relative">
          {/* LÍNEA VERTICAL DE TIEMPO (Estilo Industrial) */}
          <div className="absolute left-[11px] md:left-[calc(25%-33px)] top-2 bottom-0 w-[1px] bg-white/10" />

          <div className="space-y-24">
            {/* --- BLOQUE: EXPERIENCIA PROFESIONAL --- */}
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12"
              >
                <div className="pl-10 md:pl-0 md:col-span-1">
                  <span className="text-xs font-bold text-muted/60 font-mono tracking-widest uppercase">{exp.year}</span>
                </div>
                
                <div className="md:col-span-3 group relative">
                  {/* EL NODO (Punto de la línea de tiempo) */}
                  <div className="absolute -left-[34px] md:-left-[54px] top-1.5 w-3 h-3 rounded-full bg-accent border-[3px] border-[#050505] z-10 transition-transform group-hover:scale-125" />
                  
                  <h3 className="text-2xl font-bold text-white mb-1 uppercase tracking-tight">{exp.role}</h3>
                  <span className="text-accent text-[11px] font-mono font-bold tracking-widest uppercase block mb-6">{exp.company}</span>
                  <p className="text-muted text-lg leading-relaxed mb-8 max-w-2xl">{exp.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech, i) => (
                      <span key={i} className="text-[10px] font-bold text-white/50 border border-white/10 px-3 py-1 rounded-sm uppercase tracking-tighter bg-white/[0.02]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* --- BLOQUE: EDUCACIÓN (IDÉNTICO A EXPERIENCIA) --- */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12"
            >
              <div className="pl-10 md:pl-0 md:col-span-1">
                <span className="text-xs font-bold text-muted/60 font-mono tracking-widest uppercase">2023 — Present</span>
              </div>
              
              <div className="md:col-span-3 group relative">
                <div className="absolute -left-[34px] md:-left-[54px] top-1.5 w-3 h-3 rounded-full bg-white/20 border-[3px] border-[#050505] z-10" />
                
                <h3 className="text-2xl font-bold text-white mb-1 uppercase tracking-tight">B.S. in Software Engineering</h3>
                <span className="text-accent text-[11px] font-mono font-bold tracking-widest uppercase block mb-6">
                  Universidad Autónoma de Querétaro [cite: 209, 257]
                </span>
                
                <div className="bg-white/[0.03] border border-white/5 p-6 rounded-sm">
                  <p className="text-muted leading-relaxed mb-6">
                    Actualmente en el 6to semestre[cite: 211, 260]. Formación sólida en estructuras de datos, arquitectura de software y desarrollo backend[cite: 212, 261].
                  </p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    <div className="text-[10px] font-mono text-muted/40 uppercase tracking-widest">
                      Focus: <span className="text-white/60 ml-2">Database Design</span>
                    </div>
                    <div className="text-[10px] font-mono text-muted/40 uppercase tracking-widest">
                      Status: <span className="text-white/60 ml-2">Executing_Academic_Cycle_06</span>
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

export default Experience;