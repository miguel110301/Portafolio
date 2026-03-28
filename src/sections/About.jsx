import { motion, AnimatePresence } from 'framer-motion';
import { Webhook, Database, BrainCircuit, ChevronRight, FileJson, Code2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import RevealText from '../components/RevealText';

// Tu componente intacto
function VisualWorkflowSimulation() {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
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

  const executionData = [
    '[\n  {\n    "event": "message.received",\n    "source": "WhatsApp API",\n    "media": "receipt_892.jpg"\n  }\n]',
    '[\n  {\n    "image_url": "https://api.whatsapp/media/892",\n    "timestamp": "2026-03-18T14:30:00Z",\n    "driver_id": "DRV-004"\n  }\n]',
    '[\n  {\n    "ocr_text": "ENTREGADO - FIRMA: J. PEREZ",\n    "confidence_score": 0.98,\n    "is_valid": true\n  }\n]',
    '[\n  {\n    "status": "201 Created",\n    "db_id": "row_9942",\n    "message": "Transaction committed successfully."\n  }\n]'
  ];

  return (
    <div className="w-full bg-[#121212] rounded-2xl border border-white/5 p-4 md:p-8 shadow-2xl relative overflow-hidden font-sans">
      
      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-8">
          {nodes.map((node, i) => {
            const isActive = activeNode === node.id;
            
            return (
              <div key={node.id} className="flex items-center gap-3 md:gap-4">
                <div 
                  className={`relative w-24 h-24 md:w-28 md:h-24 rounded-xl border bg-[#0a0a0a] p-3 flex flex-col items-center justify-center transition-all duration-500 ${
                    isActive ? `${node.border} shadow-[0_0_15px_rgba(255,255,255,0.1)] scale-105` : 'border-white/5 opacity-50'
                  }`}
                >
                  <node.icon className={`mb-2 transition-colors duration-500 ${isActive ? node.color : 'text-white/20'}`} size={24} />
                  <span className="text-[11px] md:text-xs font-bold text-white/90">{node.title}</span>
                  <span className="text-[9px] md:text-[10px] text-muted">{node.desc}</span>

                  {isActive && (
                    <motion.div
                      layoutId="payload-particle"
                      className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] z-20"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <Code2 size={12} className="text-background" />
                    </motion.div>
                  )}
                </div>

                {i < nodes.length - 1 && (
                  <ChevronRight size={20} className={`transition-colors duration-500 ${activeNode > i ? 'text-white/60' : 'text-white/10'}`} />
                )}
              </div>
            );
          })}
        </div>

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
          
          <div>
            <RevealText as="span" className="protocol-label" delay={0}>
              Identity_Module
            </RevealText>
            <RevealText as="h2" className="section-title mb-6" delay={0.1}>
              Building the engine <br/>behind the interface.
            </RevealText>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4 text-muted text-lg leading-relaxed"
            >
              <p>
                I am a <strong className="text-white">Backend Developer</strong> and <strong className="text-white">Automation Engineer</strong>. I build the underlying architecture that makes applications and businesses run flawlessly at peak capacity. I specialize in designing advanced event-driven <strong className="text-white">workflows</strong> with <strong className="text-white">n8n</strong>, orchestrating complex <strong className="text-white">APIs</strong>, and managing <strong className="text-white">VPS</strong> infrastructure.
              </p>
              <p>
                My core mission is connecting isolated systems so data flows <strong className="text-white">automatically</strong>, <strong className="text-white">securely</strong>, and with absolute <strong className="text-white">precision</strong>.
              </p>
              <p>
                While my technical foundation lies in backend logic and process orchestration, I also design and implement <strong className="text-white">solutions</strong> on the frontend and in native mobile environments. This allows me to deliver complete, <strong className="text-white">end-to-end</strong> applications where robust server-side power translates into <strong className="text-white">clean</strong>, seamless user experiences.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full"
          >
            <h3 className="item-title mb-4 px-2">Workflow Execution Engine</h3>
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