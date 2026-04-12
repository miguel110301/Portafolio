import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowUpRight, ChevronRight, FileText, Github, Terminal, Webhook, Database, Server, Cpu, Cloud, Code, Smartphone } from 'lucide-react';
import TechMatrix from '../components/TechMatrix';
import RevealText from '../components/RevealText';
import MagneticButton from '../components/MagneticButton';
import { TextRotate } from '../components/TextRotate';
import { useLanguage } from '../i18n';

const HERO_COPY = {
  es: {
    status: 'Estado_Sistemas: Operativo',
    titleLineOne: 'SOLUCIONES',
    titleLineTwo: 'DE INGENIERIA.',
    building: 'construyendo',
    rotatingTexts: [
      'SISTEMAS DE AUTOMATIZACION',
      'APIS ORIENTADAS A EVENTOS',
      'FLUJOS N8N',
      'PIPELINES DE IA',
      'APLICACIONES IOS',
    ],
    description: 'Construyo sistemas de automatizacion impulsados por IA que sustituyen por completo los flujos manuales. Me especializo en arquitecturas orientadas a eventos con n8n, Python e integraciones con LLMs, disenadas para produccion, tolerantes a fallos y listas para escalar.',
    projects: 'Proyectos',
    resume: 'CV',
    resumeHref: '/CV_Miguel_Moreno_ESP.pdf',
    repositoryHref: 'https://github.com/miguel110301/',
    repositoryProtocol: 'Codigo_Abierto',
    repositoryTitle: 'Repositorios publicos y experimentos en curso.',
    repositoryDescription: 'Explora implementaciones, pruebas tecnicas y trabajo complementario mas alla de los case studies.',
    repositoryMeta: 'github.com/miguel110301',
    stackPrompt: 'Toca un modulo para ver capacidades',
    stack: [
      { name: 'Python', color: '#FBBF24', icon: Terminal, desc: 'Arquitectura de logica backend resiliente, pipelines de datos y APIs escalables.' },
      { name: 'n8n', color: '#F97316', icon: Webhook, desc: 'Diseno de flujos complejos orientados a eventos y orquestacion entre sistemas.' },
      { name: 'Django', color: '#22C55E', icon: Database, desc: 'Construccion de aplicaciones web robustas, seguras y altamente escalables.' },
      { name: 'Swift', color: '#F97316', icon: Smartphone, desc: 'Creacion de experiencias nativas iOS con gran rendimiento y arquitectura local-first.' },
      { name: 'Linux', color: '#E2E8F0', icon: Server, desc: 'Administracion de servidores, despliegues y scripting de shell.' },
      { name: 'APIs', color: '#60A5FA', icon: Cloud, desc: 'Diseno, consumo y seguridad de arquitecturas REST.' },
      { name: 'React', color: '#22D3EE', icon: Code, desc: 'Desarrollo de interfaces interactivas y dirigidas por estado con hooks modernos.' },
      { name: 'MySQL', color: '#3B82F6', icon: Database, desc: 'Estructuracion de bases relacionales para entornos de alta concurrencia.' },
      { name: 'VPS', color: '#A855F7', icon: Cpu, desc: 'Configuracion, despliegue y mantenimiento de infraestructura privada.' },
    ],
  },
  en: {
    status: 'Systems_Status: Operational',
    titleLineOne: 'ENGINEERING',
    titleLineTwo: 'SOLUTIONS.',
    building: 'building',
    rotatingTexts: [
      'AUTOMATION SYSTEMS',
      'EVENT-DRIVEN APIS',
      'N8N WORKFLOWS',
      'AI PIPELINES',
      'IOS APPLICATIONS',
    ],
    description: 'I build AI-powered automation systems that replace manual workflows entirely. Specializing in event-driven architectures with n8n, Python, and LLM integrations, designed for production, fault-tolerant, and built to scale.',
    projects: 'Projects',
    resume: 'Resume',
    resumeHref: '/CV_Miguel_Moreno.pdf',
    repositoryHref: 'https://github.com/miguel110301/',
    repositoryProtocol: 'Open_Source',
    repositoryTitle: 'Public repositories and ongoing experiments.',
    repositoryDescription: 'Browse implementations, technical experiments, and supporting work beyond the case studies.',
    repositoryMeta: 'github.com/miguel110301',
    stackPrompt: 'Tap a module to view capabilities',
    stack: [
      { name: 'Python', color: '#FBBF24', icon: Terminal, desc: 'Architecting resilient backend logic, data pipelines, and scalable APIs.' },
      { name: 'n8n', color: '#F97316', icon: Webhook, desc: 'Designing complex, event-driven workflows and system orchestrations.' },
      { name: 'Django', color: '#22C55E', icon: Database, desc: 'Building robust, secure, and highly scalable web applications.' },
      { name: 'Swift', color: '#F97316', icon: Smartphone, desc: 'Crafting performant, native iOS experiences with local-first architectures.' },
      { name: 'Linux', color: '#E2E8F0', icon: Server, desc: 'Managing server environments, deployments, and shell scripting.' },
      { name: 'APIs', color: '#60A5FA', icon: Cloud, desc: 'Designing, consuming, and securing RESTful architectures.' },
      { name: 'React', color: '#22D3EE', icon: Code, desc: 'Developing interactive, state-driven frontends with modern hooks.' },
      { name: 'MySQL', color: '#3B82F6', icon: Database, desc: 'Structuring relational databases for high-concurrency environments.' },
      { name: 'VPS', color: '#A855F7', icon: Cpu, desc: 'Configuring, deploying, and maintaining private server infrastructure.' },
    ],
  },
};

function MobileStack({ stack, idleLabel }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-3 mb-4">
        {stack.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(selected?.name === item.name ? null : item)}
            className="w-full h-20 rounded-2xl flex flex-col items-center justify-center border bg-[#121212] cursor-pointer transition-all duration-300"
            style={{
              borderColor: selected?.name === item.name ? item.color + '80' : 'rgba(255,255,255,0.1)',
              background: selected?.name === item.name ? 'rgba(18,18,18,0.9)' : '#121212',
              boxShadow: selected?.name === item.name
                ? `-4px 4px 0px ${item.color}30`
                : '-4px 4px 0px rgba(0,0,0,0.5)',
            }}
          >
            <item.icon color={selected?.name === item.name ? item.color : item.color + '99'} size={22} className="mb-1.5" />
            <span className="text-[9px] font-bold tracking-wider text-white/80 uppercase">
              {item.name}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="h-12 flex items-center justify-center">
        {selected ? (
          <motion.p
            key={selected.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-sm"
          >
            <strong className="text-white mr-1">{selected.name}:</strong>
            <span className="text-muted/90">{selected.desc}</span>
          </motion.p>
        ) : (
          <p className="text-muted/40 text-xs font-mono animate-pulse">
            {idleLabel}
          </p>
        )}
      </div>

      <div className="mt-1 text-right">
        <span className="text-[9px] font-mono text-muted/40 uppercase tracking-[0.4em]">
          Dev_Stack.v2026
        </span>
      </div>
    </div>
  );
}

function Hero() {
  const { language } = useLanguage();
  const copy = HERO_COPY[language];
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section ref={containerRef} id="hero" className="relative flex items-start pt-24 md:pt-44 pb-16 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
        <motion.div style={{ opacity, y, scale }} className="lg:col-span-7 flex flex-col items-start">
          <RevealText delay={0}>
            <div className="flex items-center gap-3 px-3 py-1.5 rounded-sm border border-white/10 bg-white/5 mb-8 w-fit">
              <span className="flex h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              <span className="protocol-label !mb-0 !opacity-100">{copy.status}</span>
            </div>
          </RevealText>

          <RevealText as="h1" className="section-title mb-6 leading-[0.9]" delay={0.1}>
            {copy.titleLineOne} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/50 to-transparent">
              {copy.titleLineTwo}
            </span>
          </RevealText>

          <div className="flex items-center gap-3 mb-10 overflow-hidden">
            <span className="text-[11px] font-mono text-white/30 uppercase tracking-[0.3em] shrink-0">
              {copy.building}
            </span>
            <TextRotate
              texts={copy.rotatingTexts}
              mainClassName="text-[11px] font-mono text-accent uppercase tracking-[0.3em]"
              rotationInterval={2500}
              staggerDuration={0.03}
              staggerFrom="first"
              splitBy="characters"
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            />
          </div>

          <p className="text-base md:text-lg text-muted max-w-lg font-medium leading-relaxed border-l-2 border-white/10 pl-6">
            {copy.description}
          </p>

          <div className="mt-10 flex w-full max-w-2xl flex-col gap-3">
            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
              <MagneticButton>
                <a href="/#projects" className="group flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/90 transition-all">
                  {copy.projects} <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href={copy.resumeHref} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 border border-white/10 px-6 py-3 rounded-full font-semibold text-sm hover:border-white/30 hover:bg-white/5 backdrop-blur-sm transition-all text-white/80 hover:text-white">
                  <FileText size={14} /> {copy.resume}
                </a>
              </MagneticButton>
            </div>

            <motion.a
              href={copy.repositoryHref}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2, ease: 'easeOut' }}
              className="group glass-panel w-full rounded-[1.5rem] border border-white/10 px-5 py-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 gap-4">
                  <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/70 transition-colors duration-300 group-hover:text-white">
                    <Github size={18} />
                  </div>
                  <div className="min-w-0">
                    <span className="tech-subtitle !mb-2">{copy.repositoryProtocol}</span>
                    <p className="text-sm font-semibold text-white md:text-base">{copy.repositoryTitle}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{copy.repositoryDescription}</p>
                  </div>
                </div>
                <ArrowUpRight size={18} className="mt-1 shrink-0 text-white/25 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white/70" />
              </div>

              <div className="mt-4 flex items-center gap-2 text-[10px] font-mono tracking-[0.18em] text-white/30 sm:text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
                <span>{copy.repositoryMeta}</span>
              </div>
            </motion.a>
          </div>
        </motion.div>

        <div className="lg:col-span-5 hidden lg:block sticky top-44">
          <TechMatrix stack={copy.stack} idleLabel={copy.stackPrompt} />
          <div className="mt-8 flex justify-end">
            <div className="text-[9px] font-mono text-muted/40 uppercase tracking-[0.4em] rotate-90 origin-right translate-y-12">
              Dev_Stack.v2026
            </div>
          </div>
        </div>

        <div className="lg:hidden col-span-1 mt-8">
          <MobileStack stack={copy.stack} idleLabel={copy.stackPrompt} />
        </div>
      </div>

      <div className="absolute right-10 bottom-20 hidden md:block">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-16 bg-gradient-to-b from-accent to-transparent"
        />
      </div>
    </section>
  );
}

export default Hero;
