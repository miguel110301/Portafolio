import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Bot, Check, X, RefreshCw, Send, FileText, Server, TerminalSquare, Activity, Zap, Mail, Calendar, AlertTriangle } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from 'framer-motion';
import EvidenceCarousel from '../components/EvidenceCarousel';

// ─── STEPS CONFIG ─────────────────────────────────────────────────────────────
const STEPS = [
  { id: 0, label: 'Idle',             color: 'text-white/30' },
  { id: 1, label: 'Parsing Input',    color: 'text-yellow-400' },
  { id: 2, label: 'AI Processing',    color: 'text-blue-400'  },
  { id: 3, label: 'Generating PDF',   color: 'text-purple-400'},
  { id: 4, label: 'Awaiting Approval',color: 'text-accent'    },
  { id: 5, label: 'Scheduling',       color: 'text-green-400' },
  { id: 6, label: 'Complete',         color: 'text-green-400' },
  { id: 7, label: 'Rejected',         color: 'text-red-400'   },
];

const STATE_BY_STEP = {
  0: `{
  "sessions": 0,
  "active_contexts": {},
  "scheduled_jobs": 0
}`,
  1: `{
  "sessions": 1,
  "active_contexts": {
    "chat_8821": {
      "status": "PARSING_INPUT",
      "email": "cfo@acme.com",
      "slides": 10,
      "timestamp": "14:02:11Z"
    }
  }
}`,
  2: `{
  "sessions": 1,
  "active_contexts": {
    "chat_8821": {
      "status": "AI_PROCESSING",
      "model": "gpt-4o",
      "tokens_used": 1842,
      "context_summary": "Q3 sales deck..."
    }
  }
}`,
  3: `{
  "sessions": 1,
  "active_contexts": {
    "chat_8821": {
      "status": "GENERATING_PRESENTATION",
      "gamma_job_id": "gen_9f2a1c",
      "slides": 10,
      "poll_attempts": 3
    }
  }
}`,
  4: `{
  "sessions": 1,
  "active_contexts": {
    "chat_8821": {
      "status": "WAITING_APPROVAL",
      "document": "Q3_Executive_Report.pdf",
      "gamma_url": "https://gamma.app/...",
      "recipient": "cfo@acme.com",
      "expires_in": "24h",
      "created_at": "14:02:38Z"
    }
  }
}`,
  5: `{
  "sessions": 1,
  "active_contexts": {
    "chat_8821": {
      "status": "SCHEDULING_DELIVERY",
      "approved_by": "manager",
      "send_at": "2026-03-25T08:00:00Z",
      "recipient": "cfo@acme.com"
    }
  }
}`,
  6: `{
  "sessions": 1,
  "active_contexts": {},
  "scheduled_jobs": 1,
  "last_run": {
    "status": "COMPLETED",
    "document": "Q3_Executive_Report.pdf",
    "send_at": "2026-03-25T08:00:00Z",
    "recipient": "cfo@acme.com"
  }
}`,
  7: `{
  "sessions": 1,
  "active_contexts": {},
  "last_run": {
    "status": "REJECTED",
    "document": "Q3_Executive_Report.pdf",
    "rejected_at": "14:05:12Z",
    "requester_notified": true
  }
}`,
};

// ─── SIMULATION COMPONENT ─────────────────────────────────────────────────────
function AsynchronousSimulation() {
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const currentStep = STEPS.find(s => s.id === step);

  const runDemo = async () => {
    if (isRunning) return;
    setIsRunning(true);

    // Step 1: Parsing
    setStep(1);
    await new Promise(r => setTimeout(r, 1200));

    // Step 2: AI Processing
    setStep(2);
    await new Promise(r => setTimeout(r, 1800));

    // Step 3: Generating PDF
    setStep(3);
    await new Promise(r => setTimeout(r, 2000));

    // Step 4: Awaiting approval — pause here, user must act
    setStep(4);
    setIsRunning(false);
  };

  const handleApprove = async () => {
    if (step !== 4) return;
    setIsRunning(true);
    setStep(5);
    await new Promise(r => setTimeout(r, 1500));
    setStep(6);
    setIsRunning(false);
  };

  const handleReject = async () => {
    if (step !== 4) return;
    setStep(7);
  };

  const handleReset = () => {
    setStep(0);
    setIsRunning(false);
  };

  const isIdle    = step === 0;
  const isDone    = step === 6 || step === 7;
  const isWaiting = step === 4;

  return (
    <div className="w-full bg-[#0a0a0a] rounded-sm border border-white/10 shadow-2xl p-4 md:p-6 font-sans">

      {/* Progress Bar */}
      <div className="mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {step > 0 && step < 7 && !isDone && (
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            )}
            {isDone && step === 6 && <span className="w-1.5 h-1.5 rounded-full bg-green-400" />}
            {isDone && step === 7 && <span className="w-1.5 h-1.5 rounded-full bg-red-400" />}
            <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${currentStep?.color}`}>
              {currentStep?.label}
            </span>
          </div>
          <span className="text-[10px] font-mono text-white/20">
            Step {step} / 6
          </span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${step === 7 ? 'bg-red-400' : 'bg-accent'}`}
            animate={{ width: `${(Math.min(step, 6) / 6) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT: Telegram Interface */}
        <div className="bg-[#1c1c1e] rounded-sm overflow-hidden border border-white/10 shadow-lg flex flex-col"
             style={{ minHeight: '420px' }}>
          <div className="bg-[#2c2c2e] p-3 flex items-center justify-between border-b border-white/5 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-background">
                <Bot size={16}/>
              </div>
              <div>
                <h4 className="font-bold text-xs text-white uppercase tracking-wider">Gamma Agent</h4>
                <p className="text-[9px] text-accent font-mono">
                  {isRunning ? 'processing...' : step === 4 ? 'waiting for approval' : 'online'}
                </p>
              </div>
            </div>
            {isRunning && <Activity size={12} className="text-accent animate-pulse" />}
          </div>

          {/* Chat messages — NO overflow-y-auto to avoid scroll trap */}
          <div className="p-4 flex flex-col gap-3 text-xs flex-1"
               style={{ background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://www.transparenttextures.com/patterns/cubes.png)' }}>
            <AnimatePresence>
              {step >= 1 && (
                <motion.div
                  key="msg-user"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="self-end bg-accent text-background p-2.5 rounded-xl rounded-tr-sm max-w-[80%] font-medium shadow-sm"
                >
                  Generate the Q3 executive report with sales data. Send to cfo@acme.com, 10 slides.
                </motion.div>
              )}

              {step >= 2 && (
                <motion.div
                  key="msg-processing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="self-start bg-[#2c2c2e] text-white/70 p-2.5 rounded-xl rounded-tl-sm max-w-[75%] text-[10px] font-mono shadow-sm flex items-center gap-2"
                >
                  <RefreshCw size={10} className="animate-spin text-accent shrink-0" />
                  Analyzing data with GPT-4o...
                </motion.div>
              )}

              {step >= 3 && (
                <motion.div
                  key="msg-generating"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="self-start bg-[#2c2c2e] text-white/70 p-2.5 rounded-xl rounded-tl-sm max-w-[75%] text-[10px] font-mono shadow-sm flex items-center gap-2"
                >
                  <Zap size={10} className="text-purple-400 shrink-0" />
                  Generating presentation via Gamma API...
                </motion.div>
              )}

              {step >= 4 && (
                <motion.div
                  key="msg-approval"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.4 }}
                  className="self-start bg-[#2c2c2e] text-white p-3 rounded-xl rounded-tl-sm max-w-[90%] flex flex-col gap-3 shadow-md"
                >
                  <p className="text-[11px]">
                    ✅ <strong>Q3_Executive_Report.pdf</strong> ready — 10 slides.
                  </p>
                  <div className="bg-[#1c1c1e] p-2 rounded-sm flex items-center gap-2 border border-white/5">
                    <FileText size={12} className="text-accent shrink-0"/>
                    <span className="font-mono text-[9px] text-white/70">Q3_Executive_Report.pdf</span>
                    <span className="ml-auto text-[8px] text-accent font-mono">gamma.app ↗</span>
                  </div>
                  <div className="bg-[#1c1c1e] p-2 rounded-sm flex items-center gap-2 border border-white/5">
                    <Mail size={12} className="text-muted shrink-0"/>
                    <span className="text-[9px] text-white/50">Recipient: cfo@acme.com</span>
                  </div>
                  <p className="text-[10px] text-white/70 border-t border-white/10 pt-2">
                    Approve scheduled delivery?
                  </p>

                  {step === 4 && (
                    <div className="flex gap-2">
                      <button
                        onClick={handleApprove}
                        className="flex-1 bg-accent/10 hover:bg-accent/20 border border-accent/30 hover:border-accent/60 py-1.5 rounded-sm text-accent font-bold transition-all flex items-center justify-center gap-1.5 text-[9px] uppercase tracking-wider"
                      >
                        <Check size={10}/> Approve
                      </button>
                      <button
                        onClick={handleReject}
                        className="flex-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 py-1.5 rounded-sm text-red-400 font-bold transition-all flex items-center justify-center gap-1.5 text-[9px] uppercase tracking-wider"
                      >
                        <X size={10}/> Reject
                      </button>
                    </div>
                  )}

                  {step > 4 && (
                    <div className={`w-full border py-1.5 rounded-sm font-bold flex items-center justify-center gap-1.5 text-[9px] uppercase tracking-wider ${
                      step === 7
                        ? 'bg-red-500/10 border-red-500/20 text-red-400'
                        : 'bg-accent/10 border-accent/20 text-accent'
                    }`}>
                      {step === 7 ? <><X size={10}/> Rejected</> : <><Check size={10}/> Approved</>}
                    </div>
                  )}
                </motion.div>
              )}

              {step === 5 && (
                <motion.div
                  key="msg-scheduling"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="self-start bg-[#2c2c2e] text-white/70 p-2.5 rounded-xl rounded-tl-sm max-w-[75%] text-[10px] font-mono flex items-center gap-2"
                >
                  <Calendar size={10} className="text-green-400 shrink-0" />
                  Scheduling delivery for 2026-03-25 08:00...
                </motion.div>
              )}

              {step === 6 && (
                <motion.div
                  key="msg-done"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="self-start bg-[#2c2c2e] text-white p-2.5 rounded-xl rounded-tl-sm max-w-[85%] text-[11px] shadow-md"
                >
                  🚀 Delivery scheduled for <strong>Mar 25 · 8:00 AM</strong>. The server will execute automatically — zero intervention required.
                </motion.div>
              )}

              {step === 7 && (
                <motion.div
                  key="msg-rejected"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="self-start bg-[#2c2c2e] text-white p-2.5 rounded-xl rounded-tl-sm max-w-[85%] text-[11px] shadow-md"
                >
                  <AlertTriangle size={12} className="text-red-400 inline mr-1" />
                  Request rejected. Context cleared from memory. Requester notified.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom action */}
          <div className="p-3 bg-[#1c1c1e] border-t border-white/5 shrink-0">
            {(isIdle || isDone) ? (
              <button
                onClick={isDone ? handleReset : runDemo}
                className="w-full bg-accent text-background py-2 rounded-sm font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2"
              >
                {isDone
                  ? <><RefreshCw size={12}/> Restart Workflow</>
                  : <><Send size={12}/> Trigger Workflow</>
                }
              </button>
            ) : (
              <div className="text-[10px] font-mono text-muted text-center py-1 animate-pulse">
                {step === 4 ? 'Workflow paused — waiting for human decision...' : 'Processing in background...'}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Server State */}
        <div className="hidden md:flex bg-[#121212] rounded-sm border border-white/10 overflow-hidden flex-col shadow-lg relative"
             style={{ minHeight: '420px' }}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none" />

          <div className="bg-white/5 p-3 flex items-center gap-3 border-b border-white/5 relative z-10 shrink-0">
            <div className="w-8 h-8 bg-purple-500/20 rounded-sm border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Server size={16}/>
            </div>
            <div>
              <h4 className="font-bold text-xs text-white uppercase tracking-wider">In-Memory State</h4>
              <p className="text-[9px] text-muted font-mono">$getWorkflowStaticData('global')</p>
            </div>
          </div>

          <div className="p-4 flex flex-col relative z-10 flex-1 overflow-hidden">
            <p className="text-muted text-[10px] mb-3 leading-relaxed shrink-0">
              n8n persists workflow context in <code className="text-accent">staticData</code> — survives across executions without a database. Watch state mutate in real-time as the workflow progresses:
            </p>

            <div className="flex-1 bg-[#050505] border border-white/10 rounded-sm flex flex-col shadow-inner overflow-hidden">
              <div className="bg-[#111] px-3 py-1.5 border-b border-white/5 flex items-center gap-2 shrink-0">
                <TerminalSquare size={12} className="text-purple-400" />
                <span className="text-[9px] font-mono text-muted uppercase tracking-widest">state_manager.json</span>
                {step > 0 && (
                  <span className={`ml-auto text-[8px] font-mono font-bold ${currentStep?.color}`}>
                    {currentStep?.label}
                  </span>
                )}
              </div>
              <div className="p-4 overflow-hidden flex-1">
                <AnimatePresence mode="wait">
                  <motion.pre
                    key={step}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`text-[10px] md:text-xs font-mono leading-relaxed ${
                      step === 7 ? 'text-red-300' :
                      step === 6 ? 'text-green-300' :
                      step === 4 ? 'text-accent' :
                      'text-purple-300'
                    }`}
                  >
                    {STATE_BY_STEP[step]}
                  </motion.pre>
                </AnimatePresence>
              </div>
            </div>

            {/* Step timeline */}
            <div className="flex items-center justify-between mt-3 shrink-0">
              {[1,2,3,4,5,6].map(s => (
                <div key={s} className="flex flex-col items-center gap-1">
                  <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    step === s ? 'bg-accent scale-125 shadow-[0_0_8px_rgba(56,189,248,0.8)]' :
                    step > s ? 'bg-accent/50' :
                    step === 7 && s <= 4 ? 'bg-red-400/50' :
                    'bg-white/10'
                  }`} />
                  <span className="text-[7px] font-mono text-white/20">
                    {['Parse','AI','Gen','Wait','Sched','Done'][s-1]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── IMAGES ───────────────────────────────────────────────────────────────────
const GAMMA_IMAGES = ['/proyectos/gamma/1.png'];

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function GammaCaseStudy() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const codeSnippet = `// State control based on memory state
if (payload.message) {
  const chatId = payload.message.chat.id.toString();
  const context = staticData[chatId];
  
  // Intercept if we are waiting for human approval
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

        {/* Evidence */}
        <div className="mb-16">
          <EvidenceCarousel images={GAMMA_IMAGES} title="Workflow Evidence" />
        </div>

        {/* Stack */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {[
            { label: 'Interface',   value: 'Telegram Bot',   icon: Bot      },
            { label: 'Generation',  value: 'Gamma API',      icon: RefreshCw},
            { label: 'Approval',    value: 'Human-in-Loop',  icon: Check    },
            { label: 'Execution',   value: 'Scheduled Jobs', icon: Clock    },
          ].map((item, i) => (
            <div key={i} className="glass-panel p-5 rounded-sm border border-white/5 hover:border-white/20 transition-colors bg-[#0a0a0a]">
              <item.icon className="text-accent mb-3" size={20} />
              <span className="tech-subtitle !mb-1">{item.label}</span>
              <div className="font-bold text-white uppercase tracking-tight">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Key Engineering Decisions */}
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
              The workflow pauses execution entirely after generating the document — it stores state in memory and waits for a human decision via Telegram. <strong>Trigger the workflow below, then approve or reject to see how the server state mutates at each stage.</strong>
            </p>
            <AsynchronousSimulation />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="item-title mb-6 border-b border-white/10 pb-4 text-accent">02. Persistence Architecture</h2>
              <p className="text-muted text-lg leading-relaxed mb-6">
                Maintaining conversation context across multiple messages separated by hours or days requires a rock-solid state design. Using n8n's <code>$getWorkflowStaticData</code>, I structured an in-memory persistence layer that survives workflow executions without external infrastructure.
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