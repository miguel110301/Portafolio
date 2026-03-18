import { motion } from 'framer-motion';
import { Linkedin, Send } from 'lucide-react';

function Contact() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Resplandor sutil de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-8 md:p-16 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col md:flex-row gap-12"
        >
          {/* Columna Izquierda: Texto */}
          <div className="flex-1">
            <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block">Contact</span>
            <h2 className="text-4xl font-bold text-primary mb-6 leading-tight">Ready to build <br/>something useful?</h2>
            <p className="text-muted text-lg mb-10">
              If you need to optimize processes, build a robust API, or develop an application from scratch, let's talk. I'm currently open to new opportunities.
            </p>
            
            <a 
              href="https://www.linkedin.com/in/miguel-angel-moreno-sanchez" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-primary px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition-colors duration-200"
            >
              <Linkedin size={18} className="text-[#0A66C2]" />
              Connect on LinkedIn
            </a>
          </div>

          {/* Columna Derecha: Formulario Real con Formspree */}
          <div className="flex-1">
            <form action="https://formspree.io/f/xaqpawbn" method="POST" className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted mb-2">Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted mb-2">Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted mb-2">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  required
                  rows="4"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2 bg-primary text-background px-8 py-3.5 rounded-xl font-medium hover:bg-white/90 transition-all duration-200 mt-2"
              >
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>

        </motion.div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center text-sm text-muted/50">
        <p>© {new Date().getFullYear()} Miguel Moreno. All rights reserved.</p>
      </div>
    </section>
  );
}

export default Contact;