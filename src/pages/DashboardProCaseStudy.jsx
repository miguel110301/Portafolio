// src/pages/DashboardProCaseStudy.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Database, ShieldCheck, BarChart, Settings, Lock, Users, Activity as ActivityIcon, Server, TrendingUp, AlertCircle } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';

// --- COMPONENTE ANIMADO DEL DASHBOARD ---
function AnimatedDashboard() {
  const [revenue, setRevenue] = useState(124500);
  
  // Simulación de cambio de números en vivo
  useEffect(() => {
    const interval = setInterval(() => {
      setRevenue(prev => prev + Math.floor(Math.random() * 500));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-[#050505] p-4 md:p-6 flex flex-col gap-4 font-sans text-white/80 select-none overflow-hidden relative">
      {/* Grid de fondo decorativo */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4%_8%] pointer-events-none" />
      
      {/* Header del ERP Mock */}
      <div className="flex justify-between items-center border-b border-white/10 pb-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center border border-accent/30">
            <BarChart size={14} className="text-accent" />
          </div>
          <span className="font-bold text-sm tracking-wide">ERP System Core</span>
        </div>
        <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider">Live Sync</span>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 relative z-10">
        {[
          { label: "Daily Revenue", value: `$${revenue.toLocaleString()}`, icon: TrendingUp, color: "text-green-400" },
          { label: "Active Sessions", value: "342", icon: Users, color: "text-accent" },
          { label: "DB Latency", value: "24ms", icon: Server, color: "text-purple-400" }
        ].map((kpi, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] md:text-xs text-muted font-medium uppercase">{kpi.label}</span>
              <kpi.icon size={14} className={kpi.color} />
            </div>
            <span className="text-lg md:text-2xl font-bold text-primary tabular-nums">{kpi.value}</span>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 grid grid-cols-3 gap-3 md:gap-4 relative z-10">
        
        {/* Gráfico de Barras Animado */}
        <div className="col-span-2 bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col">
          <span className="text-xs text-muted mb-4 font-medium">Hourly Transaction Volume</span>
          <div className="flex-1 flex items-end justify-between gap-1 md:gap-2">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-full bg-white/5 rounded-t-sm relative overflow-hidden h-full flex items-end">
                <motion.div 
                  className="w-full bg-accent/60 border-t border-accent"
                  animate={{ 
                    height: [`${Math.random() * 40 + 20}%`, `${Math.random() * 80 + 20}%`, `${Math.random() * 50 + 20}%`] 
                  }}
                  transition={{ 
                    duration: 3 + Math.random() * 2, 
                    repeat: Infinity, 
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed Animado */}
        <div className="col-span-1 bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col relative">
          <span className="text-xs text-muted mb-3 font-medium shrink-0">Security Logs</span>
          
          {/* El secreto está aquí: overflow-hidden en el contenedor interno */}
          <div className="flex-1 relative overflow-hidden">
            
            {/* Gradiente superior para difuminar cuando el texto sube */}
            <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-[#111111] to-transparent z-10 pointer-events-none" />
            
            <motion.div 
              animate={{ y: [0, -60] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full space-y-3 pt-2"
            >
              {[
                { type: "auth", msg: "User admin logged in", time: "10s ago" },
                { type: "query", msg: "Exporting sales_Q3", time: "14s ago" },
                { type: "warn", msg: "Failed login attempt", time: "22s ago" },
                { type: "auth", msg: "User vendor_4 active", time: "31s ago" },
                { type: "query", msg: "Stock updated ID:92", time: "45s ago" },
                { type: "auth", msg: "User admin logged in", time: "55s ago" },
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-2 text-[9px] md:text-[10px]">
                  {log.type === 'warn' ? (
                    <AlertCircle size={12} className="text-red-400 shrink-0 mt-0.5" />
                  ) : (
                    <ShieldCheck size={12} className="text-accent shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className={log.type === 'warn' ? 'text-red-300' : 'text-gray-300'}>{log.msg}</div>
                    <div className="text-muted/50">{log.time}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Gradiente inferior para difuminar cuando el texto aparece */}
            <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#111111] to-transparent z-10 pointer-events-none" />
          </div>
        </div>

      </div>
    </div>
  );
}
// --- FIN DEL COMPONENTE ANIMADO ---


export default function DashboardProCaseStudy() {
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

  const codeSnippet = `# decorators.py - Custom RBAC Implementation
from functools import wraps
from django.core.exceptions import PermissionDenied
import logging

logger = logging.getLogger('security')

def require_role(allowed_roles):
    """
    Protege los endpoints asegurando que el usuario tenga un rol autorizado.
    """
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            if not request.user.is_authenticated:
                logger.warning(f"Intento de acceso anónimo a {request.path}")
                raise PermissionDenied("Se requiere autenticación.")
            
            user_role = getattr(request.user, 'role', None)
            
            if not user_role or user_role.name not in allowed_roles:
                logger.warning(f"Acceso denegado: Usuario {request.user.email} (Rol: {user_role})")
                raise PermissionDenied(f"Permisos insuficientes para esta acción.")
                
            return view_func(request, *args, **kwargs)
        return _wrapped_view
    return decorator

# Ejemplo de uso en el controlador de Inventario:
# @require_role(['Admin', 'Warehouse_Manager'])
# def update_stock(request, product_id):
#     ...
`;

  return (
    <div className="min-h-screen bg-background text-primary selection:bg-accent/30 font-sans pb-24 pt-12">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Navegación */}
        <nav className="mb-16 animate-in opacity-0">
          <Link to="/#projects" className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors font-medium">
            <ArrowLeft size={18} /> Volver al Portafolio
          </Link>
        </nav>

        {/* Header del Proyecto */}
        <header className="mb-16 animate-in opacity-0">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-bold tracking-widest uppercase bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/20">
              SaaS & Backend Architecture
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">Dashboard Pro</h1>
          <p className="text-xl text-muted leading-relaxed max-w-2xl">
            Sistemas backend robustos para una plataforma ERP de inventario y ventas. Un enfoque total en la integridad de los datos, flujos de reportes automatizados en segundo plano y control de acceso estricto basado en roles (RBAC).
          </p>
        </header>

        {/* Métricas / Stack */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 animate-in opacity-0">
          {[
            { label: 'Lógica Core', value: 'Python', icon: Settings },
            { label: 'Persistencia', value: 'PostgreSQL', icon: Database },
            { label: 'Seguridad', value: 'RBAC Auth', icon: ShieldCheck },
            { label: 'Procesamiento', value: 'Background Jobs', icon: ActivityIcon },
          ].map((item, i) => (
             <div key={i} className="glass-panel p-5 rounded-xl border border-white/5">
              <item.icon className="text-accent mb-3" size={20} />
              <div className="text-xs text-muted mb-1 uppercase tracking-wider">{item.label}</div>
              <div className="font-semibold">{item.value}</div>
            </div>
          ))}
        </div>

        {/* --- AQUÍ REEMPLAZAMOS LA IMAGEN CON EL COMPONENTE ANIMADO --- */}
        <div className="mb-20 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(56,189,248,0.05)] bg-[#0a0a0a] aspect-[16/10] md:aspect-video relative animate-in opacity-0">
          <AnimatedDashboard />
        </div>

        <section className="space-y-16">
          
          {/* Sección 1: RBAC */}
          <div className="animate-in opacity-0">
            <h2 className="text-2xl font-bold mb-4 border-b border-white/10 pb-4 flex items-center gap-3">
              <Users className="text-accent" /> 01. Arquitectura de Datos y Permisos
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-6">
              En sistemas ERP (Enterprise Resource Planning), un error de permisos puede significar desajustes financieros o fugas de información. Implementé un sistema de <strong>Control de Acceso Basado en Roles (RBAC)</strong> desde cero en el backend. 
            </p>
            <p className="text-muted text-lg leading-relaxed">
              Esto asegura que el personal de almacén solo pueda modificar el stock, el equipo de ventas solo gestione transacciones, y la gerencia tenga acceso a vistas consolidadas, todo operando sobre la misma fuente de verdad (Single Source of Truth) en PostgreSQL.
            </p>
          </div>

          {/* Código Destacado */}
          <div className="animate-in opacity-0">
            <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4 flex items-center gap-3">
              <Lock className="text-accent" /> Código Destacado: Middleware RBAC
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-6">
              Para mantener el código limpio y escalable, diseñé decoradores personalizados en Python que interceptan las peticiones a la API, validando la identidad y el rol antes de tocar la base de datos, registrando además cualquier anomalía de seguridad.
            </p>
            
            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl">
              <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="ml-4 text-xs font-mono text-muted">security/decorators.py</span>
              </div>
              <div className="text-sm font-mono text-gray-300">
                <SyntaxHighlighter 
                  language="python" 
                  style={vscDarkPlus} 
                  customStyle={{ background: 'transparent', padding: '1.5rem', margin: 0 }}
                >
                  {codeSnippet}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>

          {/* Sección 2: Automatización */}
          <div className="animate-in opacity-0">
            <h2 className="text-2xl font-bold mb-4 border-b border-white/10 pb-4 flex items-center gap-3">
              <ActivityIcon className="text-accent" /> 02. Flujos de Reportes Automatizados
            </h2>
            <p className="text-muted text-lg leading-relaxed">
              La gerencia no necesita ver datos crudos, necesita información procesable. En lugar de requerir exportaciones manuales diarias que colapsan la base de datos en horas pico, diseñé tareas en segundo plano (Background Jobs) que consolidan las métricas de inventario y ventas durante la madrugada, generando y distribuyendo reportes analíticos automáticamente.
            </p>
          </div>

          {/* Impacto / Resultados */}
          <div className="animate-in opacity-0 glass-panel p-8 rounded-2xl border border-white/10 bg-[#0a0a0a]">
            <h2 className="text-2xl font-bold mb-8 text-center md:text-left">03. Impacto Operativo</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div>
                <div className="text-4xl font-extrabold text-accent mb-2">100%</div>
                <div className="text-sm text-muted">Trazabilidad en auditorías gracias al sistema de roles.</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-accent mb-2">Auto</div>
                <div className="text-sm text-muted">Generación diaria de KPIs sin intervención humana.</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-accent mb-2">Secure</div>
                <div className="text-sm text-muted">Arquitectura backend blindada y escalable.</div>
              </div>
            </div>
          </div>

        </section>

        {/* Footer */}
        <div className="mt-24 pt-12 border-t border-white/10 text-center animate-in opacity-0">
          <h3 className="text-xl font-bold mb-6">¿Necesitas un backend robusto para tu operación?</h3>
          <a href="mailto:miguelmoreno.uaq@gmail.com" className="inline-flex items-center justify-center gap-2 bg-primary text-background px-8 py-3.5 rounded-xl font-bold hover:scale-105 transition-transform duration-200">
            Hablemos de arquitectura
          </a>
        </div>

      </div>
    </div>
  );
}