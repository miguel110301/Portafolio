import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Bot, Mail, CheckCircle, RefreshCw } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function GammaCaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Navegación */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-12 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Volver al Portafolio
        </Link>

        {/* Header del Proyecto */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">Automatización Asíncrona</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted">Telegram Bot</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted">Gamma API</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            Agente Generador de <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">Reportes Ejecutivos</span>
          </h1>
          <p className="text-xl text-muted leading-relaxed mb-12">
            Un bot conversacional que ingesta datos crudos, orquesta la creación de presentaciones mediante IA, gestiona aprobaciones humanas (Human-in-the-loop) y programa envíos de correo diferidos en el tiempo.
          </p>
        </motion.div>

        {/* Métricas / Highlights */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {[
            { label: "Interfaz", value: "Telegram" },
            { label: "Generación", value: "Gamma API" },
            { label: "Aprobación", value: "Interactive" },
            { label: "Ejecución", value: "Scheduled" }
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl text-center border-t border-t-white/10">
              <span className="block text-2xl font-bold text-primary mb-1">{stat.value}</span>
              <span className="text-xs text-muted uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Contenido Principal */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-16 text-muted leading-relaxed"
        >
          
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
              <Bot className="text-accent" /> El Reto Operativo
            </h2>
            <p>
              Generar presentaciones ejecutivas a partir de datos crudos (ej. exportaciones de Power BI) toma horas de trabajo manual. El objetivo fue crear un asistente accesible desde el celular que pudiera recibir los datos, estructurarlos con IA, generar las diapositivas y, lo más importante, <strong>pedir aprobación humana antes de enviar el resultado final a los clientes en una fecha y hora programada.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
              <RefreshCw className="text-accent" /> Arquitectura Asíncrona
            </h2>
            <div className="glass-panel p-8 rounded-2xl mb-6 border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="mt-1 bg-white/10 p-2 rounded-lg h-fit"><RefreshCw size={20} className="text-accent"/></div>
                  <div>
                    <strong className="text-primary block mb-1">Mecanismo de Polling Inteligente</strong>
                    Las APIs de generación de documentos (como Gamma) no responden de inmediato. Implementé un ciclo de espera controlada (Wait/Check) con un límite de reintentos seguro para monitorear el estatus sin saturar los endpoints.
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 bg-white/10 p-2 rounded-lg h-fit"><CheckCircle size={20} className="text-accent"/></div>
                  <div>
                    <strong className="text-primary block mb-1">Human-in-the-Loop & Manejo de Estado</strong>
                    Utilizando <code>$getWorkflowStaticData</code>, el sistema guarda en memoria la sesión del usuario. El bot envía la presentación por Telegram con botones interactivos (Callbacks) y "pausa" su ejecución hasta recibir el clic de aprobación o cancelación.
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 bg-white/10 p-2 rounded-lg h-fit"><Clock size={20} className="text-accent"/></div>
                  <div>
                    <strong className="text-primary block mb-1">Ejecución Diferida (Scheduling)</strong>
                    Una vez aprobado, el sistema le pide al usuario una fecha de envío. Un parser de código extrae el string "DD/MM/AAAA HH:MM", lo convierte a zona horaria estricta, valida que sea en el futuro, y suspende el flujo completo hasta ese instante exacto.
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
              <Mail className="text-accent" /> Código Destacado: Control de Estado Global
            </h2>
            <p className="mb-6">
              Mantener el contexto de la conversación entre múltiples mensajes separados en el tiempo requiere un buen diseño de estado. Aquí muestro cómo estructuro la persistencia en memoria para gestionar la máquina de estados del bot.
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
              <div className="p-6 overflow-x-auto text-sm font-mono text-gray-300 leading-relaxed">
<pre><code>{`// Ingesta inicial: Identificando el tipo de interacción (Mensaje vs Botón)
const staticData = $getWorkflowStaticData('global');
const payload = $input.first().json;

if (payload.callback_query) {
  return [{ json: { tipo: 'callback', payload } }];
}

// Control de flujo basado en estado de memoria
if (payload.message) {
  const chatId = payload.message.chat.id.toString();
  const contexto = staticData[chatId];
  
  // Si el usuario ya aprobó y estamos esperando que escriba la fecha:
  if (contexto && contexto.status === 'waiting_datetime') {
    return [{ json: { tipo: 'fecha', payload, contexto } }];
  }
  
  // Entrada de datos normal
  return [{ json: { tipo: 'mensaje', payload } }];
}`}</code></pre>
              </div>
            </div>
          </section>

        </motion.div>
      </div>
    </div>
  );
}

export default GammaCaseStudy;