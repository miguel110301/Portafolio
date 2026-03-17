import { motion } from 'framer-motion';
import { Mail, Linkedin } from 'lucide-react';

function Contact() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Resplandor sutil de fondo para el CTA */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-10 md:p-16 rounded-[2.5rem] border border-white/10 shadow-2xl"
        >
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block">Contacto</span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">¿Listo para construir algo útil?</h2>
          <p className="text-muted text-lg mb-10 max-w-xl mx-auto">
            Si necesitas optimizar procesos, construir una API robusta o desarrollar una aplicación desde cero, hablemos.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="mailto:miguelmoreno.uaq@gmail.com" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-background px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform duration-200"
            >
              <Mail size={18} />
              Envíame un correo
            </a>
            
            <a 
              href="https://www.linkedin.com/in/miguel-angel-moreno-sanchez" 
              target="_blank" 
              rel="noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 glass-panel text-primary px-8 py-4 rounded-full font-medium hover:bg-white/5 transition-colors duration-200"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer minimalista integrado */}
      <div className="absolute bottom-8 left-0 right-0 text-center text-sm text-muted/50">
        <p>© {new Date().getFullYear()} Miguel Moreno. Todos los derechos reservados.</p>
      </div>
    </section>
  );
}

export default Contact;