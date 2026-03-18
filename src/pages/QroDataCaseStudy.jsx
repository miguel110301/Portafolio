import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Database, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

function QroDataCaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-6">
        
        <Link to="/" className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-12 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">Fullstack Web</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted">React</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted">Python Analytics</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            QroData: Visual Analytics <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">and Monitoring</span>
          </h1>
          <p className="text-xl text-muted leading-relaxed mb-12">
            End-to-end development of a web platform capable of ingesting high volumes of raw data, processing it in the backend, and serving it in interactive interfaces and real-time dashboards.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 aspect-video relative flex items-center justify-center"
        >
          <p className="absolute text-muted/50 z-0">Dashboard Screenshot Placeholder</p>
          <img 
            src="/dashboard-qrodata.png" 
            alt="QroData Main Dashboard" 
            className="w-full h-full object-cover relative z-10 opacity-0 transition-opacity duration-500"
            onLoad={(e) => e.target.classList.remove('opacity-0')}
            onError={(e) => e.target.style.display = 'none'} 
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-16 text-muted leading-relaxed"
        >
          
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
              <Database className="text-accent" /> Ingestion and Processing
            </h2>
            <p>
              The main challenge with data is not displaying it, but cleaning and structuring it. For this project, the Python backend extracts information from multiple sources, applies transformations (ETL), and stores it in a MySQL database optimized for fast read queries.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
              <LayoutDashboard className="text-accent" /> Interface and Experience
            </h2>
            <p className="mb-6">
              On the client side, the application is built with React, focusing on smooth performance without full page reloads. The components consume the backend's REST endpoints and render the information using modern charting libraries.
            </p>
            
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 aspect-[21/9] relative flex items-center justify-center">
               <p className="absolute text-muted/50 z-0">Table/Charts Screenshot Placeholder</p>
               <img 
                src="/detalle-qrodata.png" 
                alt="QroData Details View" 
                className="w-full h-full object-cover relative z-10 opacity-0 transition-opacity duration-500"
                onLoad={(e) => e.target.classList.remove('opacity-0')}
                onError={(e) => e.target.style.display = 'none'} 
              />
            </div>
          </section>

          <section className="bg-gradient-to-r from-accent/10 to-transparent p-8 rounded-2xl border border-accent/20">
            <h2 className="text-2xl font-bold text-primary mb-2">Value Delivered</h2>
            <p className="text-primary/80">
              QroData demonstrates my ability to step out of pure backend code and connect logical systems with consumable user interfaces. It is proof that I can handle a requirement from the database all the way to the end user's browser.
            </p>
          </section>

        </motion.div>
      </div>
    </div>
  );
}

export default QroDataCaseStudy;