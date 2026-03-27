import { motion } from 'framer-motion';
import { Linkedin, Send } from 'lucide-react';
import RevealText from '../components/RevealText';
import MagneticButton from '../components/MagneticButton';
import { sileo } from 'sileo';

function Contact() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-8 md:p-16 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col md:flex-row gap-12"
        >
          <div className="flex-1">
            <RevealText as="span" className="protocol-label" delay={0.1}>
              Contact_Protocol
            </RevealText>
            <RevealText as="h2" className="section-title !text-5xl md:!text-6xl mb-8" delay={0.22}>
              Ready to build <br/>something useful?
            </RevealText>
            <p className="text-muted text-lg mb-10">
              If you need to optimize processes, build a robust API, or develop an application from scratch, let's talk. I'm currently open to new opportunities.
            </p>
            
            <MagneticButton>
              <a 
                href="https://www.linkedin.com/in/miguel-angel-moreno-sanchez" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-primary px-6 py-3 rounded-sm font-medium hover:bg-white/10 transition-colors duration-200"
              >
                <Linkedin size={18} className="text-[#0A66C2]" />
                Connect on LinkedIn
              </a>
            </MagneticButton>
          </div>

          <div className="flex-1">
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                sileo.promise(
                  fetch('https://formspree.io/f/xaqpawbn', {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: new FormData(e.target)
                  }).then(res => {
                    if (!res.ok) throw new Error('Server error');
                    return res;
                  }),
                  {
                    loading: { title: 'Sending message...' },
                    success: {
                      title: 'Message sent!',
                      description: "I'll get back to you soon.",
                    },
                    error: {
                      title: 'Something went wrong',
                      description: 'Please try again.',
                    },
                  }
                );
                e.target.reset();
              }}
            >
              <div>
                <label htmlFor="name" className="tech-subtitle !text-muted mb-2">Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-primary font-mono text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="tech-subtitle !text-muted mb-2">Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-primary font-mono text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="tech-subtitle !text-muted mb-2">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  required
                  rows="4"
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-primary font-mono text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <MagneticButton>
                <button 
                  type="submit" 
                  className="w-full flex items-center justify-center gap-2 bg-primary text-background px-8 py-3.5 rounded-sm font-bold uppercase tracking-widest text-[10px] hover:bg-white/90 transition-all duration-200 mt-4"
                >
                  <Send size={16} /> Send Message
                </button>
              </MagneticButton>
            </form>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

export default Contact;