import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ScrollExpandMedia = ({
  mediaType = 'image',
  mediaSrc,
  bgImageSrc,
  title,
  scrollToExpand = 'Scroll to expand',
  textBlend = false,
  onExpanded,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Lenis fix — pause while we control scroll, resume when done
  useEffect(() => {
    window.lenis?.stop();
    return () => {
      if (mediaFullyExpanded) window.lenis?.start();
    };
  }, []);

  useEffect(() => {
    if (mediaFullyExpanded) {
      window.lenis?.start();
      onExpanded?.();
    }
  }, [mediaFullyExpanded]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      if (mediaFullyExpanded) return;
      e.preventDefault();
      const delta = e.deltaY * 0.0009;
      setScrollProgress(prev => {
        const next = Math.min(Math.max(prev + delta, 0), 1);
        if (next >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (next < 0.75) {
          setShowContent(false);
        }
        return next;
      });
    };

    const handleTouchStart = (e) => setTouchStartY(e.touches[0].clientY);

    const handleTouchMove = (e) => {
      if (mediaFullyExpanded) return;
      e.preventDefault();
      const delta = (touchStartY - e.touches[0].clientY) * 0.005;
      setScrollProgress(prev => {
        const next = Math.min(Math.max(prev + delta, 0), 1);
        if (next >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (next < 0.75) {
          setShowContent(false);
        }
        return next;
      });
      setTouchStartY(e.touches[0].clientY);
    };

    const handleScroll = () => {
      if (!mediaFullyExpanded) window.scrollTo(0, 0);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mediaFullyExpanded, touchStartY]);

  const mediaWidth  = 300 + scrollProgress * (isMobile ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobile ? 200 : 400);
  const textShift   = scrollProgress * (isMobile ? 180 : 150);

  const firstWord = title?.split(' ')[0] ?? '';
  const restTitle = title?.split(' ').slice(1).join(' ') ?? '';

  return (
    <div className="overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">

          {/* Background image — fades as scroll progresses */}
          <motion.div
            className="absolute inset-0 z-0 h-full"
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <img
              src={bgImageSrc}
              alt="Background"
              className="w-screen h-screen object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">

              {/* Expanding media */}
              <div
                className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0 0 80px rgba(0,0,0,0.6)',
                  transition: 'none',
                }}
              >
                <img
                  src={mediaSrc}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-black/40 rounded-2xl"
                  animate={{ opacity: 0.7 - scrollProgress * 0.5 }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* Sub-labels */}
              <div className="flex flex-col items-center text-center relative z-10 mt-4" style={{ transition: 'none' }}>
                <p
                  className="text-xs font-mono text-white/40 uppercase tracking-[0.3em] mb-1"
                  style={{ transform: `translateX(-${textShift}vw)` }}
                >
                  {scrollToExpand}
                </p>
              </div>

              {/* Main title */}
              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 flex-col ${textBlend ? 'mix-blend-difference' : ''}`}
                style={{ transition: 'none' }}
              >
                <h2
                  className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter"
                  style={{ transform: `translateX(-${textShift}vw)` }}
                >
                  {firstWord}
                </h2>
                <h2
                  className="text-5xl md:text-7xl font-black text-white/60 uppercase tracking-tighter"
                  style={{ transform: `translateX(${textShift}vw)` }}
                >
                  {restTitle}
                </h2>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
