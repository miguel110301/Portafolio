import { motion } from 'framer-motion';
import { ArrowLeft, Server, Cpu, Workflow, ShieldCheck, Database, Terminal } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function LogisticsCaseStudy() {
  // Asegura que al entrar a la página, inicie desde arriba
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
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">Logística Event-Driven</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted">n8n Avanzado</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted">Python / Django</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            Orquestador Logístico <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">Impulsado por IA</span>
          </h1>
          <p className="text-xl text-muted leading-relaxed mb-12">
            Arquitectura de un sistema automatizado de alta concurrencia para la gestión operativa de conductores, validación de evidencias físicas mediante Visión Computacional, y sincronización estricta de estados con un backend centralizado.
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
            { label: "Validación IA", value: "GPT-4o" },
            { label: "Voz a Texto", value: "Whisper" },
            { label: "Backend Core", value: "Django API" },
            { label: "Orquestación", value: "n8n" }
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
          
          {/* Sección 1: El Problema */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
              <Workflow className="text-accent" /> El Reto Operativo
            </h2>
            <p className="mb-4">
              En operaciones logísticas a gran escala, el cuello de botella más grande ocurre en la validación manual de evidencias (tickets de peaje, facturas de diésel, cartas porte, etc.) y en la actualización del estado del viaje. Los operadores envían múltiples formatos (texto, fotos borrosas, notas de voz) que requieren interpretación humana, provocando demoras en liquidaciones y despachos.
            </p>
            <p>
              El objetivo fue construir un sistema <strong>tolerante a fallos</strong> capaz de recibir webhooks masivos, normalizar la entrada de datos sin importar el formato original (convirtiendo audios a texto de forma transparente), y aplicar reglas de negocio estrictas antes de interactuar con la base de datos central en Django.
            </p>
          </section>

          {/* Sección 2: La Arquitectura */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
              <Server className="text-accent" /> Arquitectura del Sistema
            </h2>
            <div className="glass-panel p-8 rounded-2xl mb-6 border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="mt-1 bg-white/10 p-2 rounded-lg h-fit"><ShieldCheck size={20} className="text-accent"/></div>
                  <div>
                    <strong className="text-primary block mb-1">Capa de Ingesta y Normalización</strong>
                    Recepción de webhooks. Si el payload contiene audio, se intercepta, se descarga el binario y se procesa asíncronamente a través del modelo Whisper de OpenAI. El resultado en texto se inyecta en el flujo reemplazando el payload original, haciendo que el resto del sistema procese el audio como si fuera texto plano.
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 bg-white/10 p-2 rounded-lg h-fit"><Database size={20} className="text-accent"/></div>
                  <div>
                    <strong className="text-primary block mb-1">Máquina de Estados (State Router)</strong>
                    Una consulta en tiempo real al backend (Django) recupera el contexto del viaje del usuario. Un nodo Switch masivo enruta la lógica basándose en combinaciones de estados: <code>OFFERING</code>, <code>WAITING_EVIDENCE</code>, <code>HOJA_LIQUIDACION</code>, etc.
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 bg-white/10 p-2 rounded-lg h-fit"><Cpu size={20} className="text-accent"/></div>
                  <div>
                    <strong className="text-primary block mb-1">Validación OCR & Anti-Fraude</strong>
                    Las imágenes se envían a GPT-4o con un prompt de sistema inquebrantable. Se evalúa no solo el texto (monto, categoría), sino la validez de la imagen misma (ej. rechazar si se espera una INE y se detecta una caja vacía, o si la foto es ilegible).
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Sección 3: Evidencia de Código */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
              <Terminal className="text-accent" /> Ingeniería en la Automatización
            </h2>
            <p className="mb-6">
              Las herramientas low-code fallan si no hay código sólido respaldándolas. Aquí muestro cómo resuelvo uno de los problemas más comunes al usar LLMs en producción: <strong>asegurar el parsing del JSON incluso cuando la IA alucina texto adicional o markdown.</strong>
            </p>
            
            {/* Snippet de Código */}
            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d1117]">
              <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="ml-4 text-xs font-mono text-muted">ai_json_parser.js</span>
              </div>
              <div className="p-6 overflow-x-auto text-sm font-mono text-gray-300 leading-relaxed">
<pre><code>{`// Función recursiva para buscar el objeto JSON válido dentro de la respuesta del LLM
function buscarTextoConRespuesta(obj) {
  if (!obj) return null;
  // Buscamos firmas específicas que sabemos que le pedimos a la IA
  if (typeof obj === 'string' && (obj.includes('monto') || obj.includes('categoria'))) return obj;
  if (typeof obj === 'object') {
    for (let key in obj) {
      let encontrado = buscarTextoConRespuesta(obj[key]);
      if (encontrado) return encontrado;
    }
  }
  return null;
}

const textoEncontrado = buscarTextoConRespuesta($json);

if (!textoEncontrado) {
  return { json: { es_valido: false, mensaje_error: "Error: No se pudo procesar la respuesta." }};
}

try {
  // Limpieza agresiva de Markdown blocks que las IAs suelen insertar
  const limpio = textoEncontrado.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
  const datos = JSON.parse(limpio);
  
  // Blindaje final de lógica de negocio
  let es_valido = true;
  let mensaje_error = "";
  
  if (datos.categoria === "INVALIDO" || datos.monto === 0) {
      es_valido = false;
      mensaje_error = "No logré leer los números. Por favor, toma una foto más clara.";
  }

  return {
    json: {
      es_valido: es_valido,
      monto: datos.monto,
      categoria: datos.categoria,
      mensaje_error: mensaje_error
    }
  };
} catch (error) {
  return { json: { es_valido: false, mensaje_error: "Estructura de datos corrupta." }};
}`}</code></pre>
              </div>
            </div>
          </section>

          {/* Sección 4: El Impacto */}
          <section className="bg-gradient-to-r from-accent/10 to-transparent p-8 rounded-2xl border border-accent/20">
            <h2 className="text-2xl font-bold text-primary mb-2">Resultados del Sistema</h2>
            <p className="text-primary/80">
              La implementación de esta arquitectura permitió a la operación escalar de manera asíncrona. Los operadores reciben retroalimentación inmediata sobre sus evidencias, el backend en Django se mantiene como fuente única de verdad (Single Source of Truth), y el equipo de soporte se liberó de validaciones rutinarias para concentrarse únicamente en la resolución de excepciones operativas.
            </p>
          </section>

        </motion.div>
      </div>
    </div>
  );
}

export default LogisticsCaseStudy;