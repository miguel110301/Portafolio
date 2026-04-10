import { motion, AnimatePresence } from 'framer-motion';
import { Webhook, Database, BrainCircuit, ChevronRight, FileJson, Code2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import RevealText from '../components/RevealText';
import { useLanguage } from '../i18n';

const ABOUT_COPY = {
  es: {
    protocol: 'Modulo_Identidad',
    titleLineOne: 'Construyendo el motor',
    titleLineTwo: 'detras de la interfaz.',
    paragraphs: [
      'Soy Backend Developer y Automation Engineer. Construyo la arquitectura subyacente que permite que aplicaciones y negocios operen con estabilidad y a plena capacidad. Me especializo en disenar flujos avanzados orientados a eventos con n8n, orquestar APIs complejas y administrar infraestructura VPS.',
      'Mi mision principal es conectar sistemas aislados para que los datos fluyan de forma automatica, segura y con precision absoluta.',
      'Aunque mi base tecnica esta en la logica backend y la orquestacion de procesos, tambien diseno e implemento soluciones en frontend y entornos moviles nativos. Eso me permite entregar aplicaciones completas end-to-end donde la potencia del servidor se traduce en experiencias limpias y fluidas.',
    ],
    visualTitle: 'Motor de ejecucion del flujo',
    visualDescription: 'Visualizacion de como orquesto datos: un evento dispara el flujo, el payload se formatea, se analiza mediante APIs externas y se persiste. Observa como muta la informacion en tiempo real.',
    payloadTitle: 'Payload En Vivo',
    payloadCounter: 'Elemento 1 de 1',
    nodes: [
      { id: 0, title: 'Webhook', desc: 'Capturar evento', icon: Webhook, color: 'text-purple-400', border: 'border-purple-500' },
      { id: 1, title: 'Code', desc: 'Formatear JSON', icon: FileJson, color: 'text-blue-400', border: 'border-blue-500' },
      { id: 2, title: 'AI Vision', desc: 'Extraer datos', icon: BrainCircuit, color: 'text-green-400', border: 'border-green-500' },
      { id: 3, title: 'Postgres', desc: 'Guardar fila', icon: Database, color: 'text-blue-500', border: 'border-blue-500' },
    ],
    executionData: [
      '[\n  {\n    "evento": "mensaje.recibido",\n    "origen": "API de WhatsApp",\n    "media": "ticket_892.jpg"\n  }\n]',
      '[\n  {\n    "image_url": "https://api.whatsapp/media/892",\n    "timestamp": "2026-03-18T14:30:00Z",\n    "driver_id": "DRV-004"\n  }\n]',
      '[\n  {\n    "ocr_text": "ENTREGADO - FIRMA: J. PEREZ",\n    "confidence_score": 0.98,\n    "is_valid": true\n  }\n]',
      '[\n  {\n    "status": "201 Creado",\n    "db_id": "row_9942",\n    "message": "Transaccion confirmada correctamente."\n  }\n]',
    ],
  },
  en: {
    protocol: 'Identity_Module',
    titleLineOne: 'Building the engine',
    titleLineTwo: 'behind the interface.',
    paragraphs: [
      'I am a Backend Developer and Automation Engineer. I build the underlying architecture that makes applications and businesses run flawlessly at peak capacity. I specialize in designing advanced event-driven workflows with n8n, orchestrating complex APIs, and managing VPS infrastructure.',
      'My core mission is connecting isolated systems so data flows automatically, securely, and with absolute precision.',
      'While my technical foundation lies in backend logic and process orchestration, I also design and implement solutions on the frontend and in native mobile environments. This allows me to deliver complete end-to-end applications where robust server-side power translates into clean, seamless user experiences.',
    ],
    visualTitle: 'Workflow Execution Engine',
    visualDescription: 'Visualizing how I orchestrate data: an event triggers the workflow, the payload is formatted, analyzed via external APIs, and persistently stored. Watch the data mutate in real time.',
    payloadTitle: 'Live Payload Data',
    payloadCounter: 'Item 1 of 1',
    nodes: [
      { id: 0, title: 'Webhook', desc: 'Catch Event', icon: Webhook, color: 'text-purple-400', border: 'border-purple-500' },
      { id: 1, title: 'Code', desc: 'Format JSON', icon: FileJson, color: 'text-blue-400', border: 'border-blue-500' },
      { id: 2, title: 'AI Vision', desc: 'Extract Data', icon: BrainCircuit, color: 'text-green-400', border: 'border-green-500' },
      { id: 3, title: 'Postgres', desc: 'Save Row', icon: Database, color: 'text-blue-500', border: 'border-blue-500' },
    ],
    executionData: [
      '[\n  {\n    "event": "message.received",\n    "source": "WhatsApp API",\n    "media": "receipt_892.jpg"\n  }\n]',
      '[\n  {\n    "image_url": "https://api.whatsapp/media/892",\n    "timestamp": "2026-03-18T14:30:00Z",\n    "driver_id": "DRV-004"\n  }\n]',
      '[\n  {\n    "ocr_text": "DELIVERED - SIGNATURE: J. PEREZ",\n    "confidence_score": 0.98,\n    "is_valid": true\n  }\n]',
      '[\n  {\n    "status": "201 Created",\n    "db_id": "row_9942",\n    "message": "Transaction committed successfully."\n  }\n]',
    ],
  },
};

function VisualWorkflowSimulation({ copy }) {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev >= 3 ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#121212] rounded-2xl border border-white/5 p-4 md:p-8 shadow-2xl relative overflow-hidden font-sans">
      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-8">
          {copy.nodes.map((node, i) => {
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
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                      <Code2 size={12} className="text-background" />
                    </motion.div>
                  )}
                </div>

                {i < copy.nodes.length - 1 && (
                  <ChevronRight size={20} className={`transition-colors duration-500 ${activeNode > i ? 'text-white/60' : 'text-white/10'}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="w-full bg-[#050505] border border-white/10 rounded-xl overflow-hidden shadow-inner">
          <div className="bg-[#1a1a1a] px-4 py-2 flex justify-between items-center border-b border-white/5">
            <span className="text-xs text-muted font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> {copy.payloadTitle}
            </span>
            <span className="text-[10px] text-white/30 font-mono">{copy.payloadCounter}</span>
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
                {copy.executionData[activeNode]}
              </motion.pre>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const { language } = useLanguage();
  const copy = ABOUT_COPY[language];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <RevealText as="span" className="protocol-label" delay={0}>
              {copy.protocol}
            </RevealText>
            <RevealText as="h2" className="section-title mb-6" delay={0.1}>
              {copy.titleLineOne} <br />
              {copy.titleLineTwo}
            </RevealText>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4 text-muted text-lg leading-relaxed"
            >
              {copy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full"
          >
            <h3 className="item-title mb-4 px-2">{copy.visualTitle}</h3>
            <p className="text-muted text-sm leading-relaxed mb-6 px-2">
              {copy.visualDescription}
            </p>
            <VisualWorkflowSimulation copy={copy} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
