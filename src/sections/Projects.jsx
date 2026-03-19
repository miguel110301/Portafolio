import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';

function Projects() {
  const projects = [
    {
      title: "LogisticsFlow AI",
      category: "Architecture & Automation",
      description: "Event-driven logistics system for evidence validation (tickets, IDs) using AI. Orchestrated with n8n, strict synchronization with Django backend, audio classification with Whisper, and real-time notifications via WhatsApp API.",
      tech: ["n8n", "Django", "OpenAI", "WhatsApp", "Firebase"],
      featured: true,
      link: "/proyecto/logisticsflow"
    },
    {
      title: "QroData",
      category: "Web Platform & Analytics",
      description: "Monitoring and analytics platform with data ingestion pipelines, production-ready analytical models, and reporting workflows. Interactive interface and optimized backend.",
      tech: ["React", "Python", "MySQL", "Data Pipelines"],
      featured: true,
      link: "/proyecto/qrodata"
    },
    {
      title: "Gamma Agent",
      category: "Telegram Bot & AI",
      description: "Asynchronous bot that ingests data, orchestrates presentation generation with Gamma API, handles human approvals, and schedules deferred email deliveries.",
      tech: ["n8n", "Telegram API", "Gamma API", "OpenAI"],
      featured: true,
      link: "/proyecto/gamma"
    },
    {
      title: "Dashboard Pro",
      category: "SaaS & Backend",
      description: "Robust backend systems for an ERP platform covering inventory and sales. Role-based access control (RBAC) implementation and automated reporting workflows designed for strategic decision-making.",
      tech: ["Python", "RBAC", "Automation", "SQL"],
      featured: true,
      link: "/proyecto/dashboard"
    }
  ];

  return (
    <section id="projects" className="py-32 relative bg-surface/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-20">
          <span className="protocol-label">Deployment_Log</span>
          <h2 className="section-title">Engineered Systems.</h2>
          <p className="text-muted text-lg max-w-2xl mt-6">
            Projects focused on solving real operational problems, showcasing systems thinking and technical execution.
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
              className={project.featured ? 'md:col-span-2' : ''}
            >
              <Tilt 
                tiltMaxAngleX={3} 
                tiltMaxAngleY={3} 
                perspective={1000} 
                scale={1.01} 
                transitionSpeed={2000}
                className="h-full"
              >
                <div className="glass-panel rounded-2xl group transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] h-full shadow-lg">
                  <Link to={project.link} className="flex flex-col h-full p-8 md:p-10 relative overflow-hidden outline-none">
                    
                    {project.featured && (
                      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[80px] rounded-full pointer-events-none transition-opacity group-hover:bg-accent/10" />
                    )}
                    
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <span className="tech-subtitle text-muted group-hover:text-accent transition-colors">
                        {project.category}
                      </span>
                      <div className="text-muted group-hover:text-accent transition-colors duration-200">
                        <ArrowUpRight size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </div>

                    <h3 className="item-title mb-4 group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted mb-8 flex-grow relative z-10 leading-relaxed text-sm md:text-base">
                      {project.description}
                    </p>

                    <ul className="flex flex-wrap gap-2 relative z-10 mt-auto pt-4">
                      {project.tech.map((tech, i) => (
                        <li key={i} className="text-[10px] font-bold text-white/50 border border-white/10 px-3 py-1 rounded-sm uppercase tracking-tighter bg-white/[0.02]">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </Link>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;