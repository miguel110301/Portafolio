// src/pages/DashboardProCaseStudy.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Database, ShieldCheck, BarChart, Settings, Users, Activity as ActivityIcon, Server, TrendingUp, AlertCircle, RotateCcw } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';

function AnimatedDashboard() {
  const [revenue, setRevenue] = useState(124500);
  const [isRunning, setIsRunning] = useState(false);

  // TU LÓGICA ORIGINAL: Actualización cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => setRevenue(prev => prev + Math.floor(Math.random() * 500)), 3000);
    return () => clearInterval(interval);
  }, []);

  // Añadimos solo un feedback visual al botón para que sea interactivo
  const runSimulation = () => {
    setIsRunning(true);
    setRevenue(prev => prev + Math.floor(Math.random() * 2000 + 500));
    setTimeout(() => setIsRunning(false), 800);
  };

  return (
    <div className="w-full h-full bg-[#050505] p-4 md:p-6 flex flex-col gap-4 font-sans text-white/80 select-none overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4%_8%] pointer-events-none" />
      
      <div className="flex justify-between items-center border-b border-white/10 pb-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-sm bg-accent/20 flex items-center justify-center border border-accent/30"><BarChart size={14} className="text-accent" /></div>
          <span className="font-bold text-sm tracking-wide text-white">ERP System Core</span>
        </div>
        <button 
          onClick={runSimulation} 
          disabled={isRunning}
          className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 px-3 py-1.5 rounded-sm border border-green-500/30 transition-colors disabled:opacity-50 cursor-pointer"
        >
          <RotateCcw size={12} className={`text-green-400 ${isRunning ? 'animate-spin' : ''}`} />
          <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider">Sync Data</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 md:gap-4 relative z-10">
        {[
          { label: "Daily Revenue", value: `$${revenue.toLocaleString()}`, icon: TrendingUp, color: "text-green-400" }, 
          { label: "Active Sessions", value: "342", icon: Users, color: "text-accent" }, 
          { label: "DB Latency", value: "24ms", icon: Server, color: "text-purple-400" }
        ].map((kpi, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-sm p-3 flex flex-col hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] md:text-xs text-muted font-bold tracking-widest uppercase">{kpi.label}</span>
              <kpi.icon size={14} className={kpi.color} />
            </div>
            <span className="text-lg md:text-2xl font-bold text-white tabular-nums tracking-tighter">{kpi.value}</span>
          </div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-3 gap-3 md:gap-4 relative z-10">
        <div className="col-span-2 bg-white/5 border border-white/10 rounded-sm p-4 flex flex-col">
          <span className="text-[10px] text-muted mb-4 font-bold tracking-widest uppercase">Hourly Transaction Volume</span>
          <div className="flex-1 flex items-end justify-between gap-1 md:gap-2">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-full bg-white/5 rounded-t-sm relative overflow-hidden h-full flex items-end group">
                <motion.div 
                  className="w-full bg-accent/60 border-t border-accent group-hover:bg-accent transition-colors" 
                  animate={{ height: [`${Math.random() * 40 + 20}%`, `${Math.random() * 80 + 20}%`, `${Math.random() * 50 + 20}%`] }} 
                  transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1 bg-white/5 border border-white/10 rounded-sm p-4 flex flex-col relative overflow-hidden">
          <span className="text-[10px] text-muted mb-3 font-bold tracking-widest uppercase shrink-0">Security Logs</span>
          <div className="flex-1 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-[#111111] to-transparent z-10 pointer-events-none" />
            <motion.div animate={{ y: [0, -80] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-0 w-full space-y-3 pt-2">
              {[ 
                { type: "auth", msg: "User admin logged in", time: "10s ago" }, 
                { type: "query", msg: "Exporting sales_Q3", time: "14s ago" }, 
                { type: "warn", msg: "Failed login attempt", time: "22s ago" }, 
                { type: "auth", msg: "User vendor_4 active", time: "31s ago" }, 
                { type: "query", msg: "Stock updated ID:92", time: "45s ago" }, 
                { type: "auth", msg: "User admin logged in", time: "55s ago" },
                { type: "query", msg: "DB Index rebuilt", time: "1m ago" }
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-2 text-[9px] md:text-[10px] font-mono hover:bg-white/5 p-1 rounded transition-colors">
                  {log.type === 'warn' ? <AlertCircle size={12} className="text-red-400 shrink-0 mt-0.5" /> : <ShieldCheck size={12} className="text-accent shrink-0 mt-0.5" />}
                  <div>
                    <div className={log.type === 'warn' ? 'text-red-300' : 'text-gray-300'}>{log.msg}</div>
                    <div className="text-muted/50">{log.time}</div>
                  </div>
                </div>
              ))}
            </motion.div>
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#111111] to-transparent z-10 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

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
    Protects endpoints by ensuring the user holds an authorized role.
    """
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            if not request.user.is_authenticated:
                logger.warning(f"Anonymous access attempt on {request.path}")
                raise PermissionDenied("Authentication required.")
            
            user_role = getattr(request.user, 'role', None)
            
            if not user_role or user_role.name not in allowed_roles:
                logger.warning(f"Access denied: User {request.user.email}")
                raise PermissionDenied(f"Insufficient permissions.")
                
            return view_func(request, *args, **kwargs)
        return _wrapped_view
    return decorator`;

  return (
    <div className="min-h-screen bg-background text-primary selection:bg-accent/30 font-sans pb-24 pt-12 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Nav Return */}
        <nav className="mb-16 animate-in opacity-0">
          <Link to="/#projects" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted hover:text-accent transition-colors">
            <ArrowLeft size={14} /> System_Return
          </Link>
        </nav>

        {/* TIPOGRAFÍA CORREGIDA */}
        <header className="mb-16 animate-in opacity-0">
          <div className="mb-6">
            <span className="protocol-label">SaaS_&_Backend_Architecture</span>
          </div>
          <h1 className="section-title mb-6">Dashboard Pro.</h1>
          <p className="text-xl text-muted leading-relaxed max-w-3xl">
            Robust backend systems for an ERP platform covering inventory and sales. A complete focus on data integrity, automated background reporting workflows, and strict role-based access control (RBAC).
          </p>
        </header>

        {/* Stack Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 animate-in opacity-0">
          {[
            { label: 'Core Logic', value: 'Python', icon: Settings },
            { label: 'Persistence', value: 'PostgreSQL', icon: Database },
            { label: 'Security', value: 'RBAC Auth', icon: ShieldCheck },
            { label: 'Processing', value: 'Background Jobs', icon: ActivityIcon },
          ].map((item, i) => (
             <div key={i} className="glass-panel p-5 rounded-sm border border-white/5 hover:border-white/20 transition-colors bg-[#0a0a0a]">
              <item.icon className="text-accent mb-3" size={20} />
              <span className="tech-subtitle !mb-1">{item.label}</span>
              <div className="font-bold text-white uppercase tracking-tight">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Dashboard Component */}
        <div className="mb-24 rounded-sm overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(56,189,248,0.05)] bg-[#0a0a0a] aspect-[16/10] md:aspect-video relative animate-in opacity-0">
          <AnimatedDashboard />
        </div>

        {/* Detalles Técnicos */}
        <section className="space-y-24">
          <div className="animate-in opacity-0">
            <h2 className="item-title mb-6 border-b border-white/10 pb-4">
              01. Data Architecture
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-6 max-w-3xl">
              In ERP systems, a permissions error can mean financial discrepancies or data leaks. I implemented a <strong>Role-Based Access Control (RBAC)</strong> system from scratch on the backend. This ensures warehouse staff can only modify stock, the sales team only manages transactions, and management has access to consolidated views.
            </p>
          </div>

          <div className="animate-in opacity-0 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="item-title mb-6 border-b border-white/10 pb-4 text-accent">
                02. Security Middleware
              </h2>
              <p className="text-muted text-lg leading-relaxed mb-6">
                To keep the codebase clean and scalable, I designed custom Python decorators that intercept API requests, validating identity and role before touching the database, while logging any security anomalies.
              </p>
            </div>
            
            <div className="rounded-sm overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl relative">
              <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/10">
                <span className="tech-subtitle !mb-0 !tracking-widest">security/decorators.py</span>
              </div>
              <div className="text-xs md:text-sm font-mono text-gray-300">
                <SyntaxHighlighter language="python" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: '1.5rem', margin: 0 }}>
                  {codeSnippet}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}