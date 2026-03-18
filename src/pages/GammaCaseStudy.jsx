// src/pages/GammaCaseStudy.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Bot, Mail, CheckCircle, RefreshCw } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

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

  const codeSnippet = `// Initial ingestion: Identifying the type of interaction
const staticData = $getWorkflowStaticData('global');
const payload = $input.first().json;

if (payload.callback_query) {
  return [{ json: { type: 'callback', payload } }];
}

// Flow control based on memory state
if (payload.message) {
  const chatId = payload.message.chat.id.toString();
  const context = staticData[chatId];
  
  // If the user already approved and we are waiting for the datetime:
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
            <span className="text-xs font-bold tracking-widest uppercase bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/20">
              Asynchronous Automation
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">Gamma Agent</h1>
          <p className="text-xl text-muted leading-relaxed max-w-2xl">
            A conversational bot that ingests raw data, orchestrates presentation creation via AI, manages human approvals (Human-in-the-loop), and schedules deferred email deliveries.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 animate-in opacity-0">
          {[
            { label: 'Interface', value: 'Telegram Bot', icon: Bot },
            { label: 'Generation', value: 'Gamma API', icon: RefreshCw },
            { label: 'Approval', value: 'Interactive', icon: CheckCircle },
            { label: 'Execution', value: 'Scheduled', icon: Clock },
          ].map((item, i) => (
            <div key={i} className="glass-panel p-5 rounded-xl border border-white/5">
              <item.icon className="text-accent mb-3" size={20} />
              <div className="text-xs text-muted mb-1 uppercase tracking-wider">{item.label}</div>
              <div className="font-semibold">{item.value}</div>
            </div>
          ))}
        </div>

        <section className="space-y-16">
          
          <div className="animate-in opacity-0">
            <h2 className="text-2xl font-bold mb-4 border-b border-white/10 pb-4">01. The Operational Challenge</h2>
            <p className="text-muted text-lg leading-relaxed">
              Generating executive presentations from raw data takes hours of manual work. The goal was to create a mobile-accessible assistant that could receive the data, structure it with AI, generate the slides, and most importantly, request human approval before sending the final result to clients at a scheduled date and time.
            </p>
          </div>

          <div className="animate-in opacity-0">
            <h2 className="text-2xl font-bold mb-4 border-b border-white/10 pb-4">02. Asynchronous Architecture</h2>
            <ul className="space-y-6 mt-6">
              <li className="flex gap-4 glass-panel p-6 rounded-xl border border-white/5">
                <div className="mt-1 bg-white/5 p-2 rounded-lg h-fit"><RefreshCw size={20} className="text-accent"/></div>
                <div>
                  <strong className="text-primary block mb-1 text-lg">Intelligent Polling Mechanism</strong>
                  <span className="text-muted leading-relaxed">Document generation APIs do not respond immediately. I implemented a controlled wait cycle (Wait/Check) with a safe retry limit to monitor the status without overwhelming the endpoints.</span>
                </div>
              </li>
              <li className="flex gap-4 glass-panel p-6 rounded-xl border border-white/5">
                <div className="mt-1 bg-white/5 p-2 rounded-lg h-fit"><CheckCircle size={20} className="text-accent"/></div>
                <div>
                  <strong className="text-primary block mb-1 text-lg">Human-in-the-Loop & State Management</strong>
                  <span className="text-muted leading-relaxed">Using <code>$getWorkflowStaticData</code>, the system saves the user's session in memory. The bot sends the presentation via Telegram with interactive buttons and pauses its execution until receiving the approval.</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="animate-in opacity-0">
            <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4 flex items-center gap-3">
              <Mail className="text-accent" /> Featured Code: Global State Control
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-6">
              Maintaining conversation context across multiple messages separated in time requires good state design. Here I show how I structure in-memory persistence to manage the bot's state machine.
            </p>
            
            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl">
              <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="ml-4 text-xs font-mono text-muted">state_manager.js</span>
              </div>
              <div className="text-sm font-mono text-gray-300">
                <SyntaxHighlighter 
                  language="javascript" 
                  style={vscDarkPlus} 
                  customStyle={{ background: 'transparent', padding: '1.5rem', margin: 0 }}
                >
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