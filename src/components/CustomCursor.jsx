import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50 });

  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  useEffect(() => {
    const interactiveEls = document.querySelectorAll('a, button, [data-cursor="pointer"]');
    const grow = () => {
      cursorRef.current?.classList.add('cursor-hover');
      ringRef.current?.classList.add('ring-hover');
    }
    const shrink = () => {
      cursorRef.current?.classList.remove('cursor-hover');
      ringRef.current?.classList.remove('ring-hover');
    }
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })
    return () => {
      interactiveEls.forEach(el => {
        el.removeEventListener('mouseenter', grow)
        el.removeEventListener('mouseleave', shrink)
      })
    }
  }, [])

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference
                   w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2
                   transition-[width,height] duration-200
                   [&.cursor-hover]:w-4 [&.cursor-hover]:h-4"
        style={{ x: dotX, y: dotY }}
      />
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none
                   w-8 h-8 rounded-full border border-white/40 -translate-x-1/2 -translate-y-1/2
                   transition-[width,height,border-color] duration-200
                   [&.ring-hover]:w-12 [&.ring-hover]:h-12 [&.ring-hover]:border-accent/70"
        style={{ x: ringX, y: ringY }}
      />
    </>
  )
}