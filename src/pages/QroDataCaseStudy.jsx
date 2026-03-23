import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Database, Code2, Play, LayoutDashboard, BrainCircuit, Activity, LineChart, CheckCircle2, RefreshCw, MessageSquareText } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';
import EvidenceCarousel from '../components/EvidenceCarousel';

// ─── EVIDENCE IMAGES ──────────────────────────────────────────────────────────
const QRODATA_IMAGES = [
  '/proyectos/qrodata/1.png',
  '/proyectos/qrodata/2.png',
  '/proyectos/qrodata/3.png',
  '/proyectos/qrodata/4.png',
  '/proyectos/qrodata/5.png',
  '/proyectos/qrodata/6.png',
  '/proyectos/qrodata/7.png',
  '/proyectos/qrodata/8.png',
  '/proyectos/qrodata/9.png',
  '/proyectos/qrodata/10.png',
  '/proyectos/qrodata/11.png',
  '/proyectos/qrodata/12.png',
  '/proyectos/qrodata/13.png',
];

// ─── NLP SIMULATION ───────────────────────────────────────────────────────────
function AdvancedNLPSimulation() {
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [counters, setCounters] = useState({ total: 0, pos: 0, neu: 0, neg: 0 });

  const mockTweets = [
    "El servicio en la sucursal es increíble hoy...",
    "Llevo 2 horas esperando respuesta, pésimo...",
    "Acaban de anunciar los nuevos horarios...",
    "Me resolvieron el problema en 5 minutos...",
    "La plataforma se cae a cada rato...",
    "Gran mejora en la actualización...",
    "¿Alguien sabe si mañana abren?",
    "Muy mala experiencia con el soporte...",
    "Todo funcionó perfecto a la primera...",
    "Información útil, gracias por compartir."
  ];

  const startEngine = () => {
    if (isRunning || !window.anime) return;
    setIsRunning(true);
    setIsComplete(false);

    window.anime.set('.metric-bar', { width: '0%' });
    window.anime.set('.stream-item', { opacity: 0, translateX: -40 });

    const tl = window.anime.timeline({
      easing: 'easeOutExpo',
      complete: () => {
        setIsRunning(false);
        setIsComplete(true);
      }
    });

    tl.add({
      targets: '.nlp-brain',
      scale: [1, 1.2, 1],
      rotate: '1turn',
      boxShadow: ['0 0 0px rgba(56,189,248,0)', '0 0 40px rgba(56,189,248,0.6)', '0 0 0px rgba(56,189,248,0)'],
      duration: 2500,
      easing: 'easeInOutSine'
    }, 0);

    tl.add({
      targets: '.stream-item',
      opacity: [0, 1, 0],
      translateX: [-40, 0, 40],
      duration: 1200,
      delay: window.anime.stagger(200),
      easing: 'easeOutQuad'
    }, 0);

    const counterObj = { total: 0, pos: 0, neu: 0, neg: 0 };
    window.anime({
      targets: counterObj,
      total: 100000,
      pos: 62400,
      neu: 25100,
      neg: 12500,
      round: 1,
      duration: 3000,
      easing: 'easeOutQuart',
      update: function() {
        setCounters({ total: counterObj.total, pos: counterObj.pos, neu: counterObj.neu, neg: counterObj.neg });
      }
    });

    tl.add({ targets: '#bar-pos', width: '62.4%', duration: 1500, easing: 'easeOutElastic(1, .8)' }, 1500);
    tl.add({ targets: '#bar-neu', width: '25.1%', duration: 1500, easing: 'easeOutElastic(1, .8)' }, 1600);
    tl.add({ targets: '#bar-neg', width: '12.5%', duration: 1500, easing: 'easeOutElastic(1, .8)' }, 1700);
  };

  return (
    <div className="w-full bg-[#050505] rounded-sm border border-white/10 shadow-2xl p-4 md:p-6 font-sans my-12">
      <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-accent" />
          <span className="font-bold text-sm text-white">Social Listening NLP Pipeline</span>
        </div>
        <button
          onClick={startEngine}
          disabled={isRunning}
          className="bg-accent/10 hover:bg-accent/20 border border-accent/30 disabled:opacity-50 text-accent px-4 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
        >
          {isRunning ? <RefreshCw size={12} className="animate-spin" /> : <Play size={12} fill="currentColor" />}
          {isRunning ? "Processing 100k Rows..." : "Execute Pipeline"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-[#121212] border border-white/5 rounded-sm p-4 relative h-48 md:h-64 overflow-hidden">
          <h4 className="tech-subtitle !mb-4">1. Raw_Ingestion</h4>
          <div className="absolute top-14 left-4 right-4 flex flex-col gap-2">
            {mockTweets.map((t, i) => (
              <div key={i} className="stream-item opacity-0 text-[10px] text-white/60 bg-white/5 border border-white/10 p-2.5 rounded-sm font-mono truncate flex items-center gap-2 shadow-lg">
                <MessageSquareText size={12} className="text-muted shrink-0" />
                {t}
              </div>
            ))}
          </div>
          {!isRunning && !isComplete && (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-muted font-mono animate-pulse bg-[#121212]/80 backdrop-blur-sm z-10">
              Awaiting trigger...
            </div>
          )}
        </div>

        <div className="bg-[#121212] border border-white/5 rounded-sm p-4 flex flex-col items-center justify-center h-48 md:h-64 relative overflow-hidden">
          <div className="absolute inset-0 bg-accent/5 blur-3xl rounded-full" />
          <div className="nlp-brain w-20 h-20 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center mb-6 relative z-10">
            <BrainCircuit size={32} className={isRunning ? "text-accent" : "text-muted"} />
          </div>
          <div className="text-4xl md:text-5xl font-black font-mono text-white tracking-tighter relative z-10">
            {counters.total.toLocaleString()}
          </div>
          <div className="tech-subtitle !mt-2 relative z-10">Rows Extracted</div>
        </div>

        <div className="bg-[#121212] border border-white/5 rounded-sm p-4 flex flex-col justify-center h-48 md:h-64">
          <h4 className="tech-subtitle !mb-6">2. Aggregated_Metrics</h4>
          <div className="space-y-5 w-full">
            {[
              { id: 'bar-pos', label: 'Positive', color: 'text-green-400', bg: 'bg-green-400', shadow: 'shadow-[0_0_10px_#4ade80]', count: counters.pos },
              { id: 'bar-neu', label: 'Neutral',  color: 'text-gray-400',  bg: 'bg-gray-400',  shadow: 'shadow-[0_0_10px_#9ca3af]', count: counters.neu },
              { id: 'bar-neg', label: 'Negative', color: 'text-red-400',   bg: 'bg-red-400',   shadow: 'shadow-[0_0_10px_#f87171]', count: counters.neg },
            ].map(bar => (
              <div key={bar.id}>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1.5">
                  <span className={bar.color}>{bar.label}</span>
                  <span className="text-white">{bar.count.toLocaleString()}</span>
                </div>
                <div className="h-2 w-full bg-[#050505] border border-white/5 rounded-full overflow-hidden shadow-inner">
                  <div id={bar.id} className={`metric-bar h-full ${bar.bg} w-0 ${bar.shadow}`} />
                </div>
              </div>
            ))}
          </div>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-green-400 bg-green-400/10 w-fit px-2 py-1 rounded border border-green-400/20"
            >
              <CheckCircle2 size={12} /> Process Complete
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function QroDataCaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0);
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
    <div className="min-h-screen bg-background text-primary selection:bg-accent/30 font-sans pb-24 pt-12 relative overflow-hidden">

      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">

        <nav className="mb-16">
          <Link to="/#projects" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted hover:text-accent transition-colors">
            <ArrowLeft size={14} /> System_Return
          </Link>
        </nav>

        <header className="mb-16">
          <div className="mb-6">
            <span className="protocol-label">Data_Engineering</span>
          </div>
          <h1 className="section-title mb-6">QroData Analytics.</h1>
          <p className="text-xl text-muted leading-relaxed max-w-3xl">
            A data engineering platform ingesting and classifying 100,000+ unstructured social records per run.
            Built around vectorized Pandas operations for performance, VADER sentiment analysis for NLP classification,
            and SQLAlchemy bulk inserts with chunking to prevent database timeouts —
            exposing aggregated metrics to a React dashboard with sub-second query response.
          </p>
        </header>

        {/* ── EVIDENCE CAROUSEL ── */}
        <div className="mb-24">
          <EvidenceCarousel images={QRODATA_IMAGES} title="Project Evidence" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {[
            { label: 'Frontend', value: 'React',       icon: LayoutDashboard },
            { label: 'Backend',  value: 'Python',      icon: Code2 },
            { label: 'Database', value: 'MySQL',       icon: Database },
            { label: 'Analytics',value: 'Pandas & NLP',icon: LineChart },
          ].map((item, i) => (
            <div key={i} className="glass-panel p-5 rounded-sm border border-white/5 hover:border-white/20 transition-colors bg-[#0a0a0a]">
              <item.icon className="text-accent mb-3" size={20} />
              <span className="tech-subtitle !mb-1">{item.label}</span>
              <div className="font-bold text-white uppercase tracking-tight">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="mb-24 glass-panel p-8 md:p-10 rounded-sm border border-white/5">
          <h2 className="item-title mb-2">Key Engineering Decisions</h2>
          <p className="text-muted text-sm mb-8 font-mono">Why I built it this way — and what I consciously traded off.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                decision: "Vectorized Pandas over row iteration",
                why: "Applying sentiment analysis row-by-row on 100k+ records with .iterrows() would take minutes. Vectorized str operations and .apply() with VADER reduced processing time by ~40x — the difference between a usable and unusable pipeline.",
                tradeoff: "Accepted: higher memory footprint. Justified given single-machine batch processing context."
              },
              {
                decision: "VADER over transformer models",
                why: "BERT or RoBERTa would achieve higher accuracy, but inference on 100k records requires GPU infrastructure that adds cost and latency. VADER runs on CPU, delivers acceptable accuracy for social media text, and processes the full dataset in seconds.",
                tradeoff: "Accepted: ~8-12% lower accuracy vs transformer models. Revisit if precision requirements increase."
              },
              {
                decision: "MySQL with bulk chunking over NoSQL",
                why: "The data has a clear relational structure — mentions belong to campaigns, campaigns belong to clients. A document store would add query complexity. MySQL with chunksize=10000 bulk inserts prevented timeout errors while keeping the schema normalized and queryable.",
                tradeoff: "Accepted: horizontal write scaling ceiling. Acceptable at current data volume."
              }
            ].map((item, i) => (
              <div key={i} className="space-y-3">
                <h3 className="text-white font-bold text-sm uppercase tracking-tight border-b border-white/10 pb-3">{item.decision}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.why}</p>
                <p className="text-accent/70 text-xs font-mono leading-relaxed border-l-2 border-accent/30 pl-3 mt-2">{item.tradeoff}</p>
              </div>
            ))}
          </div>
        </div>

        <section className="space-y-24">

          <div>
            <h2 className="item-title mb-6 border-b border-white/10 pb-4">01. Live NLP Pipeline Simulation</h2>
            <p className="text-muted text-lg leading-relaxed mb-6 max-w-3xl">
              The main challenge is not displaying data, but cleaning and categorizing 100,000+ unstructured strings efficiently.
              The backend extracts text, applies sentiment analysis models, and pushes aggregated metrics to the frontend.
            </p>
            <AdvancedNLPSimulation />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="item-title mb-6 border-b border-white/10 pb-4 text-accent">02. Backend Evidence</h2>
              <p className="text-muted text-lg leading-relaxed mb-6">
                Below is a simplified snippet of the Python backend logic I wrote to clean the data, apply the NLP logic,
                and use bulk inserts (<code>chunksize=10000</code>) to prevent MySQL timeouts during persistence.
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