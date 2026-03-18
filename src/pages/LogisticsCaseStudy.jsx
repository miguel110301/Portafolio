import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Server, Cpu, Workflow, ShieldCheck, Database, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
// 1. Nuevas importaciones para el código
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function LogisticsCaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 2. Guardamos el código en una variable para que sea más limpio
  const codeSnippet = `// Recursive function to find the valid JSON object within the LLM response
function findValidJSON(obj) {
  if (!obj) return null;
  // Look for specific signatures we know we asked the AI for
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

if (!foundText) {
  return { json: { is_valid: false, error_msg: "Error: Could not process response." }};
}

try {
  // Aggressive cleanup of Markdown blocks that AIs often insert
  const cleanStr = foundText.replace(/\\\`\\\`\\\`json/g, '').replace(/\\\`\\\`\\\`/g, '').trim();
  const data = JSON.parse(cleanStr);
  
  // Final business logic shielding
  let is_valid = true;
  let error_msg = "";
  
  if (data.categoria === "INVALIDO" || data.monto === 0) {
      is_valid = false;
      error_msg = "Could not read the numbers. Please take a clearer photo.";
  }

  return {
    json: {
      is_valid: is_valid,
      monto: data.monto,
      categoria: data.categoria,
      error_msg: error_msg
    }
  };
} catch (error) {
  return { json: { is_valid: false, error_msg: "Corrupted data structure." }};
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
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">Event-Driven Logistics</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted">Advanced n8n</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted">Python / Django</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            Logistics Orchestrator <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">Powered by AI</span>
          </h1>
          <p className="text-xl text-muted leading-relaxed mb-12">
            Architecture of a high-concurrency automated system for driver operational management, physical evidence validation using Computer Vision, and strict state synchronization with a centralized backend.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {[
            { label: "AI Validation", value: "GPT-4o" },
            { label: "Voice to Text", value: "Whisper" },
            { label: "Core Backend", value: "Django API" },
            { label: "Orchestration", value: "n8n" }
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
              <Workflow className="text-accent" /> The Operational Challenge
            </h2>
            <p className="mb-4">
              In large-scale logistics operations, the biggest bottleneck occurs in the manual validation of evidence (toll tickets, diesel invoices, waybills, etc.) and updating trip statuses. Operators send multiple formats (text, blurry photos, voice notes) that require human interpretation, causing delays in settlements and dispatch.
            </p>
            <p>
              The goal was to build a <strong>fault-tolerant</strong> system capable of receiving massive webhooks, normalizing data input regardless of the original format (converting audio to text transparently), and applying strict business rules before interacting with the central Django database.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
              <Server className="text-accent" /> System Architecture
            </h2>
            <div className="glass-panel p-8 rounded-2xl mb-6 border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="mt-1 bg-white/10 p-2 rounded-lg h-fit"><ShieldCheck size={20} className="text-accent"/></div>
                  <div>
                    <strong className="text-primary block mb-1">Ingestion & Normalization Layer</strong>
                    Webhook reception. If the payload contains audio, it is intercepted, the binary is downloaded, and asynchronously processed through OpenAI's Whisper model. The text result is injected into the flow, replacing the original payload, allowing the rest of the system to process the audio as plain text.
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 bg-white/10 p-2 rounded-lg h-fit"><Database size={20} className="text-accent"/></div>
                  <div>
                    <strong className="text-primary block mb-1">State Machine (Router)</strong>
                    A real-time query to the backend (Django) retrieves the user's trip context. A massive Switch node routes the logic based on state combinations: <code>OFFERING</code>, <code>WAITING_EVIDENCE</code>, <code>HOJA_LIQUIDACION</code>, etc.
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 bg-white/10 p-2 rounded-lg h-fit"><Cpu size={20} className="text-accent"/></div>
                  <div>
                    <strong className="text-primary block mb-1">OCR & Anti-Fraud Validation</strong>
                    Images are sent to GPT-4o with an unbreakable system prompt. It evaluates not only the text (amount, category) but the validity of the image itself (e.g., rejecting if an ID is expected but an empty box is detected, or if the photo is illegible).
                  </div>
                </li>
              </ul>
            </div>
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
              {/* 3. ¡Aquí está la magia del resaltado de código! */}
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

          <section className="bg-gradient-to-r from-accent/10 to-transparent p-8 rounded-2xl border border-accent/20">
            <h2 className="text-2xl font-bold text-primary mb-2">System Impact</h2>
            <p className="text-primary/80">
              The implementation of this architecture allowed the operation to scale asynchronously. Operators receive immediate feedback on their evidence, the Django backend remains the Single Source of Truth, and the support team was freed from routine validations to focus solely on resolving operational exceptions.
            </p>
          </section>

        </motion.div>
      </div>
    </div>
  );
}

export default LogisticsCaseStudy;