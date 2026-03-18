// src/sections/About.jsx
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

const Icons = {
  Webhook: () => (
    <div className="w-8 h-8 flex items-center justify-center bg-accent/10 border border-accent/30 rounded-lg text-accent">
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
    </div>
  ),
  Function: () => (
    <div className="w-8 h-8 flex items-center justify-center bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400">
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline><line x1="12" y1="18" x2="12" y2="6"></line></svg>
    </div>
  ),
  Switch: () => (
    <div className="w-8 h-8 flex items-center justify-center bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400">
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
    </div>
  ),
  Slack: () => (
    <div className="w-8 h-8 flex items-center justify-center bg-purple-500/10 border border-purple-500/30 rounded-lg text-purple-400">
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13.5V18l1.5-1.5H21a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5H18v-1.5a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-1.5H10.5V21l-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5v-3a1.5 1.5 0 0 1 1.5-1.5H6v1.5a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5v1.5h1.5v1.5A1.5 1.5 0 0 1 10.5 10.5h-3a1.5 1.5 0 0 1-1.5-1.5v-3a1.5 1.5 0 0 1 1.5-1.5H9v1.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 7.5v1.5a1.5 1.5 0 0 1 1.5 1.5z"></path></svg>
    </div>
  ),
  Database: () => (
    <div className="w-8 h-8 flex items-center justify-center bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
    </div>
  )
};

// Coordenadas X comprimidas para que no se corte en ningún monitor
const nodes = [
  { id: 'webhook', label: 'CRM Event', icon: Icons.Webhook, x: 35, y: 50 },
  { id: 'transform', label: 'Clean Data', icon: Icons.Function, x: 115, y: 50 },
  { id: 'switch', label: 'Is Valid?', icon: Icons.Switch, x: 195, y: 50 },
  { id: 'crm', label: 'Hubspot', icon: Icons.Slack, x: 275, y: 15 },
  { id: 'log', label: 'Log Error', icon: Icons.Database, x: 275, y: 85 },
];

const connections = [
  { from: 'webhook', to: 'transform' },
  { from: 'transform', to: 'switch' },
  { from: 'switch', to: 'crm', type: 'yes' },
  { from: 'switch', to: 'log', type: 'no' },
];

function WorkflowSimulation() {
  const controls = useAnimation();
  const [activePath, setActivePath] = useState(0); 

  const animateEvent = async (pathIndex) => {
    // Tiempos y distancias actualizadas
    await controls.start({ cx: [35, 115], cy: [50, 50], transition: { duration: 0.6, ease: "easeInOut" } });
    await new Promise(r => setTimeout(r, 200)); 
    
    await controls.start({ cx: [115, 195], cy: [50, 50], transition: { duration: 0.6, ease: "easeInOut" } });
    await new Promise(r => setTimeout(r, 400)); 

    if (pathIndex === 0) {
      await controls.start({ cx: [195, 275], cy: [50, 15], transition: { duration: 0.6, ease: "easeInOut" } });
    } else {
      await controls.start({ cx: [195, 275], cy: [50, 85], transition: { duration: 0.6, ease: "easeInOut" } });
    }

    await new Promise(r => setTimeout(r, 1000)); 
  };

  useEffect(() => {
    const loop = async () => {
      await animateEvent(activePath);
      await new Promise(r => setTimeout(r, 1000));
      setActivePath(prev => (prev === 0 ? 1 : 0));
    };
    loop();
  }, [activePath]); 

  return (
    <div className="relative w-full h-[220px] bg-black/50 rounded-xl overflow-hidden border border-white/5 p-4 shadow-inner">
      {/* ViewBox ajustado a 320 para que los elementos escalen si el contenedor es pequeño */}
      <svg width="100%" height="100%" viewBox="0 0 320 100" className="absolute top-0 left-0" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#14B8A6" />
          </marker>
        </defs>
        {connections.map((conn, idx) => {
          const fromNode = nodes.find(n => n.id === conn.from);
          const toNode = nodes.find(n => n.id === conn.to);
          return (
            <path
              key={idx}
              d={`M ${fromNode.x + 15} ${fromNode.y} L ${toNode.x - 15} ${toNode.y}`}
              stroke="#14B8A6"
              strokeWidth="1.5"
              strokeOpacity="0.3"
              fill="none"
              strokeDasharray="4 4"
              markerEnd="url(#arrow)"
            />
          );
        })}
        <motion.circle
          cx={35} cy={50} r={5} fill="#14B8A6" animate={controls} className="shadow-xl"
        />
        <motion.circle
          cx={35} cy={50} r={5} fill="none" stroke="#14B8A6" strokeWidth="1" animate={controls}
          transition={{ duration: 1.2, repeat: Infinity }}
          custom={{ r: { value: [5, 12, 5] }, opacity: { value: [1, 0, 1] } }}
        />
      </svg>

      {/* Nodos renderizados usando porcentajes relativos al ViewBox de 320px para alinearse perfectamente con el SVG */}
      {nodes.map(node => (
        <div key={node.id} style={{ left: `${(node.x / 320) * 100}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }} className="absolute z-10 flex flex-col items-center gap-1.5 text-[10px] font-mono">
          <div className="glass-panel p-2 rounded-lg border border-white/10 shadow-lg hover:border-white/30 transition-colors bg-[#0a0a0a]">
            {node.icon && <node.icon />}
          </div>
          <span className="text-white/70 bg-black/80 px-2 py-0.5 rounded backdrop-blur-sm whitespace-nowrap border border-white/5">{node.label}</span>
        </div>
      ))}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block">About Me</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Building the engine <br/>behind the interface.</h2>
            <div className="space-y-4 text-muted text-lg leading-relaxed">
              <p>
                I am a Backend Developer and Automation Engineer. I build the underlying architecture that makes applications and businesses run flawlessly at peak capacity. I specialize in designing advanced event-driven workflows with <strong>n8n</strong>, orchestrating complex APIs, and managing VPS infrastructure.
              </p>
              <p>
                My core mission is connecting isolated systems so data flows automatically, securely, and with absolute precision. 
              </p>
              <p>
                While my technical foundation lies in backend logic and process orchestration, I also design and implement solutions on the frontend and in native mobile environments. This allows me to deliver complete, end-to-end applications where robust server-side power translates into clean, seamless user experiences.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel p-6 md:p-8 rounded-2xl hover:border-white/20 transition-colors duration-300 shadow-xl w-full"
          >
            <h3 className="text-xl font-semibold text-primary mb-4">Workflow Automation Simulation</h3>
            <p className="text-muted text-sm leading-relaxed mb-6">
              A stylized demonstration of how an event-driven workflow processes data, makes a decision, and orchestrates actions between APIs. Inspired by n8n.
            </p>
            
            <WorkflowSimulation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;