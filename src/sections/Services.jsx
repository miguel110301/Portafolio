import { motion } from 'framer-motion';
import { GitMerge, Terminal, Smartphone, Globe } from 'lucide-react';

function Services() {
  const services = [
    {
      icon: <GitMerge size={24} className="text-accent" />,
      title: "Automatización Avanzada",
      description: "Flujos de n8n con enrutamiento inteligente, webhooks, reintentos y manejo de estados operativos en tiempo real."
    },
    {
      icon: <Terminal size={24} className="text-accent" />,
      title: "Sistemas Backend",
      description: "Desarrollo de APIs y lógica de negocio robusta con Python y Django para operaciones en producción."
    },
    {
      icon: <Smartphone size={24} className="text-accent" />,
      title: "Desarrollo iOS",
      description: "Creación de aplicaciones nativas con Swift, enfocadas en rendimiento, escalabilidad y una experiencia de usuario fluida."
    },
    {
      icon: <Globe size={24} className="text-accent" />,
      title: "Aplicaciones Web",
      description: "Interfaces dinámicas y modernas construidas con React y Vite, integradas perfectamente con arquitecturas backend."
    }
  ];

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block">Habilidades</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Lo que construyo</h2>
          <p className="text-muted text-lg max-w-2xl">
            Sistemas diseñados para automatizar operaciones, conectar plataformas y crear productos digitales de alto nivel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-panel p-8 rounded-2xl hover:bg-white/[0.03] transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">{service.title}</h3>
              <p className="text-muted leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;