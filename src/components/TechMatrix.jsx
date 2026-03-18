import { motion } from 'framer-motion';
import { Webhook, Database, Terminal, Server, Cpu, Cloud, Code, Smartphone } from 'lucide-react';

export default function TechMatrix() {
  const stack = [
    { name: 'Python', icon: Terminal, color: '#FBBF24' },
    { name: 'n8n', icon: Webhook, color: '#F97316' },
    { name: 'Django', icon: Database, color: '#22C55E' },
    { name: 'Swift', icon: Smartphone, color: '#F97316' },
    { name: 'Linux', icon: Server, color: '#E2E8F0' },
    { name: 'APIs', icon: Cloud, color: '#60A5FA' },
    { name: 'React', icon: Code, color: '#22D3EE' },
    { name: 'MySQL', icon: Database, color: '#3B82F6' },
    { name: 'VPS', icon: Cpu, color: '#A855F7' },
  ];

  // Configuración del efecto dominó (Stagger)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Tiempo entre la aparición de cada tecla
      },
    },
  };

  // Configuración del salto 3D de cada tecla
  const itemVariants = {
    hidden: { opacity: 0, z: 0 },
    visible: { 
      opacity: 1, 
      z: 20, // Posición normal elevada
      transition: { type: "spring", stiffness: 100, damping: 10 }
    },
    hover: {
      z: 40, // Salta más arriba al pasar el mouse
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center relative" style={{ perspective: '1000px' }}>
      
      {/* El tablero inclinado en 3D (Vista Isométrica) */}
      <motion.div 
        className="grid grid-cols-3 gap-4 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          transform: 'rotateX(60deg) rotateZ(-45deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        {stack.map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover="hover"
            className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl flex flex-col items-center justify-center cursor-pointer border border-white/10"
            style={{
              background: 'rgba(18, 18, 18, 0.7)',
              backdropFilter: 'blur(12px)',
              boxShadow: '-8px 8px 0px rgba(0, 0, 0, 0.6), inset 0px 1px 1px rgba(255,255,255,0.1)',
              transformStyle: 'preserve-3d',
            }}
          >
            <item.icon color={item.color} size={32} className="mb-2 drop-shadow-md" />
            <span className="text-[10px] md:text-xs font-bold tracking-wider text-white/80 uppercase">{item.name}</span>
          </motion.div>
        ))}
      </motion.div>

      <div className="absolute bottom-0 text-xs font-mono text-muted/50">
        Engineered with Framer Motion & CSS3
      </div>
    </div>
  );
}