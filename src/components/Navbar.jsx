import { motion } from 'framer-motion';

function Navbar() {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0"
    >
      <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#hero" className="text-primary font-medium tracking-wide flex items-center gap-2">
          {/* Logo minimalista */}
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/5">
            <span className="text-sm font-bold text-white">M</span>
          </div>
          Miguel Moreno
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
          <a href="#projects" className="hover:text-primary transition-colors duration-200">Work</a>
          <a href="#services" className="hover:text-primary transition-colors duration-200">Services</a>
          <a href="#about" className="hover:text-primary transition-colors duration-200">About</a>
        </nav>

        <a 
          href="#contact" 
          className="text-sm font-medium text-background bg-primary px-5 py-2.5 rounded-full hover:bg-white/90 transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          Contact
        </a>
      </div>
    </motion.header>
  );
}

export default Navbar;