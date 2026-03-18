// src/pages/QroDataCaseStudy.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Database, LayoutDashboard, LineChart, Code2 } from 'lucide-react';

export default function QroDataCaseStudy() {
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

  return (
    <div className="min-h-screen bg-background text-primary selection:bg-accent/30 font-sans pb-24 pt-12">
      <div className="max-w-4xl mx-auto px-6">
        
        <nav className="mb-16 animate-in opacity-0">
          <Link to="/#projects" className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors font-medium">
            <ArrowLeft size={18} /> Back to Portfolio
          </Link>
        </nav>

        <header className="mb-16 animate-in opacity-0">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-bold tracking-widest uppercase bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/20">
              Fullstack Web
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">QroData Analytics</h1>
          <p className="text-xl text-muted leading-relaxed max-w-2xl">
            End-to-end development of a web platform capable of ingesting high volumes of raw data, processing it in the backend, and serving it in interactive interfaces and real-time dashboards.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 animate-in opacity-0">
          {[
            { label: 'Frontend', value: 'React', icon: LayoutDashboard },
            { label: 'Backend', value: 'Python', icon: Code2 },
            { label: 'Database', value: 'MySQL', icon: Database },
            { label: 'Analytics', value: 'Data Pipelines', icon: LineChart },
          ].map((item, i) => (
            <div key={i} className="glass-panel p-5 rounded-xl border border-white/5">
              <item.icon className="text-accent mb-3" size={20} />
              <div className="text-xs text-muted mb-1 uppercase tracking-wider">{item.label}</div>
              <div className="font-semibold">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="mb-16 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a] aspect-video relative flex items-center justify-center animate-in opacity-0">
          <p className="absolute text-muted/50 z-0 text-sm border border-dashed border-white/20 p-4 rounded-lg">Dashboard Screenshot Placeholder</p>
          <img 
            src="/dashboard-qrodata.png" 
            alt="QroData Main Dashboard" 
            className="w-full h-full object-cover relative z-10 opacity-0 transition-opacity duration-700"
            onLoad={(e) => e.target.classList.remove('opacity-0')}
            onError={(e) => e.target.style.display = 'none'} 
          />
        </div>

        <section className="space-y-16">
          
          <div className="animate-in opacity-0">
            <h2 className="text-2xl font-bold mb-4 border-b border-white/10 pb-4 flex items-center gap-3">
              <Database className="text-accent" /> Ingestion and Processing
            </h2>
            <p className="text-muted text-lg leading-relaxed">
              The main challenge with data is not displaying it, but cleaning and structuring it. For this project, the Python backend extracts information from multiple sources, applies transformations (ETL), and stores it in a MySQL database optimized for fast read queries.
            </p>
          </div>

          <div className="animate-in opacity-0">
            <h2 className="text-2xl font-bold mb-4 border-b border-white/10 pb-4 flex items-center gap-3">
              <LayoutDashboard className="text-accent" /> Interface and Experience
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-8">
              On the client side, the application is built with React, focusing on smooth performance without full page reloads. The components consume the backend's REST endpoints and render the information using modern charting libraries.
            </p>
            
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] aspect-[21/9] relative flex items-center justify-center shadow-xl">
               <p className="absolute text-muted/50 z-0 text-sm border border-dashed border-white/20 p-4 rounded-lg">Table/Charts Screenshot Placeholder</p>
               <img 
                src="/detalle-qrodata.png" 
                alt="QroData Details View" 
                className="w-full h-full object-cover relative z-10 opacity-0 transition-opacity duration-700"
                onLoad={(e) => e.target.classList.remove('opacity-0')}
                onError={(e) => e.target.style.display = 'none'} 
              />
            </div>
          </div>

          <div className="animate-in opacity-0 glass-panel p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-accent/5 to-transparent">
            <h2 className="text-2xl font-bold mb-4">Value Delivered</h2>
            <p className="text-muted text-lg leading-relaxed">
              QroData demonstrates my ability to step out of pure backend code and connect logical systems with consumable user interfaces. It is proof that I can handle a requirement from the database all the way to the end user's browser, maintaining performance and security at every layer.
            </p>
          </div>

        </section>

      </div>
    </div>
  );
}