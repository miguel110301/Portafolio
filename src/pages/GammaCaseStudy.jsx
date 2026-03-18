// src/pages/GammaCaseStudy.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Bot, Check, RefreshCw, Send, FileText } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';

function TelegramSimulator() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step === 1) setTimeout(() => setStep(2), 1500);
    if (step === 3) setTimeout(() => setStep(4), 1500);
  }, [step]);

  return (
    <div className="w-full max-w-sm mx-auto bg-[#1c1c1e] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative font-sans my-12">
      <div className="bg-[#2c2c2e] p-4 flex items-center gap-3 border-b border-white/5">
        <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-background"><Bot size={20}/></div>
        <div><h4 className="font-bold text-sm text-white">Gamma Agent</h4><p className="text-xs text-accent">bot</p></div>
      </div>
      
      <div className="p-4 space-y-4 h-[300px] overflow-y-auto flex flex-col text-sm bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-black/20">
        {step >= 1 && (
           <motion.div initial={{opacity:0, scale:0.9, y:10}} animate={{opacity:1, scale:1, y:0}} className="self-end bg-accent text-background p-3 rounded-2xl rounded-tr-sm max-w-[80%] font-medium">
             Genera la presentación del Q3
           </motion.div>
        )}
        {step >= 2 && (
           <motion.div initial={{opacity:0, scale:0.9, y:10}} animate={{opacity:1, scale:1, y:0}} className="self-start bg-[#2c2c2e] text-white p-3 rounded-2xl rounded-tl-sm max-w-[85%] flex flex-col gap-2">
             <p>¡Listo! He estructurado los datos y generado el reporte con Gamma API.</p>
             <div className="bg-[#1c1c1e] p-2 rounded flex items-center gap-2 border border-white/5 text-xs"><FileText size={16} className="text-accent"/> Reporte_Ejecutivo_Q3.pdf</div>
             <p className="text-xs text-muted font-mono mt-1">Status: WAITING_APPROVAL</p>
             <p className="text-xs text-white/80">¿Apruebas el envío a los clientes?</p>
             {step === 2 && (
               <div className="flex gap-2 mt-2">
                 <button onClick={() => setStep(3)} className="flex-1 bg-white/5 hover:bg-accent/20 border border-white/10 py-2 rounded text-accent font-medium transition-colors text-xs flex items-center justify-center gap-1"><Check size={14}/> Aprobar Envío</button>
               </div>
             )}
           </motion.div>
        )}
        {step >= 3 && (
           <motion.div initial={{opacity:0, scale:0.9, y:10}} animate={{opacity:1, scale:1, y:0}} className="self-end bg-accent text-background p-3 rounded-2xl rounded-tr-sm max-w-[80%] font-medium">
             Aprobar Envío
           </motion.div>
        )}
        {step >= 4 && (
           <motion.div initial={{opacity:0, scale:0.9, y:10}} animate={{opacity:1, scale:1, y:0}} className="self-start bg-[#2c2c2e] text-white p-3 rounded-2xl rounded-tl-sm max-w-[80%]">
             ✅ Acción confirmada. Emails programados para envío diferido.
           </motion.div>
        )}
      </div>

      {step === 0 && (
        <div className="p-4 bg-[#1c1c1e] border-t border-white/5 flex justify-center">
          <button onClick={() => setStep(1)} className="bg-accent text-background px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2">
            <Send size={16}/> Iniciar Demo Interactiva
          </button>
        </div>
      )}
       {step > 0 && step < 4 && (
         <div className="p-4 bg-[#1c1c1e] border-t border-white/5 flex justify-center text-xs text-muted font-mono animate-pulse">
           Bot is typing...
         </div>
       )}
    </div>
  )
}

export default function GammaCaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.anime) {
      window.anime({
        targets: '.animate-in',
        translateY: [40, 0],
        opacity: [0, 1],
        delay: window.anime.stagger(150),
        easing: 'easeOutExpo',
        duration: 1000
      });
    }
  }, []);

  const codeSnippet = `// State control based on memory state
if (payload.message) {
  const chatId = payload.message.chat.id.toString();
  const context = staticData[chatId];
  
  if (context && context.status === 'waiting_datetime') {
    return [{ json: { type: 'datetime', payload, context } }];
  }
  return [{ json: { type: 'message', payload } }];
}`;

  return (
    <div className="min-h-screen bg-background text-primary selection:bg-accent/30 font-sans pb-24 pt-12">
      <div className="max-w-4xl mx-auto px-6">
        <nav className="mb-16 animate-in opacity-0">
          <Link to="/#projects" className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors font-medium">
            <ArrowLeft size={18} /> Back to Portfolio
          </Link>
        </nav>

        <header className="mb-16 animate-in opacity-0">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-bold tracking-widest uppercase bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/20">Asynchronous Automation</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">Gamma Agent</h1>
          <p className="text-xl text-muted leading-relaxed max-w-2xl">
            A conversational bot that ingests raw data, orchestrates presentation creation via AI, manages human approvals (Human-in-the-loop), and schedules deferred email deliveries.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-in opacity-0">
          {[
            { label: 'Interface', value: 'Telegram Bot', icon: Bot },
            { label: 'Generation', value: 'Gamma API', icon: RefreshCw },
            { label: 'Approval', value: 'Interactive', icon: Check },
            { label: 'Execution', value: 'Scheduled', icon: Clock },
          ].map((item, i) => (
            <div key={i} className="glass-panel p-5 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
              <item.icon className="text-accent mb-3" size={20} />
              <div className="text-xs text-muted mb-1 uppercase tracking-wider">{item.label}</div>
              <div className="font-semibold">{item.value}</div>
            </div>
          ))}
        </div>

        <section className="space-y-16">
          <div className="animate-in opacity-0">
            <h2 className="text-2xl font-bold mb-4 border-b border-white/10 pb-4">01. Live Simulation: Human-in-the-Loop</h2>
            <p className="text-muted text-lg leading-relaxed mb-6">
              Instead of running fully autonomously and risking errors, the bot pauses its execution and waits for human validation. Try the interactive simulation below:
            </p>
            <TelegramSimulator />
          </div>

          <div className="animate-in opacity-0">
            <h2 className="text-2xl font-bold mb-4 border-b border-white/10 pb-4">02. State Management Architecture</h2>
            <p className="text-muted text-lg leading-relaxed mb-6">
              Maintaining conversation context across multiple messages separated by hours or days requires a rock-solid state design. Using n8n's <code>$getWorkflowStaticData</code>, I structured an in-memory persistence layer.
            </p>
            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl relative z-10">
              <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/10">
                <span className="text-xs font-mono text-muted">state_manager.js</span>
              </div>
              <div className="text-sm font-mono text-gray-300">
                <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: '1.5rem', margin: 0 }}>
                  {codeSnippet}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}