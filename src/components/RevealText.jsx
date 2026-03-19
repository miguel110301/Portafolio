import { motion } from 'framer-motion';

/**
 * RevealText — Anima cada línea con un clip-path wipe de abajo hacia arriba.
 * 
 * Props:
 *  - children: string o JSX
 *  - delay: número (segundos, default 0)
 *  - className: clases CSS adicionales
 *  - as: tag HTML ('h1', 'h2', 'span', etc.)
 *  - once: boolean (default true, solo anima una vez)
 */
export default function RevealText({ 
  children, 
  delay = 0, 
  className = '', 
  as = 'div',
  once = true
}) {
  const MotionTag = motion[as] ?? motion.div;

  return (
    <div className="overflow-hidden">
      <MotionTag
        className={className}
        initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0, y: 12 }}
        whileInView={{ clipPath: 'inset(0 0 0% 0)', opacity: 1, y: 0 }}
        viewport={{ once }}
        transition={{
          duration: 0.65,
          delay,
          ease: [0.16, 1, 0.3, 1] // expo out — se siente muy natural
        }}
      >
        {children}
      </MotionTag>
    </div>
  );
}