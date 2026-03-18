import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Server, Cpu, Webhook, ShieldCheck, Database, Terminal, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function LogisticsCaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const codeSnippet = `// Recursive function to find the valid JSON object within the LLM response
function findValidJSON(obj) {
  if (!obj) return null;
  if (typeof obj === 'string' && (obj.includes('monto') || obj.includes('categoria'))) return obj;
  if (typeof obj === 'object') {
    for (let key in obj) {
      let found = findValidJSON(obj[key]);
      if (found) return found;
    }
  }
  return null;
}

const foundText = findValidJSON($json);
if (!foundText) return { json: { is_valid: false, error_msg: "Parse Error" }};

try {
  const cleanStr = foundText.replace(/\\\`\\\`\\\`json/g, '').replace(/\\\`\\\`\\\`/g, '').trim();
  const data = JSON.parse(cleanStr);
  
  return { json: { is_valid: true, monto: data.monto, categoria: data.categoria }};
} catch (error) {
  return { json: { is_valid: false, error_msg: "Corrupted data." }};
}`;

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-6">
        
        <Link to="/" className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-12 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">Event-Driven Logistics</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted">Advanced n8n</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            Logistics Orchestrator <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">Powered by AI</span>
          </h1>
          <p className="text-xl text-muted leading-relaxed mb-12">
            High-concurrency automated system for driver operational management, physical evidence validation using Computer Vision, and strict state synchronization with a centralized backend.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-16 text-muted leading-relaxed"
        >
          
          <section>
            <h2 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3">
              <Server className="text-accent" /> System Architecture Flow
            </h2>
            
            {/* EL DIAGRAMA ANIMADO */}
            <div className="glass-panel p-8 rounded-2xl border border-white/10 bg-[#0d1117] flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 overflow-hidden relative py-12">
              
              {/* Partícula de datos que viaja */}
              <motion.div 
                className="absolute h-2 w-2 rounded-full bg-accent z-0 hidden md:block"
                animate={{
                  x: [0, 200, 400, 600, 800],
                  opacity: [0, 1, 1, 1, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{ top: '50%', marginTop: '-4px', left: '10%' }}
              />

              <div className="z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/20 flex items-center justify-center mb-3">
                  <Webhook className="text-muted" size={28} />
                </div>
                <span className="text-sm font-semibold text-primary">Webhook</span>
                <span className="text-xs text-muted">Raw Payload</span>
              </div>

              <ArrowRight className="hidden md:block text-white/20" />

              <div className="z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                  <Cpu className="text-accent" size={28} />
                </div>
                <span className="text-sm font-semibold text-primary">n8n Router</span>
                <span className="text-xs text-muted">State Machine</span>
              </div>

              <ArrowRight className="hidden md:block text-white/20" />

              <div className="z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  <ShieldCheck className="text-purple-400" size={28} />
                </div>
                <span className="text-sm font-semibold text-primary">GPT-4o</span>
                <span className="text-xs text-muted">OCR & Anti-Fraud</span>
              </div>

              <ArrowRight className="hidden md:block text-white/20" />

              <div className="z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/20 flex items-center justify-center mb-3">
                  <Database className="text-green-400" size={28} />
                </div>
                <span className="text-sm font-semibold text-primary">Django DB</span>
                <span className="text-xs text-muted">Single Source</span>
              </div>
            </div>
            <p className="mt-6 text-sm">
              The payload is intercepted, audio is converted to text asynchronously using Whisper, and strict business rules are applied through the state machine before committing to the Django database.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
              <Terminal className="text-accent" /> Engineering in Automation
            </h2>
            <p className="mb-6">
              Low-code tools fail if there is no solid code backing them up. Here I show how I solve one of the most common problems when using LLMs in production: <strong>ensuring JSON parsing even when the AI hallucinates additional text or markdown formatting.</strong>
            </p>
            
            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d1117]">
              <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="ml-4 text-xs font-mono text-muted">ai_json_parser.js</span>
              </div>
              <div className="text-sm font-mono text-gray-300">
                <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: '1.5rem', margin: 0 }}>
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

export default LogisticsCaseStudy;