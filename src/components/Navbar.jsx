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
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className={`mx-auto transition-all duration-500 ${scrolled ? 'max-w-3xl mt-5 px-4' : 'max-w-7xl mt-0 px-0'}`}>
          <div className={`px-6 md:px-8 h-14 flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? 'bg-white/5 backdrop-blur-2xl border border-white/8 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
              : 'bg-transparent border-b border-white/5 rounded-none'
          }`}>

            {/* Logo */}
            <a
              href="/#hero"
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
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[11px] font-medium tracking-wide text-white/50 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">

              {/* Availability badge */}
              <a
                href="/#contact"
                className="hidden sm:flex items-center gap-1.5 text-[9px] font-medium tracking-wide text-green-400/70 hover:text-green-400 transition-colors border border-green-500/15 hover:border-green-500/30 rounded-full px-3 py-1 bg-green-500/5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Available
              </a>

              {/* Terminal */}
              <button
                onClick={() => setIsTerminalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-white/30 hover:text-white/60 transition-colors"
              >
                <TerminalIcon size={13} />
                <span>terminal</span>
              </button>

              {/* Inquiry CTA */}
              <a
                href="/#contact"
                className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-semibold text-black bg-white hover:bg-white/90 transition-all duration-200"
              >
                Inquiry <ChevronRight size={11} />
              </a>

              {/* Mobile menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-white/60 hover:text-white p-1 transition-colors"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mx-4 mt-2 rounded-2xl bg-black/80 backdrop-blur-2xl border border-white/8 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-5">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-medium text-white/60 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="flex items-center gap-2 text-[10px] font-medium text-green-400/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Available for freelance & remote
                </div>
                <a
                  href="/#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-semibold text-white"
                >
                  Inquiry →
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