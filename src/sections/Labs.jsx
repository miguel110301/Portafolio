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
    <section id="labs" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="mb-20">
          <span className="protocol-label flex items-center gap-2 !text-purple-400">
            <Beaker size={14} /> R&D_Laboratory
          </span>
          <h2 className="section-title">Current Experiments.</h2>
          <p className="text-muted text-lg max-w-2xl mt-6">
            What I'm building right now. Exploring native ecosystems, testing architectures, and solving complex logic in real-time.
          </p>
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
                  <div className="absolute top-0 right-0 bg-white/5 px-4 py-1.5 rounded-bl-xl border-b border-l border-white/10 text-[10px] font-mono uppercase tracking-widest text-muted group-hover:text-purple-300 transition-colors">
                    {exp.status}
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 shadow-inner">
                    {exp.icon}
                  </div>
                  
                  <span className="tech-subtitle !text-purple-400 mb-2">{exp.type}</span>
                  <h3 className="item-title mb-4">{exp.title}</h3>
                  <p className="text-muted leading-relaxed mb-8 flex-grow">{exp.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto pt-4">
                    {exp.tech.map((tech, i) => (
                      <span key={i} className="text-[10px] font-bold text-white/50 border border-white/10 px-3 py-1 rounded-sm uppercase tracking-tighter bg-white/[0.02]">
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