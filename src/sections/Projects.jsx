import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import RevealText from '../components/RevealText';
import { useLanguage } from '../i18n';

const PROJECTS_COPY = {
  es: {
    protocol: 'Registro_Despliegues',
    title: 'Sistemas construidos.',
    description: 'Proyectos enfocados en resolver problemas operativos reales, mostrando pensamiento sistemico y ejecucion tecnica.',
    projects: [
      {
        title: 'LogisticsFlow AI',
        category: 'Arquitectura y Automatizacion',
        description: 'Sistema productivo orientado a eventos que procesa mas de 500 validaciones logisticas al dia. Elimino 9 horas diarias de coordinacion manual entre equipos operativos. Verificacion de evidencias con IA mediante Whisper y OpenAI Vision, orquestado por n8n con Django gestionando transacciones ACID y WhatsApp como interfaz del operador.',
        tech: ['n8n', 'Django', 'OpenAI', 'WhatsApp', 'Firebase'],
        featured: true,
        link: '/proyecto/logisticsflow',
      },
      {
        title: 'QroData',
        category: 'Ingenieria de Datos y Analitica',
        description: 'Plataforma de social listening que redujo el reporte manual de cerca de 2 horas a menos de 30 segundos por corrida. Ingiere y clasifica mas de 100,000 registros no estructurados mediante un pipeline vectorizado con Pandas y VADER NLP. Respuesta sub-segundo gracias a un esquema MySQL optimizado e inserciones masivas con SQLAlchemy y chunksize=10000.',
        tech: ['React', 'Python', 'MySQL', 'Pandas', 'NLP'],
        featured: true,
        link: '/proyecto/qrodata',
      },
      {
        title: 'Gamma Agent',
        category: 'Orquestacion con IA',
        description: 'Agente de IA totalmente asincrono con aprobacion Human-in-the-Loop. Ingiere datos crudos, genera presentaciones estructuradas via Gamma API, pausa la ejecucion para aprobacion humana por Telegram y luego reanuda para programar el envio por correo sin intervencion manual en ninguna etapa.',
        tech: ['n8n', 'Telegram API', 'Gamma API', 'OpenAI'],
        featured: true,
        link: '/proyecto/gamma',
      },
      {
        title: 'Dashboard Pro',
        category: 'Backend ERP y SaaS',
        description: 'Backend ERP en produccion con un Role-Based Access Control construido desde cero. Tres capas de permisos aisladas: almacen, ventas y direccion, con cero incidentes de acceso no autorizado en uso real. Flujos de reporte automatizados eliminan por completo la generacion manual de informes.',
        tech: ['Python', 'RBAC', 'Automation', 'SQL'],
        featured: false,
        link: '/proyecto/dashboard',
      },
      {
        title: 'Valance',
        category: 'Desarrollo Nativo iOS',
        description: 'App de finanzas personales local-first para el ecosistema Apple. Calcula liquidez real combinando cuentas de debito, deuda de tarjetas con modelado de fecha de corte y pago, y un contador de efectivo fisico. Toda la data vive en el dispositivo con CoreData y autenticacion biometrica FaceID. Cero solicitudes de red.',
        tech: ['Swift', 'CoreData', 'FaceID', 'iOS'],
        featured: false,
        link: '/proyecto/valance',
      },
    ],
  },
  en: {
    protocol: 'Deployment_Log',
    title: 'Engineered Systems.',
    description: 'Projects focused on solving real operational problems, showcasing systems thinking and technical execution.',
    projects: [
      {
        title: 'LogisticsFlow AI',
        category: 'Architecture & Automation',
        description: 'Production event-driven system processing 500+ daily logistics validations. Eliminated 9 hours per day of manual coordination across operations teams. AI-powered evidence verification via Whisper and OpenAI Vision, orchestrated by n8n with Django handling ACID transactions and WhatsApp as the operator interface.',
        tech: ['n8n', 'Django', 'OpenAI', 'WhatsApp', 'Firebase'],
        featured: true,
        link: '/proyecto/logisticsflow',
      },
      {
        title: 'QroData',
        category: 'Data Engineering & Analytics',
        description: 'Social listening platform reducing manual reporting from roughly 2 hours to under 30 seconds per campaign run. Ingests and classifies 100,000+ unstructured records via a vectorized Pandas plus VADER NLP pipeline. Sub-second query response via an optimized MySQL schema and bulk SQLAlchemy inserts with chunksize=10000.',
        tech: ['React', 'Python', 'MySQL', 'Pandas', 'NLP'],
        featured: true,
        link: '/proyecto/qrodata',
      },
      {
        title: 'Gamma Agent',
        category: 'AI Orchestration',
        description: 'Fully asynchronous AI agent with a Human-in-the-Loop approval pattern. Ingests raw data, generates structured presentations via Gamma API, pauses execution for Telegram-based human approval, then resumes to schedule deferred email delivery with zero manual intervention at any stage.',
        tech: ['n8n', 'Telegram API', 'Gamma API', 'OpenAI'],
        featured: true,
        link: '/proyecto/gamma',
      },
      {
        title: 'Dashboard Pro',
        category: 'ERP Backend & SaaS',
        description: 'Production ERP backend with a custom Role-Based Access Control system built from scratch. Three isolated permission layers: warehouse, sales, and management, with zero unauthorized access incidents in production. Automated reporting workflows eliminate manual report generation entirely.',
        tech: ['Python', 'RBAC', 'Automation', 'SQL'],
        featured: false,
        link: '/proyecto/dashboard',
      },
      {
        title: 'Valance',
        category: 'iOS Native Development',
        description: 'Local-first personal finance app for the Apple ecosystem. Tracks real liquidity by combining debit accounts, credit card debt with cut and pay date modeling, and a physical cash counter. All data lives on-device via CoreData behind FaceID biometric authentication. Zero network requests.',
        tech: ['Swift', 'CoreData', 'FaceID', 'iOS'],
        featured: false,
        link: '/proyecto/valance',
      },
    ],
  },
};

function Projects() {
  const { language } = useLanguage();
  const copy = PROJECTS_COPY[language];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="projects" className="py-32 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-20">
          <RevealText as="span" className="protocol-label" delay={0}>
            {copy.protocol}
          </RevealText>
          <RevealText as="h2" className="section-title" delay={0.12}>
            {copy.title}
          </RevealText>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-muted text-lg max-w-2xl mt-6"
          >
            {copy.description}
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {copy.projects.map((project, index) => (
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
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/3 blur-[80px] rounded-full pointer-events-none transition-opacity group-hover:bg-white/5" />
                    )}
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <span className="tech-subtitle group-hover:text-white/60 transition-colors">
                        {project.category}
                      </span>
                      <div className="text-white/20 group-hover:text-white/60 transition-colors duration-200">
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
                          className="text-[10px] font-medium text-white/40 border border-white/8 px-3 py-1 rounded-full tracking-wide bg-white/[0.03] hover:text-white/60 hover:border-white/15 transition-colors"
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
