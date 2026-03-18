// src/pages/LogisticsCaseStudy.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, GitBranch, Server, Database, Activity, Code2, Smartphone, CheckCheck, Webhook, BrainCircuit, ChevronRight, FileCheck2 } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from 'framer-motion';

function EndToEndSimulation() {
  const [phase, setPhase] = useState(0);

  const runSimulation = async () => {
    if (phase !== 0 && phase !== 6) return;
    setPhase(1); // WhatsApp Envía
    await new Promise(r => setTimeout(r, 1200));
    setPhase(2); // n8n Webhook
    await new Promise(r => setTimeout(r, 1000));
    setPhase(3); // n8n AI (OCR)
    await new Promise(r => setTimeout(r, 1500));
    setPhase(4); // Django Save
    await new Promise(r => setTimeout(r, 1000));
    setPhase(5); // WhatsApp Responde
    await new Promise(r => setTimeout(r, 800));
    setPhase(6); // Terminado
  };

  return (
    <div className="w-full bg-[#0a0a0a] rounded-3xl border border-white/10 shadow-2xl p-4 md:p-8 font-sans my-12 overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
        
        {/* 1. INTERFAZ: WhatsApp */}
        <div className="bg-[#0b141a] rounded-2xl border border-white/10 overflow-hidden flex flex-col h-[380px] shadow-lg">
          <div className="bg-[#202c33] p-3 flex items-center gap-3 border-b border-white/5">
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white"><Smartphone size={16}/></div>
            <div><h4 className="font-bold text-xs text-white">Driver App</h4></div>
          </div>
          <div className="p-4 flex-1 flex flex-col gap-3 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-black/40 text-xs">
            {phase >= 1 && (
              <motion.div initial={{opacity:0, scale:0.9, x:20}} animate={{opacity:1, scale:1, x:0}} className="self-end bg-[#005c4b] text-[#e9edef] p-2.5 rounded-xl rounded-tr-none w-[85%] shadow-sm">
                <div className="w-full h-16 bg-black/40 rounded flex items-center justify-center border border-white/5 mb-1 relative overflow-hidden">
                  <FileCheck2 size={24} className="text-white/50 absolute"/>
                  {phase >= 3 && <motion.div initial={{top:"0%"}} animate={{top:"100%"}} transition={{duration:1.5}} className="absolute left-0 right-0 h-0.5 bg-green-400 shadow-[0_0_10px_#4ade80] z-10"/>}
                </div>
                <p>Entrego paquete #892.</p>
                <div className="text-[9px] text-right text-gray-400 mt-1 flex justify-end items-center gap-1">14:05 <CheckCheck size={12} className={phase >= 2 ? "text-[#53bdeb]" : "text-gray-400"}/></div>
              </motion.div>
            )}
            {phase >= 5 && (
              <motion.div initial={{opacity:0, scale:0.9, x:-20}} animate={{opacity:1, scale:1, x:0}} className="self-start bg-[#202c33] text-[#e9edef] p-2.5 rounded-xl rounded-tl-none w-[85%] shadow-sm">
                <p>✅ <strong>Ticket validado.</strong> Paquete #892 registrado en ERP.</p>
              </motion.div>
            )}
          </div>
          <div className="p-3 bg-[#202c33] border-t border-white/5">
            <button onClick={runSimulation} disabled={phase > 0 && phase < 6} className="w-full bg-emerald-600 disabled:bg-emerald-800 text-white py-2 rounded-lg font-bold text-xs hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2">
              {phase === 0 ? "Send Delivery Proof" : phase === 6 ? "Restart Demo" : "Processing..."}
            </button>
          </div>
        </div>

        {/* 2. ORQUESTADOR: n8n Flow */}
        <div className="flex flex-col gap-4">
          <div className="text-center mb-2"><h4 className="text-xs font-bold text-muted uppercase tracking-widest">n8n Orchestrator</h4></div>
          
          <div className={`relative p-3 rounded-xl border transition-all duration-500 flex items-center gap-4 ${phase === 2 ? 'bg-purple-500/10 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.2)] scale-105' : 'bg-[#121212] border-white/10 opacity-60'}`}>
            <Webhook className={phase === 2 ? "text-purple-400" : "text-white/40"} size={24}/>
            <div>
              <div className="text-xs font-bold text-white">1. Catch Webhook</div>
              <div className="text-[10px] text-muted font-mono">{phase >= 2 ? "{ media: 'image.jpg' }" : "Waiting..."}</div>
            </div>
          </div>

          <div className="flex justify-center"><ChevronRight className="text-white/20 rotate-90 lg:rotate-0" size={16}/></div>

          <div className={`relative p-3 rounded-xl border transition-all duration-500 flex items-center gap-4 ${phase === 3 ? 'bg-blue-500/10 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)] scale-105' : 'bg-[#121212] border-white/10 opacity-60'}`}>
            <BrainCircuit className={phase === 3 ? "text-blue-400 animate-pulse" : "text-white/40"} size={24}/>
            <div>
              <div className="text-xs font-bold text-white">2. AI Vision (OCR)</div>
              <div className="text-[10px] text-muted font-mono">{phase >= 3 ? "Extracted: PKG-892" : "Idle"}</div>
            </div>
          </div>

          <div className="flex justify-center"><ChevronRight className="text-white/20 rotate-90 lg:rotate-0" size={16}/></div>

          <div className={`relative p-3 rounded-xl border transition-all duration-500 flex items-center gap-4 ${phase === 4 ? 'bg-green-500/10 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.2)] scale-105' : 'bg-[#121212] border-white/10 opacity-60'}`}>
            <Server className={phase === 4 ? "text-green-400" : "text-white/40"} size={24}/>
            <div>
              <div className="text-xs font-bold text-white">3. POST to Django</div>
              <div className="text-[10px] text-muted font-mono">{phase >= 4 ? "Status: 201 Created" : "Idle"}</div>
            </div>
          </div>
        </div>

        {/* 3. BACKEND: Base de Datos */}
        <div className="bg-[#121212] rounded-2xl border border-white/10 overflow-hidden flex flex-col h-[380px] shadow-lg">
           <div className="bg-white/5 p-3 flex items-center gap-3 border-b border-white/5">
            <div className="w-8 h-8 bg-blue-600/20 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400"><Database size={16}/></div>
            <div><h4 className="font-bold text-xs text-white">PostgreSQL DB</h4></div>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-center">
            <table className="w-full text-left text-[10px] font-mono">
              <thead>
                <tr className="text-muted border-b border-white/10">
                  <th className="pb-2">ID</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Signature</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5 text-white/50">
                  <td className="py-3">PKG-890</td>
                  <td className="py-3"><span className="text-green-400 bg-green-400/10 px-1 py-0.5 rounded">DELIVERED</span></td>
                  <td className="py-3">true</td>
                </tr>
                <tr className="border-b border-white/5 text-white/50">
                  <td className="py-3">PKG-891</td>
                  <td className="py-3"><span className="text-green-400 bg-green-400/10 px-1 py-0.5 rounded">DELIVERED</span></td>
                  <td className="py-3">true</td>
                </tr>
                <AnimatePresence>
                  {phase >= 4 && (
                    <motion.tr initial={{opacity:0, backgroundColor:"rgba(59,130,246,0.2)"}} animate={{opacity:1, backgroundColor:"rgba(0,0,0,0)"}} transition={{duration:1}} className="border-b border-white/5 text-white">
                      <td className="py-3 text-accent font-bold">PKG-892</td>
                      <td className="py-3"><span className="text-green-400 bg-green-400/10 px-1 py-0.5 rounded font-bold">DELIVERED</span></td>
                      <td className="py-3">true</td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
            {phase < 4 && <div className="text-center mt-8 text-xs text-muted">Awaiting database commit...</div>}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function LogisticsCaseStudy() {
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
    <div className="min-h-screen bg-background text-primary selection:bg-accent/30 font-sans pb-24 pt-12">
      <div className="max-w-5xl mx-auto px-6">
        <nav className="mb-16 animate-in opacity-0">
          <Link to="/#projects" className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors font-medium">
            <ArrowLeft size={18} /> Back to Portfolio
          </Link>
        </nav>

        <header className="mb-16 animate-in opacity-0">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-bold tracking-widest uppercase bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/20">Architecture & Automation</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">LogisticsFlow AI</h1>
          <p className="text-xl text-muted leading-relaxed max-w-3xl">
            An event-driven logistics system engineered to validate evidence automatically, sync data tightly with a Django backend, and communicate via WhatsApp API in real-time.
          </p>
        </header>

        <section className="space-y-20">
          <div className="animate-in opacity-0">
            <h2 className="text-2xl font-bold mb-4 border-b border-white/10 pb-4">01. Live Simulation: End-to-End Execution</h2>
            <p className="text-muted text-lg leading-relaxed mb-6 max-w-3xl">
              When a driver sends evidence via WhatsApp, the system doesn't just save a photo. It orchestrates a multi-step validation process autonomously and replies to the driver instantly. <strong>Click the button below to see the data flow through the architecture.</strong>
            </p>
            <EndToEndSimulation />
          </div>

          <div className="animate-in opacity-0 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-accent">02. Backend Evidence</h2>
              <p className="text-muted text-lg leading-relaxed mb-6">
                While n8n handles the routing and AI API calls, the core truth lives in the database. I built a Python/Django endpoint to receive the structured data from the workflow, ensuring ACID transactions (<code>@transaction.atomic</code>) and strict error handling to prevent corrupted states.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl relative">
              <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/10">
                <span className="text-xs font-mono text-muted">views.py</span>
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