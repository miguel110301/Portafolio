import { motion } from 'framer-motion';
import { Zap, ShieldCheck, GitMerge, Brain } from 'lucide-react';
import RevealText from '../components/RevealText';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

function Services() {

  const metrics = [
    { value: "8+",     label: "Production Systems Deployed" },
    { value: "500k+",  label: "Records Processed Per Pipeline" },
    { value: "85%",    label: "Reduction in Manual Intervention" },
    { value: "4+",     label: "External APIs Orchestrated Per System" },
  ];

  const capabilities = [
    {
      icon: <Brain size={24} className="text-accent" />,
      title: "AI-Powered Automation",
      description: "End-to-end workflows combining LLMs, Vision APIs, and Whisper for multimodal data processing. Systems that don't just route data — they understand it.",
      tags: ["OpenAI", "n8n", "Webhooks", "Whisper"]
    },
    {
      icon: <GitMerge size={24} className="text-accent" />,
      title: "Event-Driven Orchestration",
      description: "Production-grade n8n workflows with intelligent routing, conditional logic, retries, and fallbacks. Built for fault tolerance, not just the happy path.",
      tags: ["n8n", "Retry Logic", "State Management", "Error Handling"]
    },
    {
      icon: <ShieldCheck size={24} className="text-accent" />,
      title: "Backend Systems & APIs",
      description: "Django REST APIs with RBAC, ACID transactions, and background job processing. Architected for reliability — race condition protection included by default.",
      tags: ["Django", "Python", "PostgreSQL", "RBAC"]
    },
    {
      icon: <Zap size={24} className="text-accent" />,
      title: "Systems Integration",
      description: "Connecting CRMs, WhatsApp Business API, Telegram, and third-party platforms into unified operational pipelines with consistent error handling across every boundary.",
      tags: ["WhatsApp API", "REST", "Webhooks", "CRM"]
    }
  ];

  return (
    <section id="services" className="py-32 relative">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="mb-20">
          <RevealText as="span" className="protocol-label" delay={0}>
            Capabilities_Matrix
          </RevealText>
          <RevealText as="h2" className="section-title" delay={0.12}>
            What I build.
          </RevealText>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-muted text-lg max-w-2xl mt-6"
          >
            AI-powered automation systems that replace manual workflows entirely — 
            built for production, not prototypes.
          </motion.p>
        </div>

        {/* Métricas */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="glass-panel p-6 rounded-sm border border-white/5 hover:border-accent/30 transition-colors duration-300 group"
            >
              <div className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-2 group-hover:text-accent transition-colors duration-300">
                {metric.value}
              </div>
              <div className="text-[10px] font-mono text-muted uppercase tracking-widest leading-relaxed">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Capabilities */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="glass-panel p-8 rounded-sm border border-white/5 hover:border-white/20 hover:bg-white/[0.03] transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-sm bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                {cap.icon}
              </div>
              <h3 className="item-title mb-3">{cap.title}</h3>
              <p className="text-muted leading-relaxed mb-6 text-sm md:text-base">{cap.description}</p>
              <div className="flex flex-wrap gap-2">
                {cap.tags.map((tag, j) => (
                  <span key={j} className="text-[10px] font-bold text-accent/60 border border-accent/20 px-3 py-1 rounded-sm uppercase tracking-tighter bg-accent/5">
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