// src/pages/LogisticsCaseStudy.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, GitBranch, Server, Database, Activity, CheckCircle2 } from 'lucide-react';

export default function LogisticsCaseStudy() {
  useEffect(() => {
    // Scroll al top al montar el componente
    window.scrollTo(0, 0);

    // Animación de entrada con Anime.js (asegúrate de tener el script en index.html)
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

  return (
    <div className="min-h-screen bg-background text-primary selection:bg-accent/30 font-sans pb-24 pt-12">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Navbar minimalista / Botón de regreso */}
        <nav className="mb-16 animate-in opacity-0">
          <Link to="/#projects" className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors font-medium">
            <ArrowLeft size={18} /> Back to Portfolio
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-16 animate-in opacity-0">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-bold tracking-widest uppercase bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/20">
              Architecture & Automation
            </span>
            <span className="text-xs font-mono text-muted">2025</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">LogisticsFlow AI</h1>
          <p className="text-xl text-muted leading-relaxed max-w-2xl">
            An event-driven logistics system engineered to validate evidence automatically, sync data tightly with a Django backend, and communicate via WhatsApp API in real-time.
          </p>
        </header>

        {/* Tech Stack Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 animate-in opacity-0">
          {[
            { label: 'Orchestrator', value: 'n8n', icon: GitBranch },
            { label: 'Backend', value: 'Django & Python', icon: Server },
            { label: 'AI Engine', value: 'OpenAI Whisper', icon: Activity },
            { label: 'Database', value: 'PostgreSQL', icon: Database },
          ].map((item, i) => (
            <div key={i} className="glass-panel p-5 rounded-xl border border-white/5">
              <item.icon className="text-accent mb-3" size={20} />
              <div className="text-xs text-muted mb-1 uppercase tracking-wider">{item.label}</div>
              <div className="font-semibold">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Content Sections */}
        <section className="space-y-16">
          
          <div className="animate-in opacity-0">
            <h2 className="text-2xl font-bold mb-4 border-b border-white/10 pb-4">01. The Problem</h2>
            <p className="text-muted text-lg leading-relaxed">
              Logistics companies face extreme bottlenecks when processing driver evidence. Delivery tickets, IDs, and voice notes arrive chaotically through different channels. Manual validation is slow, prone to human error, and delays the supply chain billing cycle. We needed a system capable of ingesting this unstructured data and structuring it autonomously.
            </p>
          </div>

          <div className="animate-in opacity-0">
            <h2 className="text-2xl font-bold mb-4 border-b border-white/10 pb-4">02. The Architecture</h2>
            <p className="text-muted text-lg leading-relaxed mb-6">
              I designed a highly decoupled architecture where <strong>n8n</strong> acts as the central nervous system, catching Webhooks from the WhatsApp Business API and routing the payloads based on their MIME type (Images vs. Audio).
            </p>
            <ul className="space-y-4 text-muted text-lg mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-green-500 shrink-0 mt-1" size={20} />
                <span><strong>Audio Processing:</strong> Voice notes sent by drivers are intercepted by n8n, temporarily stored, and sent to OpenAI's Whisper API for high-fidelity transcription.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-green-500 shrink-0 mt-1" size={20} />
                <span><strong>Image Validation:</strong> Delivery tickets are passed through a vision model to extract text (OCR) and validate signatures before touching the main database.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-green-500 shrink-0 mt-1" size={20} />
                <span><strong>Strict Sync:</strong> Once data is validated, n8n structures the JSON payload and pushes it via REST API to a secure Django backend, which handles the business logic and database persistence.</span>
              </li>
            </ul>
          </div>

          <div className="animate-in opacity-0 glass-panel p-8 rounded-2xl border border-white/10 bg-[#0a0a0a]">
            <h2 className="text-2xl font-bold mb-6">03. Impact & Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-extrabold text-accent mb-2">90%</div>
                <div className="text-sm text-muted">Reduction in manual ticket processing time.</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-accent mb-2">0</div>
                <div className="text-sm text-muted">Data loss during peak driver reporting hours.</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-accent mb-2">24/7</div>
                <div className="text-sm text-muted">Automated evidence ingestion via WhatsApp.</div>
              </div>
            </div>
          </div>

        </section>

        {/* Footer CTA */}
        <div className="mt-24 pt-12 border-t border-white/10 text-center animate-in opacity-0">
          <h3 className="text-xl font-bold mb-6">Interested in this architecture?</h3>
          <a href="mailto:tu-correo@example.com" className="inline-flex items-center justify-center gap-2 bg-primary text-background px-8 py-3.5 rounded-xl font-bold hover:scale-105 transition-transform duration-200">
            Let's build something similar
          </a>
        </div>

      </div>
    </div>
  );
}