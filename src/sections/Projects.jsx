import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function Projects() {
  const projects = [
    {
      title: "LogisticsFlow AI",
      category: "Arquitectura & Automatización",
      description: "Sistema logístico basado en eventos para la validación de evidencias (tickets, identificaciones) mediante IA. Orquestado con n8n, sincronización estricta a backend en Django, clasificación de audios con Whisper y notificaciones en tiempo real vía WhatsApp API.",
      tech: ["n8n", "Django", "OpenAI", "WhatsApp", "Firebase"],
      featured: true,
      link: "/proyecto/logisticsflow"
    },
    {
      title: "QroData",
      category: "Plataforma Web & Analytics",
      description: "Plataforma de monitoreo y analítica con pipelines de ingesta de datos, modelos analíticos listos para producción y flujos de reportes. Interfaz interactiva y backend optimizado.",
      tech: ["React", "Python", "MySQL", "Data Pipelines"],
      featured: true,
      link: "/proyecto/qrodata"
    },
    {
      title: "Agente Gamma",
      category: "Telegram Bot & IA",
      description: "Bot asíncrono que ingesta datos, orquesta la generación de presentaciones con Gamma API, maneja aprobaciones y programa envíos diferidos.",
      tech: ["n8n", "Telegram API", "Gamma API", "OpenAI"],
      featured: false,
      link: "/proyecto/gamma"
    },
    {
      title: "App iOS (Próximamente)",
      category: "iOS Development",
      description: "Aplicación nativa en desarrollo para el ecosistema de Apple, implementando patrones de arquitectura modernos y persistencia de datos.",
      tech: ["Swift", "iOS", "CoreData"],
      featured: false,
      link: "/"
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
              /* Quitamos el padding de aquí para dárselo al Link interno */
              className={`glass-panel rounded-2xl group transition-all duration-300 hover:border-white/20 hover:bg-white/[0.02] ${project.featured ? 'md:col-span-2' : ''}`}
            >
              {/* Toda la tarjeta ahora está envuelta en el Link */}
              <Link to={project.link} className="flex flex-col h-full p-8 relative overflow-hidden outline-none">
                
                {project.featured && (
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[80px] rounded-full pointer-events-none transition-opacity group-hover:bg-accent/10" />
                )}
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted">
                    {project.category}
                  </span>
                  <div className="text-muted group-hover:text-accent transition-colors duration-200">
                    <ArrowUpRight size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-primary mb-3 relative z-10 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                
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
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;