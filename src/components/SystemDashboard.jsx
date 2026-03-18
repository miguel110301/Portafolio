import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Server, Zap } from 'lucide-react';

function SystemDashboard() {
  const [latency, setLatency] = useState(42);
  const [throughput, setThroughput] = useState(840);

  // Simula datos cambiando en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * (55 - 35 + 1) + 35));
      setThroughput(Math.floor(Math.random() * (950 - 750 + 1) + 750));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto mt-16 mb-8">
      <div className="glass-panel p-1 rounded-2xl bg-[#0a0a0a]/80 border border-white/10 shadow-[0_0_40px_rgba(56,189,248,0.05)]">
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10">
          
          {/* Métrica 1: Latencia */}
          <div className="flex-1 p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-muted uppercase tracking-wider flex items-center gap-2">
                <Zap size={14} className="text-accent" /> API Latency
              </span>
              <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full font-medium">Optimal</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-primary tabular-nums">{latency}</span>
              <span className="text-muted mb-1 font-medium">ms</span>
            </div>
            {/* Mini gráfico animado */}
            <div className="absolute bottom-0 left-0 right-0 h-12 flex items-end gap-1 px-6 opacity-30">
              {[...Array(12)].map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ height: ['20%', '80%', '40%', '100%', '30%'][Math.floor(Math.random() * 5)] }}
                  transition={{ duration: 1.5 + Math.random(), repeat: Infinity, repeatType: 'reverse' }}
                  className="flex-1 bg-accent rounded-t-sm"
                />
              ))}
            </div>
          </div>

          {/* Métrica 2: Throughput */}
          <div className="flex-1 p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-muted uppercase tracking-wider flex items-center gap-2">
                <Activity size={14} className="text-purple-400" /> Event Throughput
              </span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-primary tabular-nums">{throughput}</span>
              <span className="text-muted mb-1 font-medium">req/min</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-12 flex items-end gap-1 px-6 opacity-30">
              {[...Array(12)].map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ height: ['40%', '100%', '60%', '90%', '50%'][Math.floor(Math.random() * 5)] }}
                  transition={{ duration: 2 + Math.random(), repeat: Infinity, repeatType: 'reverse' }}
                  className="flex-1 bg-purple-400 rounded-t-sm"
                />
              ))}
            </div>
          </div>

          {/* Métrica 3: Server Health */}
          <div className="flex-1 p-6 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-muted uppercase tracking-wider flex items-center gap-2">
                <Server size={14} className="text-green-400" /> System Status
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
              </div>
              <div>
                <div className="text-lg font-bold text-primary">All Systems Operational</div>
                <div className="text-xs text-muted">99.99% Uptime SLA</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SystemDashboard;