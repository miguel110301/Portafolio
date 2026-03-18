import { motion } from 'framer-motion';

function Experience() {
  const experiences = [
    {
      year: "2025 — Present",
      role: "Backend & Automation Engineer",
      company: "Logistics Systems (Remote)",
      description: "Architected event-driven automation systems integrating n8n workflows with Django APIs for logistics operations. Designed webhook-based architectures and integrated WhatsApp Business API.",
      tech: ["Python", "Django", "n8n", "WhatsApp API"]
    },
    {
      year: "Jan 2023 — Present",
      role: "Freelance Software Engineer",
      company: "Remote",
      description: "Designed and built backend systems combining Python services with automation tools. Deployed and maintained production services on Linux environments.",
      tech: ["REST APIs", "Linux", "Nginx", "Gunicorn"]
    }
  ];

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block">Career</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Professional Experience</h2>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative pl-8 md:pl-0"
            >
              <div className="md:grid md:grid-cols-4 md:gap-8 items-start">
                <div className="mb-4 md:mb-0 md:col-span-1">
                  <span className="text-sm font-medium text-muted block">{exp.year}</span>
                </div>
                <div className="md:col-span-3 glass-panel p-8 rounded-2xl relative">
                  {/* Punto de la línea de tiempo */}
                  <div className="absolute -left-10 md:-left-12 top-8 w-4 h-4 rounded-full bg-accent border-4 border-background" />
                  
                  <h3 className="text-xl font-bold text-primary mb-1">{exp.role}</h3>
                  <span className="text-accent text-sm font-medium block mb-4">{exp.company}</span>
                  <p className="text-muted leading-relaxed mb-6">{exp.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech, i) => (
                      <span key={i} className="text-xs font-medium text-primary/80 bg-white/5 px-3 py-1.5 rounded-md border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Línea conectora */}
          <div className="absolute left-[39px] md:left-[calc(25%-16px)] top-[220px] bottom-24 w-[2px] bg-white/10 -z-10" />
        </div>
      </div>
    </section>
  );
}

export default Experience;