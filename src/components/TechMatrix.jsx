import { useEffect } from 'react';
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

  useEffect(() => {
    // Verificamos que Anime.js cargó globalmente desde el CDN
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

  const handleMouseEnter = (e) => {
    if (window.anime) {
      window.anime({
        targets: e.currentTarget,
        translateZ: 40,
        duration: 200,
        easing: 'easeOutQuad'
      });
    }
  };

  const handleMouseLeave = (e) => {
    if (window.anime) {
      window.anime({
        targets: e.currentTarget,
        translateZ: 20,
        duration: 300,
        easing: 'easeOutQuad'
      });
    }
  };

  return (
    <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center relative" style={{ perspective: '1000px' }}>
      <div 
        className="grid grid-cols-3 gap-4 md:gap-6"
        style={{ 
          transform: 'rotateX(60deg) rotateZ(-45deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        {stack.map((item, i) => (
          <div
            key={i}
            className="tech-tile relative w-20 h-20 md:w-24 md:h-24 rounded-2xl flex flex-col items-center justify-center cursor-pointer border border-white/10"
            style={{
              background: 'rgba(18, 18, 18, 0.7)',
              backdropFilter: 'blur(12px)',
              boxShadow: '-8px 8px 0px rgba(0, 0, 0, 0.6), inset 0px 1px 1px rgba(255,255,255,0.1)',
              transformStyle: 'preserve-3d',
              opacity: 0
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <item.icon color={item.color} size={32} className="mb-2 drop-shadow-md" />
            <span className="text-[10px] md:text-xs font-bold tracking-wider text-white/80 uppercase">{item.name}</span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 text-xs font-mono text-muted/50">
        Engineered with Anime.js & CSS3
      </div>
    </div>
  );
}