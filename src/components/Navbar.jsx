import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, ChevronRight, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Terminal from './Terminal';

function Navbar() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Career', href: '/#experience' },
    { name: 'Engineered', href: '/#projects' },
    { name: 'About', href: '/#about' }
  ];

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      >
        <div className={`mx-auto transition-all duration-500 ${scrolled ? 'max-w-4xl mt-4 px-4' : 'max-w-7xl mt-0 px-0'}`}>
          <div className={`px-6 md:px-8 h-14 flex items-center justify-between transition-all duration-300 ${
            scrolled 
              ? 'bg-black/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl' 
              : 'bg-transparent border-b border-white/5 rounded-none'
          }`}>
            
            {/* Logo */}
            <a href="/#hero" className="flex flex-col group">
              <span className="text-white font-black tracking-tighter text-lg md:text-xl leading-none uppercase">
                Miguel Moreno
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted hover:text-accent transition-colors">
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button onClick={() => setIsTerminalOpen(true)} className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-muted hover:text-accent transition-colors">
                <TerminalIcon size={14} />
                <span className="opacity-50">terminal</span>
              </button>

              <a href="/#contact" className="group hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white border-b-2 border-accent pb-0.5 hover:text-accent transition-all">
                Inquiry <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Botón Menú Móvil */}
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-white p-1">
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Menú Móvil Desplegable */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0a0a0a] border-b border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-6">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs font-bold uppercase tracking-[0.2em] text-muted"
                  >
                    {link.name}
                  </a>
                ))}
                <a href="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-black uppercase text-accent">Inquiry</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
    </>
  );
}

export default Navbar;