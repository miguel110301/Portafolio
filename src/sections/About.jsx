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
            <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block">About Me</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">I engineer systems that <br/>simply don't break.</h2>
            <div className="space-y-4 text-muted text-lg leading-relaxed">
              <p>
                My focus is simple: I go beyond writing code. I am obsessed with building architectures that obliterate real-world operational bottlenecks. If there's a manual process, I can automate it. If there's a data flow, I can secure it.
              </p>
              <p>
                Whether I'm orchestrating complex event-driven workflows with n8n, engineering resilient backends in Python, deploying directly to Linux VPS environments, or crafting native iOS apps with Swift, my philosophy remains the same: <strong>I build systems that companies can blindly rely on.</strong>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel p-8 rounded-2xl hover:border-white/20 transition-colors duration-300 shadow-xl"
          >
            <h3 className="text-xl font-semibold text-primary mb-6">My Arsenal</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-accent mb-3">Backend & Automation</h4>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'Django', 'Flask', 'n8n', 'Event-Driven', 'MySQL'].map(tech => (
                    <span key={tech} className="text-xs font-medium text-primary/80 bg-white/5 px-3 py-1.5 rounded-md border border-white/5">{tech}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-accent mb-3">Infrastructure & DevOps</h4>
                <div className="flex flex-wrap gap-2">
                  {['Linux', 'Nginx', 'Gunicorn', 'VPS Deployment', 'Git'].map(tech => (
                    <span key={tech} className="text-xs font-medium text-primary/80 bg-white/5 px-3 py-1.5 rounded-md border border-white/5">{tech}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-accent mb-3">Frontend & Mobile</h4>
                <div className="flex flex-wrap gap-2">
                  {['Swift', 'iOS Native', 'React', 'Tailwind'].map(tech => (
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