import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import RevealText from '../components/RevealText';

function Projects() {
  const projects = [
  {
    title: "LogisticsFlow AI",
    category: "Architecture & Automation",
    description: "End-to-end logistics validation system processing 500+ daily shipments. AI-powered evidence verification (images, audio) via Whisper & OpenAI Vision. Reduced manual validation time by 85% through n8n orchestration, Django backend, and real-time WhatsApp notifications.",
    tech: ["n8n", "Django", "OpenAI", "WhatsApp", "Firebase"],
    featured: true,
    link: "/proyecto/logisticsflow"
  },
  {
    title: "QroData",
    category: "Data Engineering & Analytics",
    description: "Social listening platform ingesting and classifying 100,000+ unstructured records per run. NLP sentiment pipeline (VADER) with vectorized Pandas operations for performance. Sub-second query response via optimized MySQL schema and bulk SQLAlchemy inserts.",
    tech: ["React", "Python", "MySQL", "Pandas", "NLP"],
    featured: true,
    link: "/proyecto/qrodata"
  },
  {
    title: "Gamma Agent",
    category: "AI Orchestration",
    description: "Fully asynchronous AI agent that ingests raw data, generates structured presentations via Gamma API, routes human-in-the-loop approvals through Telegram, and schedules deferred email delivery — zero manual intervention required.",
    tech: ["n8n", "Telegram API", "Gamma API", "OpenAI"],
    featured: true,
    link: "/proyecto/gamma"
  },
  {
    title: "Dashboard Pro",
    category: "ERP Backend & SaaS",
    description: "Production ERP backend handling inventory and sales operations with role-based access control (RBAC) across multiple permission layers. Automated reporting workflows deliver scheduled decision-making reports with zero manual intervention.",
    tech: ["Python", "RBAC", "Automation", "SQL"],
    featured: true,
    link: "/proyecto/dashboard"
  }
];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <section id="projects" className="py-32 relative bg-surface/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-20">
          <RevealText as="span" className="protocol-label" delay={0}>
            Deployment_Log
          </RevealText>
          <RevealText as="h2" className="section-title" delay={0.12}>
            Engineered Systems.
          </RevealText>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-muted text-lg max-w-2xl mt-6"
          >
            Projects focused on solving real operational problems, showcasing systems thinking and technical execution.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
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
                      <span className="tech-subtitle group-hover:text-accent transition-colors">
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
                        <motion.li
                          key={i}
                          whileHover={{ scale: 1.08, color: '#38bdf8', borderColor: 'rgba(56,189,248,0.4)' }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          className="text-[10px] font-bold text-white/50 border border-white/10 px-3 py-1 rounded-sm uppercase tracking-tighter bg-white/[0.02]"
                        >
                          {tech}
                        </motion.li>
                      ))}
                    </ul>
                  </Link>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;