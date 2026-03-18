// src/sections/About.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { Webhook, Database, BrainCircuit, ChevronRight, FileJson, Code2 } from 'lucide-react';
import { useEffect, useState } from 'react';

function VisualWorkflowSimulation() {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    // El ciclo de vida del flujo: Avanza cada 2 segundos y se reinicia
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev >= 3 ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { id: 0, title: "Webhook", desc: "Catch Event", icon: Webhook, color: "text-purple-400", border: "border-purple-500" },
    { id: 1, title: "Code", desc: "Format JSON", icon: FileJson, color: "text-blue-400", border: "border-blue-500" },
    { id: 2, title: "AI Vision", desc: "Extract Data", icon: BrainCircuit, color: "text-green-400", border: "border-green-500" },
    { id: 3, title: "Postgres", desc: "Save Row", icon: Database, color: "text-blue-500", border: "border-blue-500" }
  ];

  // Datos simulados que cambian según el nodo activo
  const executionData = [
    '[\n  {\n    "event": "message.received",\n    "source": "WhatsApp API",\n    "media": "receipt_892.jpg"\n  }\n]',
    '[\n  {\n    "image_url": "https://api.whatsapp/media/892",\n    "timestamp": "2026-03-18T14:30:00Z",\n    "driver_id": "DRV-004"\n  }\n]',
    '[\n  {\n    "ocr_text": "ENTREGADO - FIRMA: J. PEREZ",\n    "confidence_score": 0.98,\n    "is_valid": true\n  }\n]',
    '[\n  {\n    "status": "201 Created",\n    "db_id": "row_9942",\n    "message": "Transaction committed successfully."\n  }\n]'
  ];

  return (
    <div className="w-full bg-[#121212] rounded-2xl border border-white/5 p-4 md:p-8 shadow-2xl relative overflow-hidden font-sans">
      {/* Fondo de red */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="relative z-10">
        
        {/* Nodos del Workflow */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-8">
          {nodes.map((node, i) => {
            const isActive = activeNode === node.id;
            
            return (
              <div key={node.id} className="flex items-center gap-3 md:gap-4">
                {/* Tarjeta del Nodo */}
                <div 
                  className={`relative w-24 h-24 md:w-28 md:h-24 rounded-xl border bg-[#0a0a0a] p-3 flex flex-col items-center justify-center transition-all duration-500 ${
                    isActive ? `${node.border} shadow-[0_0_15px_rgba(255,255,255,0.1)] scale-105` : 'border-white/5 opacity-50'
                  }`}
                >
                  <node.icon className={`mb-2 transition-colors duration-500 ${isActive ? node.color : 'text-white/20'}`} size={24} />
                  <span className="text-[11px] md:text-xs font-bold text-white/90">{node.title}</span>
                  <span className="text-[9px] md:text-[10px] text-muted">{node.desc}</span>

                  {/* Partícula de "Payload" que viaja animada de nodo en nodo usando layoutId */}
                  {isActive && (
                    <motion.div
                      layoutId="payload-particle"
                      className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.8)] z-20"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <Code2 size={12} className="text-background" />
                    </motion.div>
                  )}
                </div>

                {/* Flecha conectora (excepto en el último) */}
                {i < nodes.length - 1 && (
                  <ChevronRight size={20} className={`transition-colors duration-500 ${activeNode > i ? 'text-accent' : 'text-white/10'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Consola de Datos en Vivo */}
        <div className="w-full bg-[#050505] border border-white/10 rounded-xl overflow-hidden shadow-inner">
          <div className="bg-[#1a1a1a] px-4 py-2 flex justify-between items-center border-b border-white/5">
            <span className="text-xs text-muted font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live Payload Data
            </span>
            <span className="text-[10px] text-white/30 font-mono">Item 1 of 1</span>
          </div>
          <div className="p-4 h-36 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.pre
                key={activeNode}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-xs md:text-sm font-mono text-[#4ade80]"
              >
                {executionData[activeNode]}
              </motion.pre>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function About() {
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
            className="w-full"
          >
            <h3 className="text-xl font-semibold text-primary mb-4 px-2">Workflow Execution Engine</h3>
            <p className="text-muted text-sm leading-relaxed mb-6 px-2">
              Visualizing how I orchestrate data: An event triggers the workflow, the payload is formatted, analyzed via external APIs, and persistently stored. Watch the data mutate in real-time.
            </p>
            <VisualWorkflowSimulation />
          </motion.div>

        </div>
      </div>
    </section>
  );
}