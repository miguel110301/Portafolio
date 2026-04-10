import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Bot, Check, X, RefreshCw, Send, FileText, Server, TerminalSquare, Activity, Zap, Mail, Calendar, AlertTriangle } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from 'framer-motion';
import EvidenceCarousel from '../components/EvidenceCarousel';
import { useLanguage } from '../i18n';

const GAMMA_IMAGES = ['/proyectos/gamma/1.png'];

const GAMMA_COPY = {
  es: {
    back: 'Volver_Al_Sistema',
    protocol: 'Automatizacion_Asincrona',
    title: 'Gamma Agent.',
    intro: 'Agente de IA totalmente asincrono construido alrededor de un patron Human-in-the-Loop. El sistema ingiere datos crudos, genera presentaciones estructuradas via Gamma API, pausa la ejecucion para esperar aprobacion humana usando persistencia en memoria y luego reanuda para programar el envio por correo sin intervencion manual.',
    evidenceTitle: 'Evidencia del flujo',
    summary: [
      { label: 'Interfaz', value: 'Bot de Telegram', icon: Bot },
      { label: 'Generacion', value: 'Gamma API', icon: RefreshCw },
      { label: 'Aprobacion', value: 'Human-in-the-Loop', icon: Check },
      { label: 'Ejecucion', value: 'Tareas Programadas', icon: Clock },
    ],
    decisionsTitle: 'Decisiones clave de ingenieria',
    decisionsSubtitle: 'Por que lo construi asi y que tradeoffs acepte conscientemente.',
    decisions: [
      {
        decision: 'Estado en memoria sobre base de datos',
        why: 'Persistir el estado de aprobacion en una base de datos exigia un servicio adicional, migraciones y manejo de conexiones. $getWorkflowStaticData de n8n aporto persistencia dentro del proceso entre ejecuciones con cero infraestructura extra para un caso single-tenant.',
        tradeoff: 'Aceptado: el estado se pierde si el proceso de n8n reinicia. Es aceptable con una ventana de aprobacion de 24h y bajo costo de recuperacion.',
      },
      {
        decision: 'Human-in-the-loop sobre automatizacion total',
        why: 'Enviar presentaciones de forma completamente autonoma arriesga errores de contenido o formato frente al cliente. Un checkpoint obligatorio por Telegram elimina ese riesgo con una friccion minima.',
        tradeoff: 'Aceptado: requiere que exista una persona disponible dentro de la ventana de aprobacion. Es una decision deliberada, no un bug.',
      },
      {
        decision: 'Programacion diferida sobre envio inmediato',
        why: 'Enviar correos justo despues de aprobar ignora el mejor horario de entrega. Programar el job para una hora configurada mejora aperturas y deja una ventana de cancelacion al operador.',
        tradeoff: 'Aceptado: agrega complejidad en la cola de jobs. Se justifica por la mejora medible en performance de entrega.',
      },
    ],
    simulationTitle: '01. Simulacion Human-in-the-Loop',
    simulationDescription: 'El workflow pausa por completo la ejecucion despues de generar el documento: guarda estado en memoria y espera una decision humana via Telegram. Dispara el flujo, luego aprueba o rechaza para ver como muta el estado del servidor en cada etapa.',
    persistenceTitle: '02. Arquitectura de persistencia',
    persistenceDescription: 'Mantener contexto conversacional a traves de mensajes separados por horas o dias exige un diseno de estado muy solido. Con <code>$getWorkflowStaticData</code> estructure una capa de persistencia en memoria que sobrevive entre ejecuciones sin infraestructura externa.',
    code: `// Control de estado basado en memoria
if (payload.message) {
  const chatId = payload.message.chat.id.toString();
  const context = staticData[chatId];

  // Intercepta si seguimos esperando aprobacion humana
  if (context && context.status === 'WAITING_APPROVAL') {
    return [{ json: { type: 'resume_workflow', payload, context } }];
  }

  // De lo contrario inicia una nueva generacion
  return [{ json: { type: 'new_generation', payload } }];
}`,
    simulation: {
      steps: [
        { id: 0, label: 'Inactivo', color: 'text-white/30' },
        { id: 1, label: 'Parseando entrada', color: 'text-yellow-400' },
        { id: 2, label: 'Procesando IA', color: 'text-blue-400' },
        { id: 3, label: 'Generando PDF', color: 'text-purple-400' },
        { id: 4, label: 'Esperando aprobacion', color: 'text-accent' },
        { id: 5, label: 'Programando', color: 'text-green-400' },
        { id: 6, label: 'Completo', color: 'text-green-400' },
        { id: 7, label: 'Rechazado', color: 'text-red-400' },
      ],
      stateByStep: {
        0: `{\n  "sesiones": 0,\n  "contextos_activos": {},\n  "jobs_programados": 0\n}`,
        1: `{\n  "sesiones": 1,\n  "contextos_activos": {\n    "chat_8821": {\n      "estado": "PARSEANDO_ENTRADA",\n      "email": "cfo@acme.com",\n      "slides": 10,\n      "timestamp": "14:02:11Z"\n    }\n  }\n}`,
        2: `{\n  "sesiones": 1,\n  "contextos_activos": {\n    "chat_8821": {\n      "estado": "PROCESANDO_IA",\n      "model": "gpt-4o",\n      "tokens_usados": 1842,\n      "resumen_contexto": "deck de ventas Q3..."\n    }\n  }\n}`,
        3: `{\n  "sesiones": 1,\n  "contextos_activos": {\n    "chat_8821": {\n      "estado": "GENERANDO_PRESENTACION",\n      "gamma_job_id": "gen_9f2a1c",\n      "slides": 10,\n      "poll_attempts": 3\n    }\n  }\n}`,
        4: `{\n  "sesiones": 1,\n  "contextos_activos": {\n    "chat_8821": {\n      "estado": "ESPERANDO_APROBACION",\n      "documento": "Q3_Executive_Report.pdf",\n      "gamma_url": "https://gamma.app/...",\n      "destinatario": "cfo@acme.com",\n      "expira_en": "24h",\n      "created_at": "14:02:38Z"\n    }\n  }\n}`,
        5: `{\n  "sesiones": 1,\n  "contextos_activos": {\n    "chat_8821": {\n      "estado": "PROGRAMANDO_ENVIO",\n      "aprobado_por": "manager",\n      "send_at": "2026-03-25T08:00:00Z",\n      "destinatario": "cfo@acme.com"\n    }\n  }\n}`,
        6: `{\n  "sesiones": 1,\n  "contextos_activos": {},\n  "jobs_programados": 1,\n  "ultimo_run": {\n    "estado": "COMPLETADO",\n    "documento": "Q3_Executive_Report.pdf",\n    "send_at": "2026-03-25T08:00:00Z",\n    "destinatario": "cfo@acme.com"\n  }\n}`,
        7: `{\n  "sesiones": 1,\n  "contextos_activos": {},\n  "ultimo_run": {\n    "estado": "RECHAZADO",\n    "documento": "Q3_Executive_Report.pdf",\n    "rejected_at": "14:05:12Z",\n    "solicitante_notificado": true\n  }\n}`,
      },
      processing: 'procesando...',
      waitingApproval: 'esperando aprobacion',
      online: 'online',
      stepLabel: 'Paso',
      userMessage: 'Genera el reporte ejecutivo de Q3 con datos de ventas. Envia a cfo@acme.com, 10 slides.',
      analyzing: 'Analizando datos con GPT-4o...',
      generating: 'Generando presentacion via Gamma API...',
      ready: 'Q3_Executive_Report.pdf listo - 10 slides.',
      recipient: 'Destinatario: cfo@acme.com',
      approveQuestion: 'Aprobar envio programado?',
      approve: 'Aprobar',
      reject: 'Rechazar',
      approved: 'Aprobado',
      rejected: 'Rechazado',
      scheduling: 'Programando envio para 2026-03-25 08:00...',
      done: 'Envio programado para 25 Mar · 8:00 AM. El servidor lo ejecutara automaticamente sin intervencion adicional.',
      rejectedNotice: 'Solicitud rechazada. Contexto eliminado de memoria. Solicitante notificado.',
      restart: 'Reiniciar workflow',
      trigger: 'Disparar workflow',
      paused: 'Workflow en pausa - esperando decision humana...',
      background: 'Procesando en segundo plano...',
      stateTitle: 'Estado en memoria',
      stateSubtitle: "$getWorkflowStaticData('global')",
      stateDescription: 'n8n persiste el contexto del workflow en staticData. Observa como muta el estado conforme avanza el flujo:',
      timelineLabels: ['Parse', 'IA', 'Gen', 'Espera', 'Prog', 'Listo'],
    },
  },
  en: {
    back: 'System_Return',
    protocol: 'Asynchronous_Automation',
    title: 'Gamma Agent.',
    intro: 'Fully asynchronous AI agent built around a Human-in-the-Loop pattern. The system ingests raw data, generates structured presentations via Gamma API, pauses execution to wait for human approval using in-memory persistence, then resumes to schedule deferred email delivery with zero manual intervention.',
    evidenceTitle: 'Workflow Evidence',
    summary: [
      { label: 'Interface', value: 'Telegram Bot', icon: Bot },
      { label: 'Generation', value: 'Gamma API', icon: RefreshCw },
      { label: 'Approval', value: 'Human-in-the-Loop', icon: Check },
      { label: 'Execution', value: 'Scheduled Jobs', icon: Clock },
    ],
    decisionsTitle: 'Key Engineering Decisions',
    decisionsSubtitle: 'Why I built it this way and what I consciously traded off.',
    decisions: [
      {
        decision: 'In-memory state over a database',
        why: 'Persisting approval state to a database would require an additional service, migrations, and connection management. n8n $getWorkflowStaticData gave in-process persistence across executions with zero extra infrastructure for a single-tenant use case.',
        tradeoff: 'Accepted: state is lost if the n8n process restarts. Acceptable with a 24-hour approval window and low recovery cost.',
      },
      {
        decision: 'Human-in-the-loop over full automation',
        why: 'Sending presentations fully autonomously risks incorrect or badly formatted content reaching the client. A mandatory Telegram approval checkpoint removes that risk with minimal friction.',
        tradeoff: 'Accepted: requires a human to be available within the approval window. Deliberate choice, not a bug.',
      },
      {
        decision: 'Deferred scheduling over immediate send',
        why: 'Sending emails immediately after approval ignores optimal delivery timing. Scheduling the job for a configured hour improves open rates and gives the operator a cancellation window.',
        tradeoff: 'Accepted: adds queueing complexity. Justified by measurable delivery performance gains.',
      },
    ],
    simulationTitle: '01. Human-in-the-Loop Simulation',
    simulationDescription: 'The workflow fully pauses execution after generating the document: it stores state in memory and waits for a human decision through Telegram. Trigger the flow, then approve or reject to see how server state mutates at every stage.',
    persistenceTitle: '02. Persistence Architecture',
    persistenceDescription: 'Maintaining conversation context across messages separated by hours or days requires a solid state design. With <code>$getWorkflowStaticData</code> I structured an in-memory persistence layer that survives executions without external infrastructure.',
    code: `// State control based on memory
if (payload.message) {
  const chatId = payload.message.chat.id.toString();
  const context = staticData[chatId];

  // Intercept if we are still waiting for human approval
  if (context && context.status === 'WAITING_APPROVAL') {
    return [{ json: { type: 'resume_workflow', payload, context } }];
  }

  // Otherwise start a brand new generation
  return [{ json: { type: 'new_generation', payload } }];
}`,
    simulation: {
      steps: [
        { id: 0, label: 'Idle', color: 'text-white/30' },
        { id: 1, label: 'Parsing Input', color: 'text-yellow-400' },
        { id: 2, label: 'AI Processing', color: 'text-blue-400' },
        { id: 3, label: 'Generating PDF', color: 'text-purple-400' },
        { id: 4, label: 'Awaiting Approval', color: 'text-accent' },
        { id: 5, label: 'Scheduling', color: 'text-green-400' },
        { id: 6, label: 'Complete', color: 'text-green-400' },
        { id: 7, label: 'Rejected', color: 'text-red-400' },
      ],
      stateByStep: {
        0: `{\n  "sessions": 0,\n  "active_contexts": {},\n  "scheduled_jobs": 0\n}`,
        1: `{\n  "sessions": 1,\n  "active_contexts": {\n    "chat_8821": {\n      "status": "PARSING_INPUT",\n      "email": "cfo@acme.com",\n      "slides": 10,\n      "timestamp": "14:02:11Z"\n    }\n  }\n}`,
        2: `{\n  "sessions": 1,\n  "active_contexts": {\n    "chat_8821": {\n      "status": "AI_PROCESSING",\n      "model": "gpt-4o",\n      "tokens_used": 1842,\n      "context_summary": "Q3 sales deck..."\n    }\n  }\n}`,
        3: `{\n  "sessions": 1,\n  "active_contexts": {\n    "chat_8821": {\n      "status": "GENERATING_PRESENTATION",\n      "gamma_job_id": "gen_9f2a1c",\n      "slides": 10,\n      "poll_attempts": 3\n    }\n  }\n}`,
        4: `{\n  "sessions": 1,\n  "active_contexts": {\n    "chat_8821": {\n      "status": "WAITING_APPROVAL",\n      "document": "Q3_Executive_Report.pdf",\n      "gamma_url": "https://gamma.app/...",\n      "recipient": "cfo@acme.com",\n      "expires_in": "24h",\n      "created_at": "14:02:38Z"\n    }\n  }\n}`,
        5: `{\n  "sessions": 1,\n  "active_contexts": {\n    "chat_8821": {\n      "status": "SCHEDULING_DELIVERY",\n      "approved_by": "manager",\n      "send_at": "2026-03-25T08:00:00Z",\n      "recipient": "cfo@acme.com"\n    }\n  }\n}`,
        6: `{\n  "sessions": 1,\n  "active_contexts": {},\n  "scheduled_jobs": 1,\n  "last_run": {\n    "status": "COMPLETED",\n    "document": "Q3_Executive_Report.pdf",\n    "send_at": "2026-03-25T08:00:00Z",\n    "recipient": "cfo@acme.com"\n  }\n}`,
        7: `{\n  "sessions": 1,\n  "active_contexts": {},\n  "last_run": {\n    "status": "REJECTED",\n    "document": "Q3_Executive_Report.pdf",\n    "rejected_at": "14:05:12Z",\n    "requester_notified": true\n  }\n}`,
      },
      processing: 'processing...',
      waitingApproval: 'waiting for approval',
      online: 'online',
      stepLabel: 'Step',
      userMessage: 'Generate the Q3 executive report with sales data. Send to cfo@acme.com, 10 slides.',
      analyzing: 'Analyzing data with GPT-4o...',
      generating: 'Generating presentation via Gamma API...',
      ready: 'Q3_Executive_Report.pdf ready - 10 slides.',
      recipient: 'Recipient: cfo@acme.com',
      approveQuestion: 'Approve scheduled delivery?',
      approve: 'Approve',
      reject: 'Reject',
      approved: 'Approved',
      rejected: 'Rejected',
      scheduling: 'Scheduling delivery for 2026-03-25 08:00...',
      done: 'Delivery scheduled for Mar 25 · 8:00 AM. The server will execute it automatically with zero intervention required.',
      rejectedNotice: 'Request rejected. Context cleared from memory. Requester notified.',
      restart: 'Restart Workflow',
      trigger: 'Trigger Workflow',
      paused: 'Workflow paused - waiting for human decision...',
      background: 'Processing in background...',
      stateTitle: 'In-Memory State',
      stateSubtitle: "$getWorkflowStaticData('global')",
      stateDescription: 'n8n persists workflow context in staticData. Watch the state mutate as the workflow progresses:',
      timelineLabels: ['Parse', 'AI', 'Gen', 'Wait', 'Sched', 'Done'],
    },
  },
};

function AsynchronousSimulation({ copy }) {
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setStep(0);
    setIsRunning(false);
  }, [copy]);

  const currentStep = copy.simulation.steps.find((item) => item.id === step);

  const runDemo = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setStep(1);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStep(2);
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setStep(3);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setStep(4);
    setIsRunning(false);
  };

  const handleApprove = async () => {
    if (step !== 4) return;
    setIsRunning(true);
    setStep(5);
    await new Promise((resolve) => setTimeout(resolve, 1500));
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

  const isIdle = step === 0;
  const isDone = step === 6 || step === 7;

  return (
    <div className="w-full bg-[#0a0a0a] rounded-sm border border-white/10 shadow-2xl p-4 md:p-6 font-sans">
      <div className="mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {step > 0 && step < 7 && !isDone && <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />}
            {isDone && step === 6 && <span className="w-1.5 h-1.5 rounded-full bg-green-400" />}
            {isDone && step === 7 && <span className="w-1.5 h-1.5 rounded-full bg-red-400" />}
            <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${currentStep?.color}`}>
              {currentStep?.label}
            </span>
          </div>
          <span className="text-[10px] font-mono text-white/20">
            {copy.simulation.stepLabel} {step} / 6
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
        <div className="bg-[#1c1c1e] rounded-sm overflow-hidden border border-white/10 shadow-lg flex flex-col" style={{ minHeight: '420px' }}>
          <div className="bg-[#2c2c2e] p-3 flex items-center justify-between border-b border-white/5 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-background">
                <Bot size={16} />
              </div>
              <div>
                <h4 className="font-bold text-xs text-white uppercase tracking-wider">Gamma Agent</h4>
                <p className="text-[9px] text-accent font-mono">
                  {isRunning ? copy.simulation.processing : step === 4 ? copy.simulation.waitingApproval : copy.simulation.online}
                </p>
              </div>
            </div>
            {isRunning && <Activity size={12} className="text-accent animate-pulse" />}
          </div>

          <div className="p-4 flex flex-col gap-3 text-xs flex-1" style={{ background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://www.transparenttextures.com/patterns/cubes.png)' }}>
            <AnimatePresence>
              {step >= 1 && (
                <motion.div key="msg-user" initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="self-end bg-accent text-background p-2.5 rounded-xl rounded-tr-sm max-w-[80%] font-medium shadow-sm">
                  {copy.simulation.userMessage}
                </motion.div>
              )}

              {step >= 2 && (
                <motion.div key="msg-processing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="self-start bg-[#2c2c2e] text-white/70 p-2.5 rounded-xl rounded-tl-sm max-w-[75%] text-[10px] font-mono shadow-sm flex items-center gap-2">
                  <RefreshCw size={10} className="animate-spin text-accent shrink-0" />
                  {copy.simulation.analyzing}
                </motion.div>
              )}

              {step >= 3 && (
                <motion.div key="msg-generating" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="self-start bg-[#2c2c2e] text-white/70 p-2.5 rounded-xl rounded-tl-sm max-w-[75%] text-[10px] font-mono shadow-sm flex items-center gap-2">
                  <Zap size={10} className="text-purple-400 shrink-0" />
                  {copy.simulation.generating}
                </motion.div>
              )}

              {step >= 4 && (
                <motion.div key="msg-approval" initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', bounce: 0.4 }} className="self-start bg-[#2c2c2e] text-white p-3 rounded-xl rounded-tl-sm max-w-[90%] flex flex-col gap-3 shadow-md">
                  <p className="text-[11px]">
                    <strong>{copy.simulation.ready}</strong>
                  </p>
                  <div className="bg-[#1c1c1e] p-2 rounded-sm flex items-center gap-2 border border-white/5">
                    <FileText size={12} className="text-accent shrink-0" />
                    <span className="font-mono text-[9px] text-white/70">Q3_Executive_Report.pdf</span>
                    <span className="ml-auto text-[8px] text-accent font-mono">gamma.app ↗</span>
                  </div>
                  <div className="bg-[#1c1c1e] p-2 rounded-sm flex items-center gap-2 border border-white/5">
                    <Mail size={12} className="text-muted shrink-0" />
                    <span className="text-[9px] text-white/50">{copy.simulation.recipient}</span>
                  </div>
                  <p className="text-[10px] text-white/70 border-t border-white/10 pt-2">
                    {copy.simulation.approveQuestion}
                  </p>

                  {step === 4 && (
                    <div className="flex gap-2">
                      <button onClick={handleApprove} className="flex-1 bg-accent/10 hover:bg-accent/20 border border-accent/30 hover:border-accent/60 py-1.5 rounded-sm text-accent font-bold transition-all flex items-center justify-center gap-1.5 text-[9px] uppercase tracking-wider">
                        <Check size={10} /> {copy.simulation.approve}
                      </button>
                      <button onClick={handleReject} className="flex-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 py-1.5 rounded-sm text-red-400 font-bold transition-all flex items-center justify-center gap-1.5 text-[9px] uppercase tracking-wider">
                        <X size={10} /> {copy.simulation.reject}
                      </button>
                    </div>
                  )}

                  {step > 4 && (
                    <div className={`w-full border py-1.5 rounded-sm font-bold flex items-center justify-center gap-1.5 text-[9px] uppercase tracking-wider ${
                      step === 7
                        ? 'bg-red-500/10 border-red-500/20 text-red-400'
                        : 'bg-accent/10 border-accent/20 text-accent'
                    }`}>
                      {step === 7 ? <><X size={10} /> {copy.simulation.rejected}</> : <><Check size={10} /> {copy.simulation.approved}</>}
                    </div>
                  )}
                </motion.div>
              )}

              {step === 5 && (
                <motion.div key="msg-scheduling" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="self-start bg-[#2c2c2e] text-white/70 p-2.5 rounded-xl rounded-tl-sm max-w-[75%] text-[10px] font-mono flex items-center gap-2">
                  <Calendar size={10} className="text-green-400 shrink-0" />
                  {copy.simulation.scheduling}
                </motion.div>
              )}

              {step === 6 && (
                <motion.div key="msg-done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="self-start bg-[#2c2c2e] text-white p-2.5 rounded-xl rounded-tl-sm max-w-[85%] text-[11px] shadow-md">
                  {copy.simulation.done}
                </motion.div>
              )}

              {step === 7 && (
                <motion.div key="msg-rejected" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="self-start bg-[#2c2c2e] text-white p-2.5 rounded-xl rounded-tl-sm max-w-[85%] text-[11px] shadow-md">
                  <AlertTriangle size={12} className="text-red-400 inline mr-1" />
                  {copy.simulation.rejectedNotice}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-3 bg-[#1c1c1e] border-t border-white/5 shrink-0">
            {(isIdle || isDone) ? (
              <button onClick={isDone ? handleReset : runDemo} className="w-full bg-accent text-background py-2 rounded-sm font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2">
                {isDone ? <><RefreshCw size={12} /> {copy.simulation.restart}</> : <><Send size={12} /> {copy.simulation.trigger}</>}
              </button>
            ) : (
              <div className="text-[10px] font-mono text-muted text-center py-1 animate-pulse">
                {step === 4 ? copy.simulation.paused : copy.simulation.background}
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:flex bg-[#121212] rounded-sm border border-white/10 overflow-hidden flex-col shadow-lg relative" style={{ minHeight: '420px' }}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none" />

          <div className="bg-white/5 p-3 flex items-center gap-3 border-b border-white/5 relative z-10 shrink-0">
            <div className="w-8 h-8 bg-purple-500/20 rounded-sm border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Server size={16} />
            </div>
            <div>
              <h4 className="font-bold text-xs text-white uppercase tracking-wider">{copy.simulation.stateTitle}</h4>
              <p className="text-[9px] text-muted font-mono">{copy.simulation.stateSubtitle}</p>
            </div>
          </div>

          <div className="p-4 flex flex-col relative z-10 flex-1 overflow-hidden">
            <p className="text-muted text-[10px] mb-3 leading-relaxed shrink-0">
              {copy.simulation.stateDescription}
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
                    {copy.simulation.stateByStep[step]}
                  </motion.pre>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 shrink-0">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div key={index} className="flex flex-col items-center gap-1">
                  <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    step === index ? 'bg-accent scale-125 shadow-[0_0_8px_rgba(56,189,248,0.8)]' :
                    step > index ? 'bg-accent/50' :
                    step === 7 && index <= 4 ? 'bg-red-400/50' :
                    'bg-white/10'
                  }`} />
                  <span className="text-[7px] font-mono text-white/20">
                    {copy.simulation.timelineLabels[index - 1]}
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

export default function GammaCaseStudy() {
  const { language } = useLanguage();
  const copy = GAMMA_COPY[language];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-primary selection:bg-accent/30 font-sans pb-24 pt-12 relative overflow-hidden">
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
          <EvidenceCarousel images={GAMMA_IMAGES} title={copy.evidenceTitle} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {copy.summary.map((item, i) => (
            <div key={i} className="glass-panel p-5 rounded-sm border border-white/5 hover:border-white/20 transition-colors bg-[#0a0a0a]">
              <item.icon className="text-accent mb-3" size={20} />
              <span className="tech-subtitle !mb-1">{item.label}</span>
              <div className="font-bold text-white uppercase tracking-tight">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="mb-24 glass-panel p-8 md:p-10 rounded-sm border border-white/5">
          <h2 className="item-title mb-2">{copy.decisionsTitle}</h2>
          <p className="text-muted text-sm mb-8 font-mono">{copy.decisionsSubtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {copy.decisions.map((item, i) => (
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
            <h2 className="item-title mb-6 border-b border-white/10 pb-4">{copy.simulationTitle}</h2>
            <p className="text-muted text-lg leading-relaxed mb-6 max-w-3xl">
              {copy.simulationDescription}
            </p>
            <AsynchronousSimulation copy={copy} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="item-title mb-6 border-b border-white/10 pb-4 text-accent">{copy.persistenceTitle}</h2>
              <p className="text-muted text-lg leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: copy.persistenceDescription }} />
            </div>
            <div className="rounded-sm overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl relative z-10">
              <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/10">
                <span className="tech-subtitle !mb-0 !tracking-widest">state_interceptor.js</span>
              </div>
              <div className="text-xs md:text-sm font-mono text-gray-300">
                <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: '1.5rem', margin: 0 }}>
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
