import { motion } from 'framer-motion';

function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block">Sobre mí</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Sistemas robustos, <br/>código limpio.</h2>
            <div className="space-y-4 text-muted text-lg leading-relaxed">
              <p>
                Como estudiante de Ingeniería de Software, mi enfoque siempre ha estado en ir más allá de lo académico: me apasiona construir herramientas y arquitecturas que resuelvan cuellos de botella reales en los negocios.
              </p>
              <p>
                Ya sea orquestando flujos complejos con n8n, desarrollando el backend en Python, o creando aplicaciones nativas en iOS con Swift, mi filosofía es la misma: <strong>crear sistemas en los que las empresas puedan confiar.</strong>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel p-8 rounded-2xl"
          >
            <h3 className="text-xl font-semibold text-primary mb-6">Mi Stack</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-accent mb-3">Backend & Automatización</h4>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'Django', 'Flask', 'n8n', 'APIs REST', 'MySQL'].map(tech => (
                    <span key={tech} className="text-xs font-medium text-primary/80 bg-white/5 px-3 py-1.5 rounded-md border border-white/5">{tech}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-accent mb-3">Frontend & Móvil</h4>
                <div className="flex flex-wrap gap-2">
                  {['Swift', 'iOS', 'React', 'JavaScript', 'Tailwind'].map(tech => (
                    <span key={tech} className="text-xs font-medium text-primary/80 bg-white/5 px-3 py-1.5 rounded-md border border-white/5">{tech}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-accent mb-3">Herramientas & Cloud</h4>
                <div className="flex flex-wrap gap-2">
                  {['Git', 'AWS (Estudiando CCP)', 'Docker', 'Firebase'].map(tech => (
                    <span key={tech} className="text-xs font-medium text-primary/80 bg-white/5 px-3 py-1.5 rounded-md border border-white/5">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;