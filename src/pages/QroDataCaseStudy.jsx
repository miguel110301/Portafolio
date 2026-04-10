import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Database, Code2, Play, LayoutDashboard, BrainCircuit, Activity, LineChart, CheckCircle2, RefreshCw, MessageSquareText } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';
import EvidenceCarousel from '../components/EvidenceCarousel';
import { useLanguage } from '../i18n';

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

const QRODATA_COPY = {
  es: {
    back: 'Volver_Al_Sistema',
    protocol: 'Ingenieria_De_Datos',
    title: 'QroData Analytics.',
    intro: 'Plataforma de ingenieria de datos que ingiere y clasifica mas de 100,000 registros sociales no estructurados por corrida. Se apoya en operaciones vectorizadas con Pandas para rendimiento, analisis de sentimiento con VADER para clasificacion NLP e inserciones masivas con SQLAlchemy y chunking para evitar timeouts, exponiendo metricas agregadas hacia un dashboard en React con consultas sub-segundo.',
    evidenceTitle: 'Evidencia del proyecto',
    summary: [
      { label: 'Frontend', value: 'React', icon: LayoutDashboard },
      { label: 'Backend', value: 'Python', icon: Code2 },
      { label: 'Base de Datos', value: 'MySQL', icon: Database },
      { label: 'Analitica', value: 'Pandas y NLP', icon: LineChart },
    ],
    decisionsTitle: 'Decisiones clave de ingenieria',
    decisionsSubtitle: 'Por que lo construi asi y que tradeoffs acepte conscientemente.',
    decisions: [
      {
        decision: 'Pandas vectorizado sobre iteracion por fila',
        why: 'Aplicar analisis de sentimiento fila por fila sobre mas de 100k registros con .iterrows() tomaria minutos. Operaciones vectorizadas con str y .apply() junto a VADER redujeron el tiempo de proceso alrededor de 40x.',
        tradeoff: 'Aceptado: mayor consumo de memoria. Justificado para un contexto batch en una sola maquina.',
      },
      {
        decision: 'VADER sobre modelos transformer',
        why: 'BERT o RoBERTa darian mejor accuracy, pero inferir 100k registros requiere GPU y agrega costo y latencia. VADER corre en CPU, mantiene precision suficiente para texto social y procesa el dataset completo en segundos.',
        tradeoff: 'Aceptado: entre 8 y 12% menos precision que un transformer. Se revisa si la necesidad de exactitud aumenta.',
      },
      {
        decision: 'MySQL con chunking sobre NoSQL',
        why: 'La data tiene estructura relacional clara: menciones pertenecen a campanas y campanas a clientes. Un document store agregaria complejidad de consulta. MySQL con inserts bulk y chunksize=10000 evito timeouts manteniendo un esquema normalizado y consultable.',
        tradeoff: 'Aceptado: techo de escalado horizontal en escritura. Adecuado al volumen actual.',
      },
    ],
    simulationTitle: '01. Simulacion del pipeline NLP',
    simulationDescription: 'El reto principal no es mostrar datos, sino limpiar y categorizar mas de 100,000 strings no estructurados con eficiencia. El backend extrae texto, aplica modelos de sentimiento y expone metricas agregadas al frontend.',
    backendTitle: '02. Evidencia backend',
    backendDescription: 'Debajo se ve un fragmento simplificado de la logica Python que escribi para limpiar datos, aplicar la clasificacion NLP y usar bulk inserts con <code>chunksize=10000</code> para evitar timeouts en MySQL durante la persistencia.',
    code: `import pandas as pd
from sqlalchemy import create_engine
from textblob import SentimentIntensityAnalyzer

def process_social_mentions(raw_data_json):
    # 1. Ingesta del payload con mas de 100k registros no estructurados
    df = pd.DataFrame(raw_data_json)

    # 2. Operaciones de limpieza vectorizadas
    df['clean_text'] = df['text'].str.replace(r'http\\S+|www.\\S+', '', regex=True)
    df.dropna(subset=['clean_text'], inplace=True)

    # 3. Analisis de sentimiento con Vader
    analyzer = SentimentIntensityAnalyzer()
    df['score'] = df['clean_text'].apply(lambda x: analyzer.polarity_scores(x)['compound'])

    # 4. Clasificacion por umbrales
    df['sentiment'] = pd.cut(df['score'], bins=[-1, -0.05, 0.05, 1], labels=['Neg', 'Neu', 'Pos'])

    # 5. Metricas agregadas para el dashboard React
    summary = df.groupby('sentiment').size().reset_index(name='count')

    # 6. Persistencia rapida con chunking
    engine = create_engine('mysql+pymysql://user:pass@db_host/qrodata')
    df.to_sql('mentions', con=engine, if_exists='append', index=False, chunksize=10000)

    return summary.to_dict('records')`,
    simulation: {
      header: 'Pipeline NLP de Social Listening',
      running: 'Procesando 100k filas...',
      trigger: 'Ejecutar pipeline',
      tweets: [
        'El servicio en la sucursal estuvo increible hoy...',
        'Llevo 2 horas esperando respuesta, pesimo...',
        'Acaban de anunciar los nuevos horarios...',
        'Me resolvieron el problema en 5 minutos...',
        'La plataforma sigue cayendose a cada rato...',
        'Gran mejora en la ultima actualizacion...',
        'Alguien sabe si abren manana?',
        'Muy mala experiencia con soporte...',
        'Todo funciono perfecto al primer intento...',
        'Informacion util, gracias por compartir.',
      ],
      awaiting: 'Esperando trigger...',
      rawIngestion: 'Ingesta cruda',
      rowsExtracted: 'Filas extraidas',
      aggregated: 'Metricas agregadas',
      positive: 'Positivo',
      neutral: 'Neutral',
      negative: 'Negativo',
      complete: 'Proceso completo',
    },
  },
  en: {
    back: 'System_Return',
    protocol: 'Data_Engineering',
    title: 'QroData Analytics.',
    intro: 'Data engineering platform ingesting and classifying 100,000+ unstructured social records per run. It relies on vectorized Pandas operations for performance, VADER sentiment analysis for NLP classification, and bulk SQLAlchemy inserts with chunking to avoid timeouts, exposing aggregated metrics to a React dashboard with sub-second queries.',
    evidenceTitle: 'Project Evidence',
    summary: [
      { label: 'Frontend', value: 'React', icon: LayoutDashboard },
      { label: 'Backend', value: 'Python', icon: Code2 },
      { label: 'Database', value: 'MySQL', icon: Database },
      { label: 'Analytics', value: 'Pandas & NLP', icon: LineChart },
    ],
    decisionsTitle: 'Key Engineering Decisions',
    decisionsSubtitle: 'Why I built it this way and which tradeoffs I accepted deliberately.',
    decisions: [
      {
        decision: 'Vectorized Pandas over row iteration',
        why: 'Applying sentiment analysis row by row over 100k+ records with .iterrows() would take minutes. Vectorized string operations plus .apply() with VADER cut processing time by roughly 40x.',
        tradeoff: 'Accepted: higher memory footprint. Justified for a single-machine batch workload.',
      },
      {
        decision: 'VADER over transformer models',
        why: 'BERT or RoBERTa would improve accuracy, but inferring 100k records requires GPU infrastructure and adds cost and latency. VADER runs on CPU, keeps acceptable accuracy for social text, and processes the whole dataset in seconds.',
        tradeoff: 'Accepted: roughly 8 to 12% less accuracy than a transformer. Revisit if precision requirements increase.',
      },
      {
        decision: 'MySQL with chunking over NoSQL',
        why: 'The data has a clear relational shape: mentions belong to campaigns and campaigns belong to clients. A document store would add query complexity. MySQL with bulk inserts and chunksize=10000 prevented timeouts while keeping a normalized, queryable schema.',
        tradeoff: 'Accepted: horizontal write scaling ceiling. Fine at the current volume.',
      },
    ],
    simulationTitle: '01. Live NLP Pipeline Simulation',
    simulationDescription: 'The hard part is not rendering data, but cleaning and categorizing 100,000+ unstructured strings efficiently. The backend extracts text, applies sentiment models, and exposes aggregated metrics to the frontend.',
    backendTitle: '02. Backend Evidence',
    backendDescription: 'Below is a simplified snippet of the Python logic I wrote to clean data, apply NLP classification, and use bulk inserts with <code>chunksize=10000</code> to prevent MySQL timeouts during persistence.',
    code: `import pandas as pd
from sqlalchemy import create_engine
from textblob import SentimentIntensityAnalyzer

def process_social_mentions(raw_data_json):
    # 1. Ingest payload containing 100k+ unstructured records
    df = pd.DataFrame(raw_data_json)

    # 2. Vectorized cleaning operations
    df['clean_text'] = df['text'].str.replace(r'http\\S+|www.\\S+', '', regex=True)
    df.dropna(subset=['clean_text'], inplace=True)

    # 3. Sentiment analysis with Vader
    analyzer = SentimentIntensityAnalyzer()
    df['score'] = df['clean_text'].apply(lambda x: analyzer.polarity_scores(x)['compound'])

    # 4. Categorize by score thresholds
    df['sentiment'] = pd.cut(df['score'], bins=[-1, -0.05, 0.05, 1], labels=['Neg', 'Neu', 'Pos'])

    # 5. Aggregate metrics for the React dashboard
    summary = df.groupby('sentiment').size().reset_index(name='count')

    # 6. Fast persistence with chunking
    engine = create_engine('mysql+pymysql://user:pass@db_host/qrodata')
    df.to_sql('mentions', con=engine, if_exists='append', index=False, chunksize=10000)

    return summary.to_dict('records')`,
    simulation: {
      header: 'Social Listening NLP Pipeline',
      running: 'Processing 100k Rows...',
      trigger: 'Execute Pipeline',
      tweets: [
        'Service at the branch was incredible today...',
        'I have been waiting 2 hours for a reply, terrible...',
        'They just announced the new schedule...',
        'They solved my issue in 5 minutes...',
        'The platform keeps crashing constantly...',
        'Great improvement in the latest update...',
        'Does anyone know if they open tomorrow?',
        'Very bad experience with support...',
        'Everything worked perfectly on the first try...',
        'Useful information, thanks for sharing.',
      ],
      awaiting: 'Awaiting trigger...',
      rawIngestion: 'Raw Ingestion',
      rowsExtracted: 'Rows Extracted',
      aggregated: 'Aggregated Metrics',
      positive: 'Positive',
      neutral: 'Neutral',
      negative: 'Negative',
      complete: 'Process Complete',
    },
  },
};

function AdvancedNLPSimulation({ copy }) {
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [counters, setCounters] = useState({ total: 0, pos: 0, neu: 0, neg: 0 });

  useEffect(() => {
    setIsRunning(false);
    setIsComplete(false);
    setCounters({ total: 0, pos: 0, neu: 0, neg: 0 });
  }, [copy]);

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
      },
    });

    tl.add({
      targets: '.nlp-brain',
      scale: [1, 1.2, 1],
      rotate: '1turn',
      boxShadow: ['0 0 0px rgba(56,189,248,0)', '0 0 40px rgba(56,189,248,0.6)', '0 0 0px rgba(56,189,248,0)'],
      duration: 2500,
      easing: 'easeInOutSine',
    }, 0);

    tl.add({
      targets: '.stream-item',
      opacity: [0, 1, 0],
      translateX: [-40, 0, 40],
      duration: 1200,
      delay: window.anime.stagger(200),
      easing: 'easeOutQuad',
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
      update() {
        setCounters({ total: counterObj.total, pos: counterObj.pos, neu: counterObj.neu, neg: counterObj.neg });
      },
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
          <span className="font-bold text-sm text-white">{copy.simulation.header}</span>
        </div>
        <button
          onClick={startEngine}
          disabled={isRunning}
          className="bg-accent/10 hover:bg-accent/20 border border-accent/30 disabled:opacity-50 text-accent px-4 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
        >
          {isRunning ? <RefreshCw size={12} className="animate-spin" /> : <Play size={12} fill="currentColor" />}
          {isRunning ? copy.simulation.running : copy.simulation.trigger}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-[#121212] border border-white/5 rounded-sm p-4 relative h-48 md:h-64 overflow-hidden">
          <h4 className="tech-subtitle !mb-4">1. {copy.simulation.rawIngestion}</h4>
          <div className="absolute top-14 left-4 right-4 flex flex-col gap-2">
            {copy.simulation.tweets.map((tweet, i) => (
              <div key={i} className="stream-item opacity-0 text-[10px] text-white/60 bg-white/5 border border-white/10 p-2.5 rounded-sm font-mono truncate flex items-center gap-2 shadow-lg">
                <MessageSquareText size={12} className="text-muted shrink-0" />
                {tweet}
              </div>
            ))}
          </div>
          {!isRunning && !isComplete && (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-muted font-mono animate-pulse bg-[#121212]/80 backdrop-blur-sm z-10">
              {copy.simulation.awaiting}
            </div>
          )}
        </div>

        <div className="bg-[#121212] border border-white/5 rounded-sm p-4 flex flex-col items-center justify-center h-48 md:h-64 relative overflow-hidden">
          <div className="absolute inset-0 bg-accent/5 blur-3xl rounded-full" />
          <div className="nlp-brain w-20 h-20 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center mb-6 relative z-10">
            <BrainCircuit size={32} className={isRunning ? 'text-accent' : 'text-muted'} />
          </div>
          <div className="text-4xl md:text-5xl font-black font-mono text-white tracking-tighter relative z-10">
            {counters.total.toLocaleString()}
          </div>
          <div className="tech-subtitle !mt-2 relative z-10">{copy.simulation.rowsExtracted}</div>
        </div>

        <div className="bg-[#121212] border border-white/5 rounded-sm p-4 flex flex-col justify-center h-48 md:h-64">
          <h4 className="tech-subtitle !mb-6">2. {copy.simulation.aggregated}</h4>
          <div className="space-y-5 w-full">
            {[
              { id: 'bar-pos', label: copy.simulation.positive, color: 'text-green-400', bg: 'bg-green-400', shadow: 'shadow-[0_0_10px_#4ade80]', count: counters.pos },
              { id: 'bar-neu', label: copy.simulation.neutral, color: 'text-gray-400', bg: 'bg-gray-400', shadow: 'shadow-[0_0_10px_#9ca3af]', count: counters.neu },
              { id: 'bar-neg', label: copy.simulation.negative, color: 'text-red-400', bg: 'bg-red-400', shadow: 'shadow-[0_0_10px_#f87171]', count: counters.neg },
            ].map((bar) => (
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
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-green-400 bg-green-400/10 w-fit px-2 py-1 rounded border border-green-400/20">
              <CheckCircle2 size={12} /> {copy.simulation.complete}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function QroDataCaseStudy() {
  const { language } = useLanguage();
  const copy = QRODATA_COPY[language];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-primary selection:bg-accent/30 font-sans pb-24 pt-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <nav className="mb-16">
          <Link to="/#projects" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted hover:text-accent transition-colors">
            <ArrowLeft size={14} /> {copy.back}
          </Link>
        </nav>

        <header className="mb-16">
          <div className="mb-6">
            <span className="protocol-label">{copy.protocol}</span>
          </div>
          <h1 className="section-title mb-6">{copy.title}</h1>
          <p className="text-xl text-muted leading-relaxed max-w-3xl">
            {copy.intro}
          </p>
        </header>

        <div className="mb-24">
          <EvidenceCarousel images={QRODATA_IMAGES} title={copy.evidenceTitle} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {copy.summary.map((item, i) => (
            <div key={i} className="glass-panel p-5 rounded-sm border border-white/5 hover:border-white/20 transition-colors bg-[#0a0a0a]">
              <item.icon className="text-accent mb-3" size={20} />
              <span className="tech-subtitle !mb-1">{item.label}</span>
              <div className="font-bold text-white uppercase tracking-tight">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="mb-24 glass-panel p-8 md:p-10 rounded-sm border border-white/5">
          <h2 className="item-title mb-2">{copy.decisionsTitle}</h2>
          <p className="text-muted text-sm mb-8 font-mono">{copy.decisionsSubtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {copy.decisions.map((item, i) => (
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
            <h2 className="item-title mb-6 border-b border-white/10 pb-4">{copy.simulationTitle}</h2>
            <p className="text-muted text-lg leading-relaxed mb-6 max-w-3xl">
              {copy.simulationDescription}
            </p>
            <AdvancedNLPSimulation copy={copy} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="item-title mb-6 border-b border-white/10 pb-4 text-accent">{copy.backendTitle}</h2>
              <p className="text-muted text-lg leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: copy.backendDescription }} />
            </div>
            <div className="rounded-sm overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl relative">
              <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/10">
                <span className="tech-subtitle !mb-0 !tracking-widest">pipeline.py</span>
              </div>
              <div className="text-xs md:text-sm font-mono text-gray-300">
                <SyntaxHighlighter language="python" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: '1.5rem', margin: 0 }}>
                  {copy.code}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
