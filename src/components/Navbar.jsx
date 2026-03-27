import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, ChevronRight, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Terminal from './Terminal';
import { sileo } from 'sileo';

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
    { name: 'Career',   href: '/#experience' },
    { name: 'Projects', href: '/#projects' },
    { name: 'About',    href: '/#about' },
  ];

  return (
    <>
      <motion.header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
        <div className={`mx-auto transition-all duration-500 ${scrolled ? 'max-w-4xl mt-4 px-4' : 'max-w-7xl mt-0 px-0'}`}>
          <div className={`px-6 md:px-8 h-14 flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? 'bg-black/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl'
              : 'bg-transparent border-b border-white/5 rounded-none'
          }`}>

            {/* Logo */}
            <a href="/#hero"
                className="flex flex-col group"
                onClick={() => {
                  navigator.clipboard.writeText('miguelmoreno.uaq@gmail.com');
                  sileo.success({
                    title: 'Email copied!',
                    description: 'miguelmoreno.uaq@gmail.com',
                  });
                }}
              >
              <span className="text-white font-black tracking-tighter text-lg md:text-xl leading-none uppercase">
                Miguel Moreno
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted hover:text-accent transition-colors hover:underline underline-offset-4 decoration-accent"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">

              {/* ── AVAILABILITY BADGE ── */}
              <a
                href="/#contact"
                className="hidden sm:flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-green-400/80 hover:text-green-400 transition-colors border border-green-500/20 hover:border-green-500/40 rounded-full px-3 py-1 bg-green-500/5 hover:bg-green-500/10"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Available
              </a>

              <button
                onClick={() => setIsTerminalOpen(true)}
                className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-muted hover:text-accent transition-colors"
              >
                <TerminalIcon size={14} />
                <span className="opacity-50">terminal</span>
              </button>

              <a
                href="/#contact"
                className="group hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white border-b-2 border-accent pb-0.5 hover:text-accent transition-all"
              >
                Inquiry <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-white p-1"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
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
                {/* Availability in mobile menu */}
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Available for freelance & remote
                </div>
                <a
                  href="/#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xs font-black uppercase text-accent"
                >
                  Inquiry
                </a>
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