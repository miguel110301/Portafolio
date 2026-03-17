import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

function Projects() {
  const projects = [
    {
      title: "LogisticsFlow AI",
      category: "Arquitectura & Automatización",
      description: "Sistema logístico basado en eventos para la validación de evidencias (tickets, identificaciones) mediante IA. Orquestado con n8n, sincronización estricta a backend en Django, clasificación de audios con Whisper y notificaciones en tiempo real vía WhatsApp API.",
      tech: ["n8n", "Django", "OpenAI", "WhatsApp API", "Firebase"],
      featured: true,
      link: "#" // Aquí luego podemos poner un link a un caso de estudio (PDF o página extra)
    },
    {
      title: "QroData",
      category: "Plataforma Web",
      description: "Plataforma de monitoreo y analítica con pipelines de ingesta de datos, modelos analíticos listos para producción y flujos de reportes. Interfaz interactiva y backend optimizado.",
      tech: ["React", "Python", "MySQL", "Pipelines"],
      featured: false,
      link: "#"
    },
    {
      title: "App iOS (Próximamente)",
      category: "iOS Development",
      description: "Aplicación nativa en desarrollo para el ecosistema de Apple, implementando patrones de arquitectura modernos y persistencia de datos.",
      tech: ["Swift", "iOS", "CoreData"],
      featured: false,
      link: "#"
    }
  ];

  return (
    <section id="projects" className="py-24 relative bg-surface/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block">Portafolio</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Trabajo Destacado</h2>
          <p className="text-muted text-lg max-w-2xl">
            Proyectos enfocados en resolver problemas operativos reales, mostrando pensamiento sistémico y ejecución técnica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`glass-panel p-8 rounded-2xl group flex flex-col h-full hover:border-white/20 transition-all duration-300 ${project.featured ? 'md:col-span-2 relative overflow-hidden' : ''}`}
            >
              {/* Resplandor sutil para el proyecto destacado */}
              {project.featured && (
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[80px] rounded-full pointer-events-none" />
              )}
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted">
                  {project.category}
                </span>
                <a href={project.link} className="text-muted hover:text-accent transition-colors duration-200">
                  <ArrowUpRight size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>

              <h3 className="text-2xl font-bold text-primary mb-3 relative z-10">{project.title}</h3>
              <p className="text-muted mb-8 flex-grow relative z-10 leading-relaxed text-sm md:text-base">
                {project.description}
              </p>

              <ul className="flex flex-wrap gap-2 relative z-10">
                {project.tech.map((tech, i) => (
                  <li key={i} className="text-xs font-medium text-primary/80 bg-white/5 px-3 py-1.5 rounded-md border border-white/5">
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;