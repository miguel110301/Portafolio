import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Bot, Check, RefreshCw, Send, FileText, Server, TerminalSquare, Activity } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from 'framer-motion';
import EvidenceCarousel from '../components/EvidenceCarousel';

function AsynchronousSimulation() {
  const [step, setStep] = useState(0);
  const [serverState, setServerState] = useState('{\n  "sessions": 0,\n  "active_contexts": {}\n}');

  const runDemo = async () => {
    if (step > 0 && step < 5) return;
    
    // Step 1: User initiates
    setStep(1);
    setServerState('{\n  "sessions": 1,\n  "active_contexts": {\n    "chat_8821": {\n      "status": "processing_data",\n      "timestamp": "14:02:11"\n    }\n  }\n}');
    
    await new Promise(r => setTimeout(r, 2000));
    
    // Step 2: Bot replies and waits for approval
    setStep(2);
    setServerState('{\n  "sessions": 1,\n  "active_contexts": {\n    "chat_8821": {\n      "status": "WAITING_APPROVAL",\n      "document": "Reporte_Q3.pdf",\n      "expires_in": "24h"\n    }\n  }\n}');
    
    // Step 3 is triggered manually by user clicking the button
  };

  const handleApproval = async () => {
    setStep(3);
    setServerState('{\n  "sessions": 1,\n  "active_contexts": {\n    "chat_8821": {\n      "status": "approval_received",\n      "action": "scheduling_emails"\n    }\n  }\n}');
    
    await new Promise(r => setTimeout(r, 1500));
    
    setStep(4);
    setServerState('{\n  "sessions": 1,\n  "active_contexts": {},\n  "scheduled_jobs": 1,\n  "next_execution": "2026-03-19T08:00:00Z"\n}');
    
    await new Promise(r => setTimeout(r, 2000));
    setStep(5); // Ready to restart
  };

  return (
    <div className="w-full bg-[#0a0a0a] rounded-sm border border-white/10 shadow-2xl p-4 md:p-6 font-sans my-12 overflow-hidden relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* PANEL IZQUIERDO: Interfaz de Usuario (Telegram) */}
        <div className="bg-[#1c1c1e] rounded-sm overflow-hidden border border-white/10 shadow-lg flex flex-col h-[360px] md:h-[400px]">
          <div className="bg-[#2c2c2e] p-3 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-background"><Bot size={16}/></div>
              <div><h4 className="font-bold text-xs text-white uppercase tracking-wider">Gamma Agent</h4><p className="text-[9px] text-accent font-mono">online</p></div>
            </div>
            {step > 0 && step < 5 && <div className="text-[9px] text-muted font-mono animate-pulse flex items-center gap-1"><Activity size={10}/> sync</div>}
          </div>
          
          <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-4 text-xs bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-black/20">
            <AnimatePresence>
              {step >= 1 && (
                <motion.div initial={{opacity:0, scale:0.9, y:10}} animate={{opacity:1, scale:1, y:0}} className="self-end bg-accent text-background p-2.5 rounded-xl rounded-tr-sm max-w-[80%] font-medium shadow-sm">
                  Genera la presentación del Q3 con los datos de ventas.
                </motion.div>
              )}
              {step >= 2 && (
                <motion.div initial={{opacity:0, scale:0.9, y:10}} animate={{opacity:1, scale:1, y:0}} transition={{type: "spring", bounce: 0.4}} className="self-start bg-[#2c2c2e] text-white p-3 rounded-xl rounded-tl-sm max-w-[85%] flex flex-col gap-3 shadow-md">
                  <p>¡Listo! He estructurado los datos y generado el reporte con Gamma API.</p>
                  <div className="bg-[#1c1c1e] p-2 rounded-sm flex items-center gap-2 border border-white/5"><FileText size={14} className="text-accent"/> <span className="font-mono text-[10px]">Reporte_Ejecutivo_Q3.pdf</span></div>
                  <div className="border-t border-white/10 pt-2">
                    <p className="text-[10px] text-white/80 mb-2">¿Apruebas el envío programado a los clientes?</p>
                    {step === 2 ? (
                      <button onClick={handleApproval} className="w-full bg-white/5 hover:bg-accent/20 hover:text-accent hover:border-accent/50 border border-white/10 py-1.5 rounded-sm text-white font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-[9px]">
                        <Check size={12}/> Confirmar & Programar
                      </button>
                    ) : (
                      <div className="w-full bg-accent/10 border border-accent/20 py-1.5 rounded-sm text-accent font-bold flex items-center justify-center gap-2 uppercase tracking-wider text-[9px]">
                        <Check size={12}/> Aprobado
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
              {step >= 4 && (
                <motion.div initial={{opacity:0, scale:0.9, y:10}} animate={{opacity:1, scale:1, y:0}} className="self-start bg-[#2c2c2e] text-white p-3 rounded-xl rounded-tl-sm max-w-[80%] shadow-md">
                  ✅ Flujo completado. Correos programados asíncronamente en el servidor.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-3 bg-[#1c1c1e] border-t border-white/5 flex justify-center">
            {step === 0 || step === 5 ? (
              <button onClick={runDemo} className="w-full bg-accent text-background py-2 rounded-sm font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2">
                <Send size={14}/> {step === 5 ? "Restart Workflow" : "Trigger Interaction"}
              </button>
            ) : (
              <div className="text-[10px] font-mono text-muted animate-pulse py-1">Process running in background...</div>
            )}
          </div>
        </div>

        {/* PANEL DERECHO: Server State Manager */}
        <div className="hidden md:flex bg-[#121212] rounded-sm border border-white/10 overflow-hidden flex-col h-[400px] shadow-lg relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="bg-white/5 p-3 flex items-center gap-3 border-b border-white/5 relative z-10">
            <div className="w-8 h-8 bg-purple-500/20 rounded-sm border border-purple-500/30 flex items-center justify-center text-purple-400"><Server size={16}/></div>
            <div><h4 className="font-bold text-xs text-white uppercase tracking-wider">In-Memory State</h4></div>
          </div>
          
          <div className="p-4 flex-1 flex flex-col relative z-10">
            <p className="text-muted text-[10px] mb-4 leading-relaxed">
              To pause workflows and wait for human input without timing out, n8n relies on static data persistence. Watch the state update:
            </p>
            
            <div className="flex-1 bg-[#050505] border border-white/10 rounded-sm flex flex-col shadow-inner overflow-hidden">
              <div className="bg-[#111] px-3 py-1.5 border-b border-white/5 flex items-center gap-2">
                <TerminalSquare size={12} className="text-purple-400" />
                <span className="text-[9px] font-mono text-muted uppercase tracking-widest">state_manager.json</span>
              </div>
              <div className="p-4 flex-1 overflow-auto">
                <AnimatePresence mode="wait">
                  <motion.pre 
                    key={step}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[10px] md:text-xs font-mono text-purple-300"
                  >
                    {serverState}
                  </motion.pre>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const GAMMA_IMAGES = ['/proyectos/gamma/1.png'];

export default function GammaCaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const codeSnippet = `// State control based on memory state
if (payload.message) {
  const chatId = payload.message.chat.id.toString();
  const context = staticData[chatId];
  
  // Intercept the flow if we are waiting for human approval
  if (context && context.status === 'WAITING_APPROVAL') {
    return [{ json: { type: 'resume_workflow', payload, context } }];
  }
  
  // Otherwise, start a new generation process
  return [{ json: { type: 'new_generation', payload } }];
}`;

  return (
    <div className="min-h-screen bg-background text-primary selection:bg-accent/30 font-sans pb-24 pt-12 relative overflow-hidden">
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        <nav className="mb-16">
          <Link to="/#projects" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted hover:text-accent transition-colors">
            <ArrowLeft size={14} /> System_Return
          </Link>
        </nav>

        <header className="mb-16">
          <div className="mb-6">
            <span className="protocol-label">Asynchronous_Automation</span>
          </div>
          <h1 className="section-title mb-6">Gamma Agent.</h1>
          <p className="text-xl text-muted leading-relaxed max-w-3xl">
            A fully asynchronous AI agent built around a Human-in-the-Loop pattern. 
            The system ingests raw data, generates structured presentations via Gamma API, 
            pauses execution to wait for human approval using in-memory state persistence, 
            then resumes to schedule deferred email delivery — zero manual intervention at any stage.
          </p>
        </header>

        <div className="mb-16">
          <EvidenceCarousel images={GAMMA_IMAGES} title="Workflow Evidence" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {[
            { label: 'Interface', value: 'Telegram Bot', icon: Bot },
            { label: 'Generation', value: 'Gamma API', icon: RefreshCw },
            { label: 'Approval', value: 'Interactive', icon: Check },
            { label: 'Execution', value: 'Scheduled Jobs', icon: Clock },
          ].map((item, i) => (
            <div key={i} className="glass-panel p-5 rounded-sm border border-white/5 hover:border-white/20 transition-colors bg-[#0a0a0a]">
              <item.icon className="text-accent mb-3" size={20} />
              <span className="tech-subtitle !mb-1">{item.label}</span>
              <div className="font-bold text-white uppercase tracking-tight">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="mb-24 glass-panel p-8 md:p-10 rounded-sm border border-white/5">
          <h2 className="item-title mb-2">Key Engineering Decisions</h2>
          <p className="text-muted text-sm mb-8 font-mono">Why I built it this way — and what I consciously traded off.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                decision: "In-memory state over a database",
                why: "Persisting approval state to a database would require a separate service, migrations, and connection management. n8n's $getWorkflowStaticData provides in-process persistence that survives between executions — zero infrastructure overhead for a single-tenant use case.",
                tradeoff: "Accepted: state is lost if the n8n process restarts. Acceptable given the 24h approval window and low-stakes recovery cost."
              },
              {
                decision: "Human-in-the-loop over full automation",
                why: "Fully autonomous presentation delivery risks sending incorrect or misformatted content to clients. A mandatory approval checkpoint — implemented as a Telegram interaction that resumes a paused workflow — eliminates this risk with minimal friction.",
                tradeoff: "Accepted: requires a human to be available within the approval window. By design, not a bug."
              },
              {
                decision: "Deferred scheduling over immediate send",
                why: "Sending emails immediately after approval ignores optimal delivery timing. Scheduling jobs to execute at a configured time (e.g. 8AM next business day) significantly improves open rates and gives the operator a cancellation window.",
                tradeoff: "Accepted: added complexity in job queue management. Justified by measurable delivery performance improvement."
              }
            ].map((item, i) => (
              <div key={i} className="space-y-3">
                <h3 className="text-white font-bold text-sm uppercase tracking-tight border-b border-white/10 pb-3">{item.decision}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.why}</p>
                <p className="text-accent/70 text-xs font-mono leading-relaxed border-l-2 border-accent/30 pl-3 mt-2">{item.tradeoff}</p>
              </div>
            ))}
          </div>
        </div>

        <section className="space-y-24">
          <div>
            <h2 className="item-title mb-6 border-b border-white/10 pb-4">01. Human-in-the-Loop Simulation</h2>
            <p className="text-muted text-lg leading-relaxed mb-6 max-w-3xl">
              Instead of running fully autonomously and risking errors, the workflow pauses its execution entirely. It stores its state in memory and waits for a human validation webhook to resume. <strong>Try the interactive simulation below to see how the server state changes:</strong>
            </p>
            <AsynchronousSimulation />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="item-title mb-6 border-b border-white/10 pb-4 text-accent">02. Persistence Architecture</h2>
              <p className="text-muted text-lg leading-relaxed mb-6">
                Maintaining conversation context across multiple messages separated by hours or days requires a rock-solid state design. Using n8n's <code>$getWorkflowStaticData</code>, I structured an in-memory persistence layer that survives workflow executions.
              </p>
            </div>
            
            <div className="rounded-sm overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl relative z-10">
              <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/10">
                <span className="tech-subtitle !mb-0 !tracking-widest">state_interceptor.js</span>
              </div>
              <div className="text-xs md:text-sm font-mono text-gray-300">
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