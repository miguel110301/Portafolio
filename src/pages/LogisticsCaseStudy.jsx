import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, GitBranch, Server, Database, Activity, Smartphone, CheckCheck, Webhook, BrainCircuit, ChevronRight, FileCheck2, Terminal } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import EvidenceCarousel from '../components/EvidenceCarousel';
import { useLanguage } from '../i18n';

const LOGISTICS_IMAGES = ['/proyectos/logisticsflow/1.png'];

const LOGISTICS_COPY = {
  es: {
    back: 'Volver_Al_Sistema',
    protocol: 'Arquitectura_y_Automatizacion',
    title: 'LogisticsFlow AI.',
    intro: 'Sistema productivo orientado a eventos que procesa mas de 500 validaciones logisticas al dia. Fue disenado con una separacion estricta de responsabilidades: n8n maneja la orquestacion, Django controla el modelo de datos y las reglas de negocio, y OpenAI Vision junto con Whisper se encargan de la clasificacion multimodal de evidencia, manteniendo cada capa testeable y reemplazable.',
    evidenceTitle: 'Evidencia del flujo',
    summary: [
      { label: 'Orquestador', value: 'n8n', icon: GitBranch },
      { label: 'Backend', value: 'Django (Python)', icon: Server },
      { label: 'Motor IA', value: 'OpenAI Vision', icon: Activity },
      { label: 'Interfaz', value: 'WhatsApp API', icon: Smartphone },
    ],
    decisionsTitle: 'Decisiones clave de ingenieria',
    decisions: [
      {
        decision: 'n8n sobre orquestacion custom',
        why: 'Construir un motor de workflows propio introducia costo de mantenimiento sin ventaja competitiva real. n8n nos dio trazabilidad visual, reintentos integrados y gestion de webhooks; el equipo podia rastrear fallos en segundos en lugar de leer logs durante minutos.',
        tradeoff: 'Aceptado: dependencia del proveedor y menor flexibilidad en ramas muy complejas.',
      },
      {
        decision: 'API sincronica en Django sobre cola de eventos',
        why: 'Con 500 requests por dia, la complejidad operativa de Kafka o RabbitMQ no se justificaba. Una API sincronica con proteccion de race conditions mediante select_for_update() nos dio garantias ACID sin sobrecarga de infraestructura.',
        tradeoff: 'Aceptado: techo de escalado horizontal. Se revisa al multiplicar por 10 el volumen.',
      },
      {
        decision: 'WhatsApp Business API sobre SMS',
        why: 'El 100% de los operadores logisticos ya usaba WhatsApp a diario. El costo de adopcion fue cero. La API aporto envio de evidencia, webhooks de estado y mensajes template, funciones que SMS no iguala por el mismo costo.',
        tradeoff: 'Aceptado: dependencia de la plataforma Meta y proceso de aprobacion para templates.',
      },
    ],
    traceTitle: '01. Trazado de ejecucion en vivo',
    traceDescription: 'Cuando un chofer envia evidencia por WhatsApp, el sistema no solo guarda una foto. Orquesta una validacion de varios pasos de forma autonoma y responde al instante. Observa como muta el payload a traves de toda la arquitectura.',
    backendTitle: '02. Evidencia backend',
    backendDescription: 'Mientras n8n se encarga del routing y de las llamadas a APIs de IA, la fuente de verdad vive en la base de datos. Construí un endpoint en Python/Django para recibir la data estructurada del workflow, garantizando transacciones ACID con <code>@transaction.atomic</code> y manejo de errores estricto para evitar estados corruptos.',
    simulation: {
      payloads: [
        '{\n  "estado": "esperando_evento"\n}',
        '{\n  "evento": "mensaje.recibido",\n  "tipo_media": "image/jpeg",\n  "tamano": "2.4MB"\n}',
        '{\n  "ocr_engine": "activo",\n  "extraido": "PKG-892",\n  "firma": true\n}',
        '{\n  "db_action": "INSERT",\n  "table": "delivery_ticket",\n  "status": 201\n}',
        '{\n  "notificacion": "enviada",\n  "canal": "WhatsApp"\n}',
      ],
      driverUi: 'Interfaz_Chofer',
      messageOne: 'Entregando paquete #892.',
      messageTwo: 'Ticket validado. Paquete #892 registrado en el ERP.',
      running: 'Ejecutando flujo...',
      trigger: 'Disparar webhook',
      orchestrator: 'Orquestador n8n',
      catchEvent: 'Capturar evento',
      ocrExtraction: 'Extraccion OCR',
      apiRequest: 'Solicitud API',
      livePayload: 'Payload_En_Vivo.json',
      status: 'Estado',
      signature: 'Firma',
      delivered: 'ENTREGADO',
      waiting: 'Esperando sincronizacion...',
    },
    code: `# Vista de Django que procesa el payload validado
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import transaction
from .models import DeliveryTicket, Driver

class TicketIngestionView(APIView):
    @transaction.atomic
    def post(self, request):
        try:
            data = request.data

            # 1. La validacion queda desacoplada de n8n
            if not data.get('has_signature'):
                return Response({"error": "Falta la firma"}, status=400)

            # 2. Interaccion segura con base de datos
            driver = Driver.objects.get(phone=data.get('driver_phone'))
            ticket, created = DeliveryTicket.objects.update_or_create(
                ticket_id=data.get('ticket_number'),
                defaults={'driver': driver, 'status': 'DELIVERED'}
            )

            # 3. El exito activa el nodo de respuesta por WhatsApp en n8n
            return Response({"status": "ok", "id": ticket.id}, status=201)

        except Exception as e:
            return Response({"error": str(e)}, status=500)`,
  },
  en: {
    back: 'System_Return',
    protocol: 'Architecture_&_Automation',
    title: 'LogisticsFlow AI.',
    intro: 'Production event-driven system processing 500+ daily logistics validations. It is designed around a strict separation of concerns: n8n handles orchestration, Django owns the data model and business rules, and OpenAI Vision plus Whisper handle multimodal evidence classification, keeping every layer independently testable and replaceable.',
    evidenceTitle: 'Workflow Evidence',
    summary: [
      { label: 'Orchestrator', value: 'n8n', icon: GitBranch },
      { label: 'Backend', value: 'Django (Python)', icon: Server },
      { label: 'AI Engine', value: 'OpenAI Vision', icon: Activity },
      { label: 'Interface', value: 'WhatsApp API', icon: Smartphone },
    ],
    decisionsTitle: 'Key Engineering Decisions',
    decisions: [
      {
        decision: 'n8n over custom orchestration',
        why: 'Building a custom workflow engine would add maintenance overhead with no real competitive advantage. n8n gave visual debuggability, built-in retries, and webhook management; the team could trace failures in seconds instead of reading logs for minutes.',
        tradeoff: 'Accepted: vendor dependency and less flexibility in very complex branches.',
      },
      {
        decision: 'Synchronous Django API over an event queue',
        why: 'At 500 requests per day, the operational complexity of Kafka or RabbitMQ was unjustified. A synchronous Django API with select_for_update() race condition protection gave ACID guarantees with zero infrastructure overhead.',
        tradeoff: 'Accepted: horizontal scaling ceiling. Revisit at 10x the volume.',
      },
      {
        decision: 'WhatsApp Business API over SMS',
        why: 'All logistics operators already used WhatsApp daily. Adoption cost was zero. The API provided media uploads, status webhooks, and template messaging, features SMS cannot match at the same price point.',
        tradeoff: 'Accepted: Meta platform dependency and approval flow for templates.',
      },
    ],
    traceTitle: '01. Live Execution Trace',
    traceDescription: 'When a driver sends evidence through WhatsApp, the system does not just save a photo. It orchestrates a multi-step validation autonomously and replies instantly. Watch the payload mutate across the full architecture.',
    backendTitle: '02. Backend Evidence',
    backendDescription: 'While n8n handles routing and AI API calls, the source of truth lives in the database. I built a Python/Django endpoint to receive the structured workflow payload, guaranteeing ACID transactions with <code>@transaction.atomic</code> and strict error handling to prevent corrupted states.',
    simulation: {
      payloads: [
        '{\n  "status": "awaiting_event"\n}',
        '{\n  "event": "message.received",\n  "media_type": "image/jpeg",\n  "size": "2.4MB"\n}',
        '{\n  "ocr_engine": "active",\n  "extracted": "PKG-892",\n  "signature": true\n}',
        '{\n  "db_action": "INSERT",\n  "table": "delivery_ticket",\n  "status": 201\n}',
        '{\n  "notification": "sent",\n  "channel": "WhatsApp"\n}',
      ],
      driverUi: 'Driver_UI',
      messageOne: 'Delivering package #892.',
      messageTwo: 'Ticket validated. Package #892 registered in ERP.',
      running: 'Executing Flow...',
      trigger: 'Trigger Webhook',
      orchestrator: 'n8n Orchestrator',
      catchEvent: 'Catch Event',
      ocrExtraction: 'OCR Extraction',
      apiRequest: 'API Request',
      livePayload: 'Live_Payload.json',
      status: 'Status',
      signature: 'Signature',
      delivered: 'DELIVERED',
      waiting: 'Awaiting Sync...',
    },
    code: `# Django view handling the validated payload
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import transaction
from .models import DeliveryTicket, Driver

class TicketIngestionView(APIView):
    @transaction.atomic
    def post(self, request):
        try:
            data = request.data

            # 1. Validation remains decoupled from n8n
            if not data.get('has_signature'):
                return Response({"error": "Missing signature"}, status=400)

            # 2. Secure database interaction
            driver = Driver.objects.get(phone=data.get('driver_phone'))
            ticket, created = DeliveryTicket.objects.update_or_create(
                ticket_id=data.get('ticket_number'),
                defaults={'driver': driver, 'status': 'DELIVERED'}
            )

            # 3. Success triggers the WhatsApp reply node in n8n
            return Response({"status": "success", "id": ticket.id}, status=201)

        except Exception as e:
            return Response({"error": str(e)}, status=500)`,
  },
};

function EndToEndSimulation({ copy }) {
  const [isRunning, setIsRunning] = useState(false);
  const [activePayload, setActivePayload] = useState(copy.simulation.payloads[0]);

  useEffect(() => {
    setActivePayload(copy.simulation.payloads[0]);
    setIsRunning(false);
  }, [copy]);

  const runSimulation = () => {
    if (isRunning || !window.anime) return;
    setIsRunning(true);

    window.anime.set('.wa-msg-1', { opacity: 0, translateY: 20, scale: 0.95 });
    window.anime.set('.wa-msg-2', { opacity: 0, translateY: 20, scale: 0.95 });
    window.anime.set('.db-row-new', { opacity: 0, translateX: -20, backgroundColor: 'rgba(34,197,94,0)' });
    window.anime.set('.node-glow', { boxShadow: '0 0 0px rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.1)', scale: 1 });

    const tl = window.anime.timeline({
      easing: 'easeOutExpo',
      complete: () => setIsRunning(false),
    });

    tl.add({
      targets: '.wa-msg-1',
      opacity: 1,
      translateY: 0,
      scale: 1,
      duration: 800,
      easing: 'easeOutElastic(1, .8)',
      begin: () => setActivePayload(copy.simulation.payloads[1]),
    });

    tl.add({
      targets: '#node-webhook',
      boxShadow: ['0 0 0px rgba(168,85,247,0)', '0 0 30px rgba(168,85,247,0.4)', '0 0 0px rgba(168,85,247,0)'],
      borderColor: ['rgba(255,255,255,0.1)', 'rgba(168,85,247,1)', 'rgba(255,255,255,0.1)'],
      scale: [1, 1.05, 1],
      duration: 1000,
    }, '+=400');

    tl.add({
      targets: '#node-ai',
      boxShadow: ['0 0 0px rgba(56,189,248,0)', '0 0 30px rgba(56,189,248,0.4)', '0 0 0px rgba(56,189,248,0)'],
      borderColor: ['rgba(255,255,255,0.1)', 'rgba(56,189,248,1)', 'rgba(255,255,255,0.1)'],
      scale: [1, 1.05, 1],
      duration: 1200,
      begin: () => setActivePayload(copy.simulation.payloads[2]),
    }, '+=200');

    tl.add({
      targets: '#node-django',
      boxShadow: ['0 0 0px rgba(34,197,94,0)', '0 0 30px rgba(34,197,94,0.4)', '0 0 0px rgba(34,197,94,0)'],
      borderColor: ['rgba(255,255,255,0.1)', 'rgba(34,197,94,1)', 'rgba(255,255,255,0.1)'],
      scale: [1, 1.05, 1],
      duration: 1000,
      begin: () => setActivePayload(copy.simulation.payloads[3]),
    }, '+=200');

    tl.add({
      targets: '.db-row-new',
      opacity: 1,
      translateX: 0,
      backgroundColor: ['rgba(34,197,94,0.3)', 'rgba(0,0,0,0)'],
      duration: 1200,
      easing: 'easeOutElastic(1, .8)',
    }, '-=400');

    tl.add({
      targets: '.wa-msg-2',
      opacity: 1,
      translateY: 0,
      scale: 1,
      duration: 800,
      easing: 'easeOutElastic(1, .8)',
      begin: () => setActivePayload(copy.simulation.payloads[4]),
    }, '+=400');
  };

  return (
    <div className="w-full bg-[#0a0a0a] rounded-sm border border-white/10 shadow-2xl p-4 md:p-8 font-sans my-12 overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        <div className="bg-[#0b141a] rounded-sm border border-white/10 overflow-hidden flex flex-col h-[360px] md:h-[420px] shadow-lg">
          <div className="bg-[#202c33] p-3 flex items-center gap-3 border-b border-white/5">
            <div className="w-8 h-8 bg-emerald-600 rounded-sm flex items-center justify-center text-white"><Smartphone size={16} /></div>
            <div><h4 className="font-bold text-xs text-white uppercase tracking-wider">{copy.simulation.driverUi}</h4></div>
          </div>
          <div className="p-4 flex-1 flex flex-col gap-3 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-black/40 text-xs overflow-y-auto">
            <div className="wa-msg-1 opacity-0 self-end bg-[#005c4b] text-[#e9edef] p-2.5 rounded-xl rounded-tr-none w-[85%] shadow-sm origin-bottom-right">
              <div className="w-full h-16 bg-black/40 rounded-sm flex items-center justify-center border border-white/5 mb-1 relative overflow-hidden">
                <FileCheck2 size={24} className="text-white/50" />
              </div>
              <p>{copy.simulation.messageOne}</p>
              <div className="text-[9px] text-right text-gray-400 mt-1 flex justify-end items-center gap-1">14:05 <CheckCheck size={12} className="text-[#53bdeb]" /></div>
            </div>

            <div className="wa-msg-2 opacity-0 self-start bg-[#202c33] text-[#e9edef] p-2.5 rounded-xl rounded-tl-none w-[85%] shadow-sm origin-bottom-left mt-auto">
              <p><strong>{copy.simulation.messageTwo}</strong></p>
              <div className="text-[9px] text-right text-gray-400 mt-1">14:05</div>
            </div>
          </div>
          <div className="p-3 bg-[#202c33] border-t border-white/5">
            <button onClick={runSimulation} disabled={isRunning} className="w-full bg-emerald-600 disabled:bg-emerald-800 text-white py-2 rounded-sm font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2">
              {isRunning ? copy.simulation.running : copy.simulation.trigger}
            </button>
          </div>
        </div>

        <div className="hidden lg:flex flex-col gap-4 h-full">
          <div className="text-center mb-2"><h4 className="text-[10px] font-bold text-muted uppercase tracking-[0.3em]">{copy.simulation.orchestrator}</h4></div>

          <div id="node-webhook" className="node-glow relative p-3 rounded-sm border border-white/10 bg-[#121212] flex items-center gap-4">
            <Webhook className="text-purple-400" size={20} />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">1. Webhook</div>
              <div className="text-[9px] text-muted font-mono">{copy.simulation.catchEvent}</div>
            </div>
          </div>

          <div className="flex justify-center"><ChevronRight className="text-white/10 rotate-90 lg:rotate-0" size={16} /></div>

          <div id="node-ai" className="node-glow relative p-3 rounded-sm border border-white/10 bg-[#121212] flex items-center gap-4">
            <BrainCircuit className="text-accent" size={20} />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">2. AI Vision</div>
              <div className="text-[9px] text-muted font-mono">{copy.simulation.ocrExtraction}</div>
            </div>
          </div>

          <div className="flex justify-center"><ChevronRight className="text-white/10 rotate-90 lg:rotate-0" size={16} /></div>

          <div id="node-django" className="node-glow relative p-3 rounded-sm border border-white/10 bg-[#121212] flex items-center gap-4">
            <Server className="text-green-400" size={20} />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">3. {copy.simulation.apiRequest}</div>
              <div className="text-[9px] text-muted font-mono">POST /django</div>
            </div>
          </div>

          <div className="mt-auto bg-[#050505] border border-white/10 rounded-sm overflow-hidden h-28 flex flex-col shadow-inner">
            <div className="bg-[#111] px-3 py-1 border-b border-white/5 flex items-center gap-2">
              <Terminal size={10} className="text-accent" />
              <span className="text-[9px] font-mono text-muted uppercase tracking-widest">{copy.simulation.livePayload}</span>
            </div>
            <pre className="p-3 text-[9px] font-mono text-green-400 overflow-hidden">
              {activePayload}
            </pre>
          </div>
        </div>

        <div className="hidden lg:flex flex-col h-[420px] rounded-sm border border-white/10 overflow-hidden shadow-lg bg-[#121212]">
          <div className="bg-white/5 p-3 flex items-center gap-3 border-b border-white/5">
            <div className="w-8 h-8 bg-blue-600/20 border border-blue-500/30 rounded-sm flex items-center justify-center text-blue-400"><Database size={16} /></div>
            <div><h4 className="font-bold text-xs text-white uppercase tracking-wider">PostgreSQL</h4></div>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-start overflow-hidden">
            <table className="w-full text-left text-[10px] font-mono">
              <thead>
                <tr className="text-muted border-b border-white/10">
                  <th className="pb-2">ID</th>
                  <th className="pb-2">{copy.simulation.status}</th>
                  <th className="pb-2">{copy.simulation.signature}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5 text-white/40">
                  <td className="py-3">PKG-890</td>
                  <td className="py-3"><span className="text-green-400/50 bg-green-400/5 px-1 py-0.5 rounded-sm">{copy.simulation.delivered}</span></td>
                  <td className="py-3">true</td>
                </tr>
                <tr className="border-b border-white/5 text-white/40">
                  <td className="py-3">PKG-891</td>
                  <td className="py-3"><span className="text-green-400/50 bg-green-400/5 px-1 py-0.5 rounded-sm">{copy.simulation.delivered}</span></td>
                  <td className="py-3">true</td>
                </tr>
                <tr className="db-row-new opacity-0 border-b border-white/5 text-white">
                  <td className="py-3 text-accent font-bold">PKG-892</td>
                  <td className="py-3"><span className="text-green-400 bg-green-400/10 px-1 py-0.5 rounded-sm font-bold shadow-[0_0_10px_rgba(34,197,94,0.2)]">{copy.simulation.delivered}</span></td>
                  <td className="py-3 font-bold text-accent">true</td>
                </tr>
              </tbody>
            </table>
            {!isRunning && activePayload === copy.simulation.payloads[0] && (
              <div className="text-center mt-12 text-[10px] text-muted font-mono uppercase tracking-widest animate-pulse">{copy.simulation.waiting}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LogisticsCaseStudy() {
  const { language } = useLanguage();
  const copy = LOGISTICS_COPY[language];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-primary selection:bg-accent/30 font-sans pb-24 pt-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <nav className="mb-16">
          <Link to="/#projects" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted hover:text-accent transition-colors">
            <ArrowLeft size={14} /> {copy.back}
          </Link>
        </nav>

        <header className="mb-16">
          <div className="mb-6">
            <span className="protocol-label">{copy.protocol}</span>
          </div>
          <h1 className="section-title mb-6">{copy.title}</h1>
          <p className="text-xl text-muted leading-relaxed max-w-3xl">
            {copy.intro}
          </p>
        </header>

        <div className="mb-16">
          <EvidenceCarousel images={LOGISTICS_IMAGES} title={copy.evidenceTitle} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {copy.summary.map((item, i) => (
            <div key={i} className="glass-panel p-5 rounded-sm border border-white/5 hover:border-white/20 transition-colors bg-[#0a0a0a]">
              <item.icon className="text-accent mb-3" size={20} />
              <span className="tech-subtitle !mb-1">{item.label}</span>
              <div className="font-bold text-white uppercase tracking-tight">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="mb-24 glass-panel p-8 md:p-10 rounded-sm border border-white/5">
          <h2 className="item-title mb-8 border-b border-white/10 pb-4">{copy.decisionsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {copy.decisions.map((item, i) => (
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
            <h2 className="item-title mb-6 border-b border-white/10 pb-4">{copy.traceTitle}</h2>
            <p className="text-muted text-lg leading-relaxed mb-8 max-w-3xl">
              {copy.traceDescription}
            </p>
            <EndToEndSimulation copy={copy} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="item-title mb-6 border-b border-white/10 pb-4 text-accent">{copy.backendTitle}</h2>
              <p className="text-muted text-lg leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: copy.backendDescription }} />
            </div>

            <div className="rounded-sm overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl relative">
              <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/10">
                <span className="tech-subtitle !mb-0 !tracking-widest">views.py</span>
              </div>
              <div className="text-xs md:text-sm font-mono text-gray-300">
                <SyntaxHighlighter language="python" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: '1.5rem', margin: 0 }}>
                  {copy.code}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
