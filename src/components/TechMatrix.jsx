// src/components/TechMatrix.jsx
import { useEffect, useState } from 'react';
import { Webhook, Database, Terminal, Server, Cpu, Cloud, Code, Smartphone } from 'lucide-react';

export default function TechMatrix() {
  const [selected, setSelected] = useState(null);

  const stack = [
    { name: 'Python', icon: Terminal, color: '#FBBF24', desc: "Architecting resilient backend logic, data pipelines, and scalable APIs." },
    { name: 'n8n', icon: Webhook, color: '#F97316', desc: "Designing complex, event-driven workflows and system orchestrations." },
    { name: 'Django', icon: Database, color: '#22C55E', desc: "Building robust, secure, and highly scalable web applications." },
    { name: 'Swift', icon: Smartphone, color: '#F97316', desc: "Crafting performant, native iOS experiences with local-first architectures." },
    { name: 'Linux', icon: Server, color: '#E2E8F0', desc: "Managing server environments, deployments, and shell scripting." },
    { name: 'APIs', icon: Cloud, color: '#60A5FA', desc: "Designing, consuming, and securing RESTful architectures." },
    { name: 'React', icon: Code, color: '#22D3EE', desc: "Developing interactive, state-driven frontends with modern hooks." },
    { name: 'MySQL', icon: Database, color: '#3B82F6', desc: "Structuring relational databases for high-concurrency environments." },
    { name: 'VPS', icon: Cpu, color: '#A855F7', desc: "Configuring, deploying, and maintaining private server infrastructure." },
  ];

  useEffect(() => {
    if (window.anime) {
      window.anime({
        targets: '.tech-tile',
        translateZ: [0, 20],
        opacity: [0, 1],
        delay: window.anime.stagger(100, { grid: [3, 3], from: 'center' }),
        easing: 'spring(1, 80, 10, 0)'
      });
    }
  }, []);

  const handleMouseEnter = (e, itemName) => {
    if (window.anime && selected?.name !== itemName) {
      window.anime({ targets: e.currentTarget, translateZ: 40, duration: 200, easing: 'easeOutQuad' });
    }
  };

  const handleMouseLeave = (e, itemName) => {
    if (window.anime && selected?.name !== itemName) {
      window.anime({ targets: e.currentTarget, translateZ: 20, duration: 300, easing: 'easeOutQuad' });
    }
  };

  const handleClick = (e, item) => {
    setSelected(item);
    if (window.anime) {
      // Bajamos todas
      window.anime({ targets: '.tech-tile', translateZ: 20, duration: 300, easing: 'easeOutQuad' });
      // Levantamos la seleccionada
      window.anime({ targets: e.currentTarget, translateZ: 50, duration: 400, easing: 'easeOutElastic' });
    }
  };

  return (
    <div className="w-full h-[450px] md:h-[550px] flex flex-col items-center justify-center relative" style={{ perspective: '1000px' }}>
      
      <div 
        className="grid grid-cols-3 gap-4 md:gap-6 mb-8"
        style={{ transform: 'rotateX(60deg) rotateZ(-45deg)', transformStyle: 'preserve-3d' }}
      >
        {stack.map((item, i) => (
          <div
            key={i}
            onClick={(e) => handleClick(e, item)}
            onMouseEnter={(e) => handleMouseEnter(e, item.name)}
            onMouseLeave={(e) => handleMouseLeave(e, item.name)}
            className="tech-tile relative w-20 h-20 md:w-24 md:h-24 rounded-2xl flex flex-col items-center justify-center cursor-pointer border"
            style={{
              background: selected?.name === item.name ? 'rgba(56, 189, 248, 0.15)' : 'rgba(18, 18, 18, 0.7)',
              borderColor: selected?.name === item.name ? 'rgba(56, 189, 248, 0.5)' : 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(12px)',
              boxShadow: selected?.name === item.name 
                ? '-10px 10px 0px rgba(56, 189, 248, 0.2), inset 0px 1px 1px rgba(255,255,255,0.2)' 
                : '-8px 8px 0px rgba(0, 0, 0, 0.6), inset 0px 1px 1px rgba(255,255,255,0.1)',
              transformStyle: 'preserve-3d',
              opacity: 0,
              transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s'
            }}
          >
            <item.icon color={item.color} size={32} className="mb-2 drop-shadow-md" />
            <span className="text-[10px] md:text-xs font-bold tracking-wider text-white/80 uppercase">{item.name}</span>
          </div>
        ))}
      </div>

      {/* Caja de descripción de la skill */}
      <div className="h-16 w-full max-w-sm px-6 text-center z-10">
        {selected ? (
          <p className="text-accent text-sm md:text-base font-medium animate-in fade-in zoom-in duration-300">
            <strong className="text-white mr-2">{selected.name}:</strong>
            <span className="text-muted/90">{selected.desc}</span>
          </p>
        ) : (
          <p className="text-muted/40 text-sm font-mono animate-pulse">
            Click a module to view capabilities
          </p>
        )}
      </div>
    </div>
  );
}