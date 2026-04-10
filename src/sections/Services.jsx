import { motion } from 'framer-motion';
import { Zap, ShieldCheck, GitMerge, Brain } from 'lucide-react';
import RevealText from '../components/RevealText';
import { useLanguage } from '../i18n';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function Services() {
  const { language } = useLanguage();
  const copy = {
    es: {
      protocol: 'Matriz_Capacidades',
      title: 'Lo que construyo.',
      description: 'Sistemas de automatizacion con IA que sustituyen flujos manuales por completo, construidos para produccion, no para prototipos.',
      metrics: [
        { value: '8+', label: 'Sistemas en Produccion Desplegados' },
        { value: '500k+', label: 'Registros Procesados por Pipeline' },
        { value: '85%', label: 'Reduccion de Intervencion Manual' },
        { value: '4+', label: 'APIs Externas Orquestadas por Sistema' },
      ],
      capabilities: [
        {
          icon: <Brain size={24} className="text-white/60" />,
          title: 'Automatizacion con IA',
          description: 'Flujos end-to-end que combinan LLMs, Vision APIs y Whisper para procesamiento multimodal. Sistemas que no solo enrutan datos: los entienden.',
          tags: ['OpenAI', 'n8n', 'Webhooks', 'Whisper'],
        },
        {
          icon: <GitMerge size={24} className="text-white/60" />,
          title: 'Orquestacion Orientada a Eventos',
          description: 'Flujos n8n listos para produccion con ruteo inteligente, logica condicional, reintentos y fallbacks. Pensados para tolerancia a fallos, no solo para el caso ideal.',
          tags: ['n8n', 'Reintentos', 'Estado', 'Errores'],
        },
        {
          icon: <ShieldCheck size={24} className="text-white/60" />,
          title: 'Sistemas Backend y APIs',
          description: 'APIs Django con RBAC, transacciones ACID y procesamiento en segundo plano. Arquitectura orientada a confiabilidad, con proteccion ante race conditions desde el diseno.',
          tags: ['Django', 'Python', 'PostgreSQL', 'RBAC'],
        },
        {
          icon: <Zap size={24} className="text-white/60" />,
          title: 'Integracion de Sistemas',
          description: 'Conexion de CRMs, WhatsApp Business API, Telegram y plataformas de terceros en pipelines operativos unificados con manejo de errores consistente en cada frontera.',
          tags: ['WhatsApp API', 'REST', 'Webhooks', 'CRM'],
        },
      ],
    },
    en: {
      protocol: 'Capabilities_Matrix',
      title: 'What I build.',
      description: 'AI-powered automation systems that replace manual workflows entirely, built for production, not prototypes.',
      metrics: [
        { value: '8+', label: 'Production Systems Deployed' },
        { value: '500k+', label: 'Records Processed Per Pipeline' },
        { value: '85%', label: 'Reduction in Manual Intervention' },
        { value: '4+', label: 'External APIs Orchestrated Per System' },
      ],
      capabilities: [
        {
          icon: <Brain size={24} className="text-white/60" />,
          title: 'AI-Powered Automation',
          description: 'End-to-end workflows combining LLMs, Vision APIs, and Whisper for multimodal data processing. Systems that do not just route data, they understand it.',
          tags: ['OpenAI', 'n8n', 'Webhooks', 'Whisper'],
        },
        {
          icon: <GitMerge size={24} className="text-white/60" />,
          title: 'Event-Driven Orchestration',
          description: 'Production-grade n8n workflows with intelligent routing, conditional logic, retries, and fallbacks. Built for fault tolerance, not just the happy path.',
          tags: ['n8n', 'Retry Logic', 'State Management', 'Error Handling'],
        },
        {
          icon: <ShieldCheck size={24} className="text-white/60" />,
          title: 'Backend Systems & APIs',
          description: 'Django REST APIs with RBAC, ACID transactions, and background job processing. Architected for reliability, with race condition protection included by default.',
          tags: ['Django', 'Python', 'PostgreSQL', 'RBAC'],
        },
        {
          icon: <Zap size={24} className="text-white/60" />,
          title: 'Systems Integration',
          description: 'Connecting CRMs, WhatsApp Business API, Telegram, and third-party platforms into unified operational pipelines with consistent error handling across every boundary.',
          tags: ['WhatsApp API', 'REST', 'Webhooks', 'CRM'],
        },
      ],
    },
  }[language];

  return (
    <section id="services" className="py-32 relative">
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
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {copy.metrics.map((metric, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-white/15 transition-colors duration-300 group"
            >
              <div className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-2 group-hover:text-white/70 transition-colors duration-300">
                {metric.value}
              </div>
              <div className="text-[10px] font-mono text-muted uppercase tracking-widest leading-relaxed">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {copy.capabilities.map((cap, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors duration-300">
                {cap.icon}
              </div>
              <h3 className="item-title mb-3">{cap.title}</h3>
              <p className="text-muted leading-relaxed mb-6 text-sm md:text-base">{cap.description}</p>
              <div className="flex flex-wrap gap-2">
                {cap.tags.map((tag, j) => (
                  <span key={j} className="text-[10px] font-medium text-white/40 border border-white/8 px-3 py-1 rounded-full tracking-wide bg-white/[0.03]">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
