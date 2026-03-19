import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Database, Code2, Play, LayoutDashboard, BrainCircuit, Activity } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from 'framer-motion';

function NLPDashboardSimulation() {
  const [isRunning, setIsRunning] = useState(false);
  const [processed, setProcessed] = useState(0);
  const [mentions, setMentions] = useState([]);
  const [stats, setStats] = useState({ pos: 0, neu: 0, neg: 0 });

  const rawTweets = [
    { text: "El servicio en la sucursal centro es increíble hoy, muy rápidos!", sentiment: "pos", color: "text-green-400" },
    { text: "Llevo 2 horas esperando respuesta, pésimo sistema.", sentiment: "neg", color: "text-red-400" },
    { text: "Acaban de anunciar los nuevos horarios de atención.", sentiment: "neu", color: "text-gray-400" },
    { text: "Me resolvieron el problema en 5 minutos, excelente.", sentiment: "pos", color: "text-green-400" },
    { text: "La plataforma se cae a cada rato, imposible trabajar así.", sentiment: "neg", color: "text-red-400" },
  ];

  const startEngine = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setProcessed(0);
    setMentions([]);
    setStats({ pos: 0, neu: 0, neg: 0 });

    const totalTarget = 100000;
    const interval = setInterval(() => {
      setProcessed(p => {
        if (p >= totalTarget) { clearInterval(interval); return totalTarget; }
        return p + 4500;
      });
    }, 100);

    for (let i = 0; i < rawTweets.length; i++) {
      await new Promise(r => setTimeout(r, 600));
      const tweet = rawTweets[i];
      setMentions(prev => [tweet, ...prev].slice(0, 3)); 
      setStats(prev => ({ ...prev, [tweet.sentiment]: prev[tweet.sentiment] + 1 }));
    }
    
    setTimeout(() => setIsRunning(false), 1500);
  };

  return (
    <div className="w-full bg-[#0a0a0a] rounded-sm border border-white/10 shadow-2xl overflow-hidden font-sans my-12">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#121212] relative">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-sm font-bold text-white flex items-center gap-2"><Activity size={16} className="text-accent"/> NLP Engine Processing</h4>
            <button onClick={startEngine} disabled={isRunning} className="bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white px-4 py-1.5 rounded-sm text-[10px] uppercase tracking-widest font-bold transition-colors flex items-center gap-2">
              <Play size={12} fill="currentColor"/> {isRunning ? "Processing" : "Run Analysis"}
            </button>
          </div>

          <div className="h-40 relative">
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-10">
               <span className="text-6xl font-black font-mono">{processed.toLocaleString()}</span>
               <span className="uppercase tracking-widest font-bold">Rows Analyzed</span>
            </div>

            <div className="relative z-10 flex flex-col gap-2 h-full justify-center">
              <AnimatePresence>
                {mentions.map((m, i) => (
                  <motion.div key={m.text} initial={{ opacity: 0, x: -50, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 50, scale: 0.9 }} className="bg-black/80 backdrop-blur border border-white/10 p-3 rounded-sm flex items-center justify-between">
                    <span className="text-xs text-white/80 truncate w-[70%] font-mono">"{m.text}"</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-sm bg-white/5 border border-white/5 ${m.color}`}>{m.sentiment}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {!isRunning && mentions.length === 0 && <div className="text-center text-xs text-muted font-mono animate-pulse">Awaiting pipeline execution...</div>}
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 flex flex-col justify-center bg-[#050505]">
          <h4 className="text-sm font-bold text-white mb-6 flex items-center gap-2"><LayoutDashboard size={16} className="text-accent"/> Live Dashboard Output</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2"><span className="text-green-400">Positive</span><span className="text-white">{stats.pos * 14200} mentions</span></div>
              <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden"><motion.div className="bg-green-400 h-full" animate={{ width: `${(stats.pos / 5) * 100 || 0}%` }} transition={{duration:0.5}}/></div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2"><span className="text-gray-400">Neutral</span><span className="text-white">{stats.neu * 14200} mentions</span></div>
              <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden"><motion.div className="bg-gray-400 h-full" animate={{ width: `${(stats.neu / 5) * 100 || 0}%` }} transition={{duration:0.5}}/></div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2"><span className="text-red-400">Negative</span><span className="text-white">{stats.neg * 14200} mentions</span></div>
              <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden"><motion.div className="bg-red-400 h-full" animate={{ width: `${(stats.neg / 5) * 100 || 0}%` }} transition={{duration:0.5}}/></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

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

  const pythonCode = `import pandas as pd
from sqlalchemy import create_engine
from textblob import SentimentIntensityAnalyzer

def process_social_mentions(raw_data_json):
    # 1. Ingest payload containing 100k+ unstructured string records
    df = pd.DataFrame(raw_data_json)
    
    # 2. Vectorized cleaning operations (Fastest performance)
    df['clean_text'] = df['text'].str.replace(r'http\\S+|www.\\S+', '', regex=True)
    df.dropna(subset=['clean_text'], inplace=True)
    
    # 3. NLP Sentiment Analysis via Vader
    analyzer = SentimentIntensityAnalyzer()
    df['score'] = df['clean_text'].apply(lambda x: analyzer.polarity_scores(x)['compound'])
    
    # Categorize based on score thresholds
    df['sentiment'] = pd.cut(df['score'], bins=[-1, -0.05, 0.05, 1], labels=['Neg', 'Neu', 'Pos'])
    
    # 4. Aggregate metrics for the React Dashboard API
    summary = df.groupby('sentiment').size().reset_index(name='count')
    
    # 5. Fast persistence via SQLAlchemy bulk insert chunking
    engine = create_engine('mysql+pymysql://user:pass@db_host/qrodata')
    df.to_sql('mentions', con=engine, if_exists='append', index=False, chunksize=10000)
    
    return summary.to_dict('records')`;

  return (
    <div className="min-h-screen bg-background text-primary selection:bg-accent/30 font-sans pb-24 pt-12">
      <div className="max-w-5xl mx-auto px-6">
        
        <nav className="mb-16 animate-in opacity-0">
          <Link to="/#projects" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted hover:text-accent transition-colors">
            <ArrowLeft size={14} /> System_Return
          </Link>
        </nav>

        <header className="mb-16 animate-in opacity-0">
          <div className="mb-6">
            <span className="protocol-label">Data_Engineering</span>
          </div>
          <h1 className="section-title mb-6">QroData Analytics.</h1>
          <p className="text-xl text-muted leading-relaxed max-w-3xl">
            A social listening architecture built to ingest massive volumes of public mentions, process them via NLP scripts, and expose quantified insights to an interactive dashboard.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 animate-in opacity-0">
          {[
            { label: 'Frontend', value: 'React', icon: LayoutDashboard },
            { label: 'Backend', value: 'Python', icon: Code2 },
            { label: 'Database', value: 'MySQL', icon: Database },
            { label: 'Analytics', value: 'Pandas & NLP', icon: LineChart },
          ].map((item, i) => (
            <div key={i} className="glass-panel p-5 rounded-sm border border-white/5 hover:border-white/20 transition-colors">
              <item.icon className="text-accent mb-3" size={20} />
              <span className="tech-subtitle !mb-1">{item.label}</span>
              <div className="font-bold text-white uppercase tracking-tight">{item.value}</div>
            </div>
          ))}
        </div>

        <section className="space-y-24">
          <div className="animate-in opacity-0">
            <h2 className="item-title mb-6 border-b border-white/10 pb-4">01. NLP Pipeline Simulation</h2>
            <p className="text-muted text-lg leading-relaxed mb-6 max-w-3xl">
              The main challenge is not displaying data, but cleaning and categorizing 100,000+ unstructured strings efficiently. The backend extracts text, applies sentiment analysis models, and pushes aggregated metrics to the frontend.
            </p>
            <NLPDashboardSimulation />
          </div>

          <div className="animate-in opacity-0 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="item-title mb-6 border-b border-white/10 pb-4 text-accent">02. Backend Evidence</h2>
              <p className="text-muted text-lg leading-relaxed mb-6">
                Below is a simplified snippet of the Python backend logic I wrote to clean the data, apply the NLP logic, and use bulk inserts (<code>chunksize=10000</code>) to prevent MySQL timeouts during persistence. 
              </p>
            </div>
            <div className="rounded-sm overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl relative">
              <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/10">
                <span className="tech-subtitle !mb-0 !tracking-widest">pipeline.py</span>
              </div>
              <div className="text-xs md:text-sm font-mono text-gray-300">
                <SyntaxHighlighter language="python" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: '1.5rem', margin: 0 }}>
                  {pythonCode}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}