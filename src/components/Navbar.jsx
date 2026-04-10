import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, ChevronRight, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Terminal from './Terminal';
import { sileo } from 'sileo';
import { useLanguage } from '../i18n';

const NAVBAR_COPY = {
  es: {
    navLinks: [
      { name: 'Experiencia', href: '/#experience' },
      { name: 'Proyectos', href: '/#projects' },
      { name: 'Sobre mi', href: '/#about' },
    ],
    emailCopiedTitle: 'Correo copiado',
    available: 'Disponible',
    availableFull: 'Disponible para freelance y remoto',
    terminal: 'terminal',
    inquiry: 'Hablemos',
    language: 'Idioma',
  },
  en: {
    navLinks: [
      { name: 'Career', href: '/#experience' },
      { name: 'Projects', href: '/#projects' },
      { name: 'About', href: '/#about' },
    ],
    emailCopiedTitle: 'Email copied!',
    available: 'Available',
    availableFull: 'Available for freelance & remote',
    terminal: 'terminal',
    inquiry: 'Inquiry',
    language: 'Language',
  },
};

function LanguageSwitcher({ language, setLanguage }) {
  return (
    <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-sm">
      {['es', 'en'].map((option) => {
        const isActive = language === option;

        return (
          <button
            key={option}
            type="button"
            onClick={() => setLanguage(option)}
            className={`relative rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${
              isActive
                ? 'text-black'
                : 'text-white/45 hover:text-white'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="language-pill"
                className="absolute inset-0 rounded-full bg-white"
                transition={{ type: 'spring', stiffness: 420, damping: 30 }}
              />
            )}
            <span className="relative z-10">{option}</span>
          </button>
        );
      })}
    </div>
  );
}

function Navbar() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, isTransitioning } = useLanguage();
  const copy = NAVBAR_COPY[language];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className={`mx-auto transition-all duration-500 ${scrolled ? 'max-w-6xl mt-5 px-4 md:px-5' : 'max-w-7xl mt-0 px-0'}`}>
          <motion.div
            animate={{
              opacity: isTransitioning ? 0.76 : 1,
              filter: isTransitioning ? 'blur(4px)' : 'blur(0px)',
            }}
            transition={{ duration: 0.16, ease: 'easeInOut' }}
            className={`px-5 md:px-7 lg:px-8 min-h-[4.25rem] flex items-center justify-between gap-4 md:gap-6 transition-all duration-500 ${
              scrolled
                ? 'bg-white/5 backdrop-blur-2xl border border-white/8 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
                : 'bg-transparent border-b border-white/5 rounded-none'
            }`}
          >

            {/* Logo */}
            <a
              href="/#hero"
              className="flex flex-col group shrink-0 min-w-[132px]"
              onClick={() => {
                navigator.clipboard.writeText('miguelmoreno.uaq@gmail.com');
                sileo.success({
                  title: copy.emailCopiedTitle,
                  description: 'miguelmoreno.uaq@gmail.com',
                });
              }}
            >
              <span className="text-white font-black tracking-tighter text-lg md:text-xl leading-none uppercase">
                Miguel Moreno
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-5 lg:gap-7 flex-1 justify-center min-w-0">
              {copy.navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[11px] font-medium tracking-wide text-white/50 hover:text-white transition-colors duration-200 whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2.5 lg:gap-3 shrink-0">
              <div className="hidden sm:block">
                <LanguageSwitcher language={language} setLanguage={setLanguage} />
              </div>

              {/* Availability badge */}
              <a
                href="/#contact"
                className="hidden lg:flex items-center gap-1.5 text-[9px] font-medium tracking-wide text-green-400/70 hover:text-green-400 transition-colors border border-green-500/15 hover:border-green-500/30 rounded-full px-3.5 py-1.5 bg-green-500/5 whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {copy.available}
              </a>

              {/* Terminal */}
              <button
                onClick={() => setIsTerminalOpen(true)}
                className="hidden md:flex items-center gap-1.5 text-[10px] font-mono text-white/30 hover:text-white/60 transition-colors whitespace-nowrap"
              >
                <TerminalIcon size={13} />
                <span>{copy.terminal}</span>
              </button>

              {/* Inquiry CTA */}
              <a
                href="/#contact"
                className="hidden md:flex items-center gap-1.5 px-4 lg:px-5 py-2 rounded-full text-[10px] font-semibold text-black bg-white hover:bg-white/90 transition-all duration-200 whitespace-nowrap"
              >
                {copy.inquiry} <ChevronRight size={11} />
              </a>

              {/* Mobile menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-white/60 hover:text-white p-1 transition-colors"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </motion.div>
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
                {copy.navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-medium text-white/60 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/35">
                    {copy.language}
                  </span>
                  <LanguageSwitcher language={language} setLanguage={setLanguage} />
                </div>
                <div className="flex items-center gap-2 text-[10px] font-medium text-green-400/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  {copy.availableFull}
                </div>
                <a
                  href="/#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-semibold text-white"
                >
                  {copy.inquiry} →
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
