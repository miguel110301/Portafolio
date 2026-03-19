import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, GitBranch, Server, Database, Activity, Code2, Smartphone, CheckCheck, Webhook, BrainCircuit, ChevronRight, FileCheck2, Terminal } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function EndToEndSimulation() {
  const [isRunning, setIsRunning] = useState(false);
  const [activePayload, setActivePayload] = useState('{\n  "status": "awaiting_event"\n}');

  // Definimos los payloads para cada fase
  const payloads = [
    '{\n  "status": "awaiting_event"\n}',
    '{\n  "event": "message.received",\n  "media_type": "image/jpeg",\n  "size": "2.4MB"\n}',
    '{\n  "ocr_engine": "active",\n  "extracted": "PKG-892",\n  "signature": true\n}',
    '{\n  "db_action": "INSERT",\n  "table": "delivery_ticket",\n  "status": 201\n}',
    '{\n  "notification": "sent",\n  "channel": "WhatsApp"\n}'
  ];

  const runSimulation = () => {
    if (isRunning || !window.anime) return;
    setIsRunning(true);

    // Resetear opacidades y posiciones
    window.anime.set('.wa-msg-1', { opacity: 0, translateY: 20, scale: 0.95 });
    window.anime.set('.wa-msg-2', { opacity: 0, translateY: 20, scale: 0.95 });
    window.anime.set('.db-row-new', { opacity: 0, translateX: -20, backgroundColor: 'rgba(34,197,94,0)' });
    window.anime.set('.node-glow', { boxShadow: '0 0 0px rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.1)', scale: 1 });

    const tl = window.anime.timeline({
      easing: 'easeOutExpo',
      complete: () => setIsRunning(false)
    });

    // 1. Entra mensaje de WhatsApp
    tl.add({
      targets: '.wa-msg-1',
      opacity: 1,
      translateY: 0,
      scale: 1,
      duration: 800,
      easing: 'easeOutElastic(1, .8)',
      begin: () => setActivePayload(payloads[1])
    });

    // 2. Nodo Webhook
    tl.add({
      targets: '#node-webhook',
      boxShadow: ['0 0 0px rgba(168,85,247,0)', '0 0 30px rgba(168,85,247,0.4)', '0 0 0px rgba(168,85,247,0)'],
      borderColor: ['rgba(255,255,255,0.1)', 'rgba(168,85,247,1)', 'rgba(255,255,255,0.1)'],
      scale: [1, 1.05, 1],
      duration: 1000,
    }, '+=400');

    // 3. Nodo AI (Vision)
    tl.add({
      targets: '#node-ai',
      boxShadow: ['0 0 0px rgba(56,189,248,0)', '0 0 30px rgba(56,189,248,0.4)', '0 0 0px rgba(56,189,248,0)'],
      borderColor: ['rgba(255,255,255,0.1)', 'rgba(56,189,248,1)', 'rgba(255,255,255,0.1)'],
      scale: [1, 1.05, 1],
      duration: 1200,
      begin: () => setActivePayload(payloads[2])
    }, '+=200');

    // 4. Nodo Django
    tl.add({
      targets: '#node-django',
      boxShadow: ['0 0 0px rgba(34,197,94,0)', '0 0 30px rgba(34,197,94,0.4)', '0 0 0px rgba(34,197,94,0)'],
      borderColor: ['rgba(255,255,255,0.1)', 'rgba(34,197,94,1)', 'rgba(255,255,255,0.1)'],
      scale: [1, 1.05, 1],
      duration: 1000,
      begin: () => setActivePayload(payloads[3])
    }, '+=200');

    // 5. Inserción en Base de Datos
    tl.add({
      targets: '.db-row-new',
      opacity: 1,
      translateX: 0,
      backgroundColor: ['rgba(34,197,94,0.3)', 'rgba(0,0,0,0)'],
      duration: 1200,
      easing: 'easeOutElastic(1, .8)'
    }, '-=400');

    // 6. Respuesta al celular
    tl.add({
      targets: '.wa-msg-2',
      opacity: 1,
      translateY: 0,
      scale: 1,
      duration: 800,
      easing: 'easeOutElastic(1, .8)',
      begin: () => setActivePayload(payloads[4])
    }, '+=400');
  };

  return (
    <div className="w-full bg-[#0a0a0a] rounded-sm border border-white/10 shadow-2xl p-4 md:p-8 font-sans my-12 overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        
        {/* 1. INTERFAZ: WhatsApp */}
        <div className="bg-[#0b141a] rounded-sm border border-white/10 overflow-hidden flex flex-col h-[360px] md:h-[420px] shadow-lg">
          <div className="bg-[#202c33] p-3 flex items-center gap-3 border-b border-white/5">
            <div className="w-8 h-8 bg-emerald-600 rounded-sm flex items-center justify-center text-white"><Smartphone size={16}/></div>
            <div><h4 className="font-bold text-xs text-white uppercase tracking-wider">Driver_UI</h4></div>
          </div>
          <div className="p-4 flex-1 flex flex-col gap-3 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-black/40 text-xs overflow-y-auto">
            
            <div className="wa-msg-1 opacity-0 self-end bg-[#005c4b] text-[#e9edef] p-2.5 rounded-xl rounded-tr-none w-[85%] shadow-sm origin-bottom-right">
              <div className="w-full h-16 bg-black/40 rounded-sm flex items-center justify-center border border-white/5 mb-1 relative overflow-hidden">
                <FileCheck2 size={24} className="text-white/50"/>
              </div>
              <p>Entrego paquete #892.</p>
              <div className="text-[9px] text-right text-gray-400 mt-1 flex justify-end items-center gap-1">14:05 <CheckCheck size={12} className="text-[#53bdeb]"/></div>
            </div>
            
            <div className="wa-msg-2 opacity-0 self-start bg-[#202c33] text-[#e9edef] p-2.5 rounded-xl rounded-tl-none w-[85%] shadow-sm origin-bottom-left mt-auto">
              <p>✅ <strong>Ticket validado.</strong> Paquete #892 registrado en ERP.</p>
              <div className="text-[9px] text-right text-gray-400 mt-1">14:05</div>
            </div>

          </div>
          <div className="p-3 bg-[#202c33] border-t border-white/5">
            <button onClick={runSimulation} disabled={isRunning} className="w-full bg-emerald-600 disabled:bg-emerald-800 text-white py-2 rounded-sm font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2">
              {isRunning ? "Executing Flow..." : "Trigger Webhook"}
            </button>
          </div>
        </div>

        {/* 2. ORQUESTADOR: n8n Flow & Payload Console */}
        <div className="hidden lg:flex flex-col gap-4 h-full">
          <div className="text-center mb-2"><h4 className="text-[10px] font-bold text-muted uppercase tracking-[0.3em]">n8n Orchestrator</h4></div>
          
          <div id="node-webhook" className="node-glow relative p-3 rounded-sm border border-white/10 bg-[#121212] flex items-center gap-4">
            <Webhook className="text-purple-400" size={20}/>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">1. Webhook</div>
              <div className="text-[9px] text-muted font-mono">Catch Event</div>
            </div>
          </div>

          <div className="flex justify-center"><ChevronRight className="text-white/10 rotate-90 lg:rotate-0" size={16}/></div>

          <div id="node-ai" className="node-glow relative p-3 rounded-sm border border-white/10 bg-[#121212] flex items-center gap-4">
            <BrainCircuit className="text-accent" size={20}/>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">2. AI Vision</div>
              <div className="text-[9px] text-muted font-mono">OCR Extraction</div>
            </div>
          </div>

          <div className="flex justify-center"><ChevronRight className="text-white/10 rotate-90 lg:rotate-0" size={16}/></div>

          <div id="node-django" className="node-glow relative p-3 rounded-sm border border-white/10 bg-[#121212] flex items-center gap-4">
            <Server className="text-green-400" size={20}/>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">3. API Request</div>
              <div className="text-[9px] text-muted font-mono">POST /django</div>
            </div>
          </div>

          {/* Consola JSON en tiempo real */}
          <div className="mt-auto bg-[#050505] border border-white/10 rounded-sm overflow-hidden h-28 flex flex-col shadow-inner">
             <div className="bg-[#111] px-3 py-1 border-b border-white/5 flex items-center gap-2">
               <Terminal size={10} className="text-accent" />
               <span className="text-[9px] font-mono text-muted uppercase tracking-widest">Live_Payload.json</span>
             </div>
             <pre className="p-3 text-[9px] font-mono text-green-400 overflow-hidden">
               {activePayload}
             </pre>
          </div>
        </div>

        {/* 3. BACKEND: Base de Datos */}
        <div className="hidden lg:flex flex-col h-[420px] rounded-sm border border-white/10 overflow-hidden shadow-lg bg-[#121212]">
           <div className="bg-white/5 p-3 flex items-center gap-3 border-b border-white/5">
            <div className="w-8 h-8 bg-blue-600/20 border border-blue-500/30 rounded-sm flex items-center justify-center text-blue-400"><Database size={16}/></div>
            <div><h4 className="font-bold text-xs text-white uppercase tracking-wider">PostgreSQL</h4></div>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-start overflow-hidden">
            <table className="w-full text-left text-[10px] font-mono">
              <thead>
                <tr className="text-muted border-b border-white/10">
                  <th className="pb-2">ID</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Signature</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5 text-white/40">
                  <td className="py-3">PKG-890</td>
                  <td className="py-3"><span className="text-green-400/50 bg-green-400/5 px-1 py-0.5 rounded-sm">DELIVERED</span></td>
                  <td className="py-3">true</td>
                </tr>
                <tr className="border-b border-white/5 text-white/40">
                  <td className="py-3">PKG-891</td>
                  <td className="py-3"><span className="text-green-400/50 bg-green-400/5 px-1 py-0.5 rounded-sm">DELIVERED</span></td>
                  <td className="py-3">true</td>
                </tr>
                {/* Fila Animada */}
                <tr className="db-row-new opacity-0 border-b border-white/5 text-white">
                  <td className="py-3 text-accent font-bold">PKG-892</td>
                  <td className="py-3"><span className="text-green-400 bg-green-400/10 px-1 py-0.5 rounded-sm font-bold shadow-[0_0_10px_rgba(34,197,94,0.2)]">DELIVERED</span></td>
                  <td className="py-3 font-bold text-accent">true</td>
                </tr>
              </tbody>
            </table>
            {!isRunning && activePayload === '{\n  "status": "awaiting_event"\n}' && (
              <div className="text-center mt-12 text-[10px] text-muted font-mono uppercase tracking-widest animate-pulse">Awaiting Sync...</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function LogisticsCaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const djangoCode = `# Django API View handling the validated payload
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import transaction
from .models import DeliveryTicket, Driver

class TicketIngestionView(APIView):
    @transaction.atomic
    def post(self, request):
        try:
            data = request.data
            
            # 1. Validation logic decoupled from n8n
            if not data.get('has_signature'):
                return Response({"error": "Missing signature"}, status=400)

            # 2. Secure Database Interaction
            driver = Driver.objects.get(phone=data.get('driver_phone'))
            ticket, created = DeliveryTicket.objects.update_or_create(
                ticket_id=data.get('ticket_number'),
                defaults={'driver': driver, 'status': 'DELIVERED'}
            )
            
            # 3. Success triggers WhatsApp reply node in n8n
            return Response({"status": "success", "id": ticket.id}, status=201)
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)`;

  return (
    <div className="min-h-screen bg-background text-primary selection:bg-accent/30 font-sans pb-24 pt-12 relative overflow-hidden">
      {/* Glow de fondo para dar ambiente sci-fi sutil */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        <nav className="mb-16">
          <Link to="/#projects" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted hover:text-accent transition-colors">
            <ArrowLeft size={14} /> System_Return
          </Link>
        </nav>

        <header className="mb-16">
          <div className="mb-6">
            <span className="protocol-label">Architecture_&_Automation</span>
          </div>
          <h1 className="section-title mb-6">LogisticsFlow AI.</h1>
          <p className="text-xl text-muted leading-relaxed max-w-3xl">
            A production event-driven system processing 500+ daily logistics validations. 
            Designed around a strict separation of concerns: n8n handles all orchestration logic, 
            Django owns the data model and business rules, and OpenAI Vision + Whisper handle 
            multimodal evidence classification — keeping each layer independently testable and replaceable.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: 'Orchestrator', value: 'n8n', icon: GitBranch },
            { label: 'Backend', value: 'Django (Python)', icon: Server },
            { label: 'AI Engine', value: 'OpenAI Vision', icon: Activity },
            { label: 'Interface', value: 'WhatsApp API', icon: Smartphone },
          ].map((item, i) => (
            <div key={i} className="glass-panel p-5 rounded-sm border border-white/5 hover:border-white/20 transition-colors bg-[#0a0a0a]">
              <item.icon className="text-accent mb-3" size={20} />
              <span className="tech-subtitle !mb-1">{item.label}</span>
              <div className="font-bold text-white uppercase tracking-tight">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Agregar después del grid de tech stack, antes del primer section */}
        <div className="mb-24 glass-panel p-8 md:p-10 rounded-sm border border-white/5">
          <h2 className="item-title mb-8 border-b border-white/10 pb-4">Key Engineering Decisions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                decision: "n8n over custom orchestration",
                why: "Building a custom workflow engine would introduce maintenance overhead with no competitive advantage. n8n gave us visual debuggability, built-in retry logic, and webhook management — the team could trace failures in seconds instead of reading logs.",
                tradeoff: "Accepted: vendor dependency and limited custom logic in complex branches."
              },
              {
                decision: "Synchronous Django API over event queue",
                why: "At 500 req/day, the operational complexity of Kafka or RabbitMQ was unjustified. A synchronous Django API with select_for_update() race condition protection gave us ACID guarantees with zero infrastructure overhead.",
                tradeoff: "Accepted: horizontal scaling ceiling. Revisit at 10x volume."
              },
              {
                decision: "WhatsApp Business API over SMS",
                why: "100% of the logistics operators already used WhatsApp daily. Adoption cost was zero. The API provided media upload, message status webhooks, and template messaging — features SMS cannot match at the same price point.",
                tradeoff: "Accepted: Meta platform dependency and approval process for message templates."
              }
            ].map((item, i) => (
              <div key={i} className="space-y-3">
                <h3 className="text-white font-bold text-sm uppercase tracking-tight">{item.decision}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.why}</p>
                <p className="text-accent/60 text-xs font-mono leading-relaxed border-l border-accent/30 pl-3">{item.tradeoff}</p>
              </div>
            ))}
          </div>
        </div>

        <section className="space-y-24">
          <div>
            <h2 className="item-title mb-6 border-b border-white/10 pb-4">01. Live Execution Trace</h2>
            <p className="text-muted text-lg leading-relaxed mb-8 max-w-3xl">
              When a driver sends evidence via WhatsApp, the system doesn't just save a photo. It orchestrates a multi-step validation process autonomously and replies to the driver instantly. <strong>Watch the payload mutate in real-time across the architecture.</strong>
            </p>
            <EndToEndSimulation />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="item-title mb-6 border-b border-white/10 pb-4 text-accent">02. Backend Evidence</h2>
              <p className="text-muted text-lg leading-relaxed mb-6">
                While n8n handles the routing and AI API calls, the core truth lives in the database. I built a Python/Django endpoint to receive the structured data from the workflow, ensuring ACID transactions (<code>@transaction.atomic</code>) and strict error handling to prevent corrupted states.
              </p>
            </div>
            
            <div className="rounded-sm overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl relative">
              <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/10">
                <span className="tech-subtitle !mb-0 !tracking-widest">views.py</span>
              </div>
              <div className="text-xs md:text-sm font-mono text-gray-300">
                <SyntaxHighlighter language="python" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: '1.5rem', margin: 0 }}>
                  {djangoCode}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}