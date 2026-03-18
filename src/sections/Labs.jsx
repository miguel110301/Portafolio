import { motion } from 'framer-motion';
import { Beaker, Smartphone, Activity } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

function Labs() {
  const experiments = [
    {
      title: "Valance",
      type: "iOS Native App",
      status: "In Development",
      description: "Personal finance application built natively for the Apple ecosystem. Currently implementing local-first architecture for expense tracking, custom UI components, and strict data persistence.",
      icon: <Smartphone size={24} className="text-purple-400" />,
      tech: ["Swift", "CoreData", "iOS Architecture"]
    },
    {
      title: "Step-Tracker RPG",
      type: "Mobile Game Logic",
      status: "Prototyping",
      description: "Game engine experiment where real-world physical steps translate into in-game resources. Solving challenges around background pedometer tracking, state sync, and resource economy algorithms.",
      icon: <Activity size={24} className="text-green-400" />,
      tech: ["Swift", "Health/Sensor APIs", "Game Loops"]
    }
  ];

  return (
    <section id="labs" className="py-24 relative overflow-hidden">
      {/* Resplandor de fondo estilo "Laboratorio" */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-purple-400 font-semibold tracking-wider uppercase text-sm mb-4 flex items-center gap-2">
              <Beaker size={16} /> R&D Laboratory
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Current Experiments</h2>
            <p className="text-muted text-lg max-w-2xl">
              What I'm building right now. Exploring native ecosystems, testing architectures, and solving complex logic in real-time.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiments.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Tilt 
                tiltMaxAngleX={3} 
                tiltMaxAngleY={3} 
                perspective={1000} 
                scale={1.02} 
                transitionSpeed={2000}
                className="h-full"
              >
                <div className="glass-panel p-8 rounded-2xl hover:border-purple-500/30 transition-all duration-500 h-full relative overflow-hidden group">
                  {/* Badge de estado */}
                  <div className="absolute top-0 right-0 bg-white/5 px-4 py-1.5 rounded-bl-xl border-b border-l border-white/10 text-xs font-medium text-muted group-hover:text-purple-300 transition-colors">
                    {exp.status}
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 shadow-inner">
                    {exp.icon}
                  </div>
                  
                  <span className="text-xs font-medium text-purple-400 mb-2 block">{exp.type}</span>
                  <h3 className="text-2xl font-bold text-primary mb-3">{exp.title}</h3>
                  <p className="text-muted leading-relaxed mb-8 flex-grow">{exp.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {exp.tech.map((tech, i) => (
                      <span key={i} className="text-xs font-medium text-primary/70 bg-white/5 px-3 py-1.5 rounded-md border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Labs;