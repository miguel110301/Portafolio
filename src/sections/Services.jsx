import { motion } from 'framer-motion';
import { GitMerge, Terminal, Smartphone, Globe } from 'lucide-react';
// 1. Importamos la librería aquí también
import Tilt from 'react-parallax-tilt';

function Services() {
  const services = [
    {
      icon: <GitMerge size={24} className="text-accent" />,
      title: "Advanced Automation",
      description: "n8n workflows with intelligent routing, webhooks, retries, and real-time operational state management."
    },
    {
      icon: <Terminal size={24} className="text-accent" />,
      title: "Backend Systems",
      description: "Development of robust APIs and business logic using Python and Django for production operations."
    },
    {
      icon: <Smartphone size={24} className="text-accent" />,
      title: "iOS Development",
      description: "Creation of native applications using Swift, focused on performance, scalability, and smooth user experiences."
    },
    {
      icon: <Globe size={24} className="text-accent" />,
      title: "Web Applications",
      description: "Dynamic and modern interfaces built with React and Vite, perfectly integrated with backend architectures."
    }
  ];

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block">Skills</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">What I build</h2>
          <p className="text-muted text-lg max-w-2xl">
            Systems designed to automate operations, connect platforms, and build high-level digital products.
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
            >
              {/* 2. Envolvemos la tarjeta en Tilt con una inclinación muy sutil */}
              <Tilt 
                tiltMaxAngleX={3} 
                tiltMaxAngleY={3} 
                perspective={1000} 
                scale={1.01} 
                transitionSpeed={2000}
                className="h-full"
              >
                <div className="glass-panel p-8 rounded-2xl hover:bg-white/[0.04] transition-colors duration-300 h-full shadow-lg border border-white/5 hover:border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-3">{service.title}</h3>
                  <p className="text-muted leading-relaxed">{service.description}</p>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;