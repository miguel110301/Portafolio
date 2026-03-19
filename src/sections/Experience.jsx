import { motion } from 'framer-motion';

function Experience() {
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
          <span className="protocol-label">Trajectory_Log</span>
          <h2 className="section-title">Experience.</h2>
        </div>

        <div className="relative">
          <div className="absolute left-[11px] md:left-[calc(25%-33px)] top-2 bottom-0 w-[1px] bg-white/10" />

          <div className="space-y-24">
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
                  <div className="absolute -left-[34px] md:-left-[54px] top-1.5 w-3 h-3 rounded-full bg-accent border-[3px] border-[#050505] z-10 transition-transform group-hover:scale-125" />
                  
                  <h3 className="item-title mb-1">{exp.role}</h3>
                  <span className="tech-subtitle mb-6">{exp.company}</span>
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;