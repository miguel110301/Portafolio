import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Bot, Mail, CheckCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
// 1. Nuevas importaciones
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function GammaCaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 2. Guardamos el código
  const codeSnippet = `// Initial ingestion: Identifying the type of interaction (Message vs Button)
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
  
  // Normal data input
  return [{ json: { type: 'message', payload } }];
}`;

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-6">
        
        <Link to="/" className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-12 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">Asynchronous Automation</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted">Telegram Bot</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted">Gamma API</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            Executive Report <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">Generator Agent</span>
          </h1>
          <p className="text-xl text-muted leading-relaxed mb-12">
            A conversational bot that ingests raw data, orchestrates presentation creation via AI, manages human approvals (Human-in-the-loop), and schedules deferred email deliveries.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {[
            { label: "Interface", value: "Telegram" },
            { label: "Generation", value: "Gamma API" },
            { label: "Approval", value: "Interactive" },
            { label: "Execution", value: "Scheduled" }
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl text-center border-t border-t-white/10">
              <span className="block text-2xl font-bold text-primary mb-1">{stat.value}</span>
              <span className="text-xs text-muted uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-16 text-muted leading-relaxed"
        >
          
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
              <Bot className="text-accent" /> The Operational Challenge
            </h2>
            <p>
              Generating executive presentations from raw data (e.g., Power BI exports) takes hours of manual work. The goal was to create a mobile-accessible assistant that could receive the data, structure it with AI, generate the slides, and most importantly, <strong>request human approval before sending the final result to clients at a scheduled date and time.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
              <RefreshCw className="text-accent" /> Asynchronous Architecture
            </h2>
            <div className="glass-panel p-8 rounded-2xl mb-6 border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="mt-1 bg-white/10 p-2 rounded-lg h-fit"><RefreshCw size={20} className="text-accent"/></div>
                  <div>
                    <strong className="text-primary block mb-1">Intelligent Polling Mechanism</strong>
                    Document generation APIs (like Gamma) do not respond immediately. I implemented a controlled wait cycle (Wait/Check) with a safe retry limit to monitor the status without overwhelming the endpoints.
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 bg-white/10 p-2 rounded-lg h-fit"><CheckCircle size={20} className="text-accent"/></div>
                  <div>
                    <strong className="text-primary block mb-1">Human-in-the-Loop & State Management</strong>
                    Using <code>$getWorkflowStaticData</code>, the system saves the user's session in memory. The bot sends the presentation via Telegram with interactive buttons (Callbacks) and "pauses" its execution until receiving the approval or cancellation click.
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 bg-white/10 p-2 rounded-lg h-fit"><Clock size={20} className="text-accent"/></div>
                  <div>
                    <strong className="text-primary block mb-1">Deferred Execution (Scheduling)</strong>
                    Once approved, the system asks the user for a delivery date. A code parser extracts the "DD/MM/YYYY HH:MM" string, converts it to a strict timezone, validates that it is in the future, and suspends the entire flow until that exact moment.
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
              <Mail className="text-accent" /> Featured Code: Global State Control
            </h2>
            <p className="mb-6">
              Maintaining conversation context across multiple messages separated in time requires good state design. Here I show how I structure in-memory persistence to manage the bot's state machine.
            </p>
            
            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d1117]">
              <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="ml-4 text-xs font-mono text-muted">state_manager.js</span>
              </div>
              {/* 3. Componente de sintaxis aquí también */}
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
          </section>

        </motion.div>
      </div>
    </div>
  );
}

export default GammaCaseStudy;