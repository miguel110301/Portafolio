import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { useLanguage } from '../i18n';

export default function EvidenceCarousel({ images = [], labels = [], title }) {
  const { language } = useLanguage();
  const copy = {
    es: {
      defaultTitle: 'Galeria de Evidencias',
      evidence: 'Evidencia',
      previous: 'Anterior',
      next: 'Siguiente',
      goToSlide: 'Ir a la diapositiva',
    },
    en: {
      defaultTitle: 'Evidence Gallery',
      evidence: 'Evidence',
      previous: 'Previous',
      next: 'Next',
      goToSlide: 'Go to slide',
    },
  }[language];
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = images.length;
  const resolvedTitle = title || copy.defaultTitle;

  const go = useCallback((idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current]);

  const prev = useCallback(() => {
    const idx = (current - 1 + total) % total;
    setDirection(-1);
    setCurrent(idx);
  }, [current, total]);

  const next = useCallback(() => {
    const idx = (current + 1) % total;
    setDirection(1);
    setCurrent(idx);
  }, [current, total]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next]);

  if (!total) return null;

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Images size={16} className="text-accent" />
          <h2 className="item-title !mb-0">{resolvedTitle}</h2>
        </div>
        <span className="text-xs font-mono text-white/30 tabular-nums">
          {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      <div className="relative w-full rounded-sm overflow-hidden border border-white/10 bg-[#050505] shadow-2xl" style={{ aspectRatio: '16/9' }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={current}
            src={images[current]}
            alt={labels[current] ?? `${copy.evidence} ${current + 1}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

        {labels[current] && (
          <AnimatePresence mode="wait">
            <motion.span
              key={`label-${current}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-4 left-5 text-xs font-mono text-white/60"
            >
              {labels[current]}
            </motion.span>
          </AnimatePresence>
        )}

        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 hover:bg-black/80 transition-all backdrop-blur-sm"
              aria-label={copy.previous}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 hover:bg-black/80 transition-all backdrop-blur-sm"
              aria-label={copy.next}
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? 'w-5 h-1.5 bg-accent'
                  : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`${copy.goToSlide} ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
