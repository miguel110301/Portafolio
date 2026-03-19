import { motion } from 'framer-motion';

function Education() {
  return (
    <section id="education" className="py-32 relative bg-[#050505]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-20">
          <span className="protocol-label">Academic_History</span>
          <h2 className="section-title">Education.</h2>
        </div>

        <div className="relative">
          <div className="absolute left-[11px] md:left-[calc(25%-33px)] top-2 bottom-0 w-[1px] bg-white/10" />

          <div className="space-y-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12"
            >
              <div className="pl-10 md:pl-0 md:col-span-1">
                <span className="text-xs font-bold text-muted/60 font-mono tracking-widest uppercase">2023 — Present</span>
              </div>
              
              <div className="md:col-span-3 group relative">
                <div className="absolute -left-[34px] md:-left-[54px] top-1.5 w-3 h-3 rounded-full bg-white/20 border-[3px] border-[#050505] z-10" />
                
                <h3 className="item-title mb-1">B.S. in Software Engineering</h3>
                <span className="tech-subtitle mb-6">Universidad Autónoma de Querétaro</span>
                
                <div className="bg-white/[0.03] border border-white/5 p-8 rounded-sm">
                  <p className="text-muted leading-relaxed mb-6 text-lg">
                    Currently in the 6th semester. Focused on building high-performance systems and fault-tolerant architectures.
                  </p>
                  <div className="flex flex-wrap gap-x-12 gap-y-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-mono text-muted/40 uppercase tracking-widest">Main_Focus</span>
                      <span className="text-white/80 font-bold uppercase tracking-tighter">Database Design</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-mono text-muted/40 uppercase tracking-widest">Current_Status</span>
                      <span className="text-accent font-bold uppercase tracking-tighter">Academic_Cycle_06</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;