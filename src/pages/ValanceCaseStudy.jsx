import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Smartphone, Database, ShieldCheck, CreditCard, Wallet, BarChart2 } from 'lucide-react';
import EvidenceCarousel from '../components/EvidenceCarousel';
import { useLanguage } from '../i18n';

const VALANCE_IMAGES = [
  '/proyectos/valance/1.png',
  '/proyectos/valance/2.png',
  '/proyectos/valance/3.png',
  '/proyectos/valance/4.png',
  '/proyectos/valance/5.png',
  '/proyectos/valance/6.png',
  '/proyectos/valance/7.png',
  '/proyectos/valance/8.png',
  '/proyectos/valance/9.png',
  '/proyectos/valance/10.png',
  '/proyectos/valance/11.png',
  '/proyectos/valance/12.png',
  '/proyectos/valance/13.png',
];

const VALANCE_COPY = {
  es: {
    back: 'Volver_Al_Sistema',
    protocol: 'Desarrollo_Nativo_iOS',
    title: 'Valance.',
    intro: 'Aplicacion de finanzas personales local-first construida de forma nativa para el ecosistema Apple. Valance calcula liquidez real, no solo saldos bancarios, combinando cuentas de debito, deuda de tarjetas con modelado de fecha de corte y pago, y un sistema de arqueo de efectivo. Toda la data vive en el dispositivo via CoreData protegida por FaceID. Cero requests de red. Cero suscripciones. Cero exposicion de datos.',
    evidenceTitle: 'Capturas de la app',
    labels: [
      'Pantalla inicial - Valance instalada en el dispositivo',
      'Pantalla de bloqueo - proteccion biometrica FaceID',
      'Onboarding - configuracion del perfil',
      'Onboarding - registro de cuenta de debito',
      'Onboarding - arqueo de caja',
      'Onboarding - configuracion de tarjeta con corte y pago',
      'Dashboard - overview de patrimonio y liquidez real',
      'Cuentas - vista del portafolio multi-cuenta',
      'Cuentas - hoja de accion para agregar cuenta',
      'Registro de gasto - flujo de arqueo en efectivo',
      'Transaccion - formulario de gasto con metodo de pago',
      'Transaccion - formulario de ingreso',
      'Cuentas - detalle del arqueo de caja',
    ],
    summary: [
      { label: 'Lenguaje', value: 'Swift', icon: Smartphone },
      { label: 'Persistencia', value: 'CoreData', icon: Database },
      { label: 'Auth', value: 'FaceID / LocalAuth', icon: ShieldCheck },
      { label: 'Arquitectura', value: 'Local-First', icon: BarChart2 },
    ],
    decisionsTitle: 'Decisiones clave de ingenieria',
    decisionsSubtitle: 'Por que lo construi asi y que tradeoffs acepte conscientemente.',
    decisions: [
      {
        decision: 'Local-First sobre sincronizacion en la nube',
        why: 'La informacion financiera es la mas sensible que una persona carga. Enviar patrimonio, deuda y patrones de gasto a un servidor, incluso cifrados, crea una responsabilidad innecesaria. CoreData on-device da lecturas sub-milisegundo, funciona offline y vuelve estructuralmente imposible una brecha de datos.',
        tradeoff: 'Aceptado: no hay sync entre dispositivos. Se revisa con CloudKit si la demanda real lo justifica.',
      },
      {
        decision: 'Arqueo de caja como feature de primer nivel',
        why: 'La mayoria de apps financieras trata el efectivo como un campo manual secundario. La liquidez real exige contar billetes y monedas. Por eso construí un contador por denominaciones que convierte efectivo fisico en una clase de activo real dentro del portafolio.',
        tradeoff: 'Aceptado: requiere actualizar el conteo manualmente. Esa disciplina es UX intencional, no un bug.',
      },
      {
        decision: 'Modelado de fecha de corte y pago',
        why: 'Saldo no es igual a deuda real. Una tarjeta con 9,000 y fecha de pago manana no se comporta igual que otra con pago en tres semanas. Valance modela esto explicitamente y muestra urgencia real por tarjeta.',
        tradeoff: 'Aceptado: onboarding mas complejo. La precision financiera pesa mas que un setup mas corto.',
      },
    ],
    featuresTitle: 'Arquitectura de funcionalidades centrales',
    features: [
      {
        icon: ShieldCheck,
        title: 'Capa de bloqueo biometrico',
        desc: 'Framework LocalAuthentication con FaceID como metodo principal y passcode del dispositivo como fallback. La app renderiza una lock screen al volver a foreground para evitar shoulder surfing y accesos no autorizados incluso con el dispositivo desbloqueado.',
      },
      {
        icon: Wallet,
        title: 'Motor de liquidez real',
        desc: 'Patrimonio = suma de cuentas de debito + efectivo arqueado - deuda total de tarjetas. Valance lo calcula en tiempo real desde fetch requests de CoreData y entrega un numero que representa dinero verdaderamente disponible.',
      },
      {
        icon: CreditCard,
        title: 'Inteligencia para tarjetas de credito',
        desc: 'Cada tarjeta guarda limite, deuda actual, dia de corte y dia de pago. La app calcula dias restantes por tarjeta y las ordena por urgencia para que el usuario sepa cual deuda vence primero.',
      },
      {
        icon: Database,
        title: 'Persistencia con CoreData',
        desc: 'Entidades: Account, CreditCard, Transaction y CashCount. Las relaciones estan normalizadas con reglas de borrado en cascada. Todas las escrituras pasan por un solo NSManagedObjectContext en el hilo principal, eliminando bugs de concurrencia comunes en arquitecturas multi-contexto.',
      },
    ],
  },
  en: {
    back: 'System_Return',
    protocol: 'iOS_Native_Development',
    title: 'Valance.',
    intro: 'Local-first personal finance application built natively for the Apple ecosystem. Valance tracks real liquidity, not just bank balances, by combining debit accounts, credit card debt with cut and pay date modeling, and a physical cash count system. All data lives on-device through CoreData behind FaceID biometric protection. Zero network requests. Zero subscriptions. Zero data exposure.',
    evidenceTitle: 'App Screenshots',
    labels: [
      'Home screen - Valance installed on device',
      'Lock screen - FaceID biometric protection',
      'Onboarding - user profile setup',
      'Onboarding - debit account registration',
      'Onboarding - cash count setup',
      'Onboarding - credit card setup with cut and pay dates',
      'Dashboard - net worth overview with real liquidity',
      'Accounts - multi-account portfolio view',
      'Accounts - add account action sheet',
      'Expense registration - cash count flow',
      'Transaction - expense form with payment method',
      'Transaction - income registration form',
      'Accounts - detailed cash count breakdown',
    ],
    summary: [
      { label: 'Language', value: 'Swift', icon: Smartphone },
      { label: 'Persistence', value: 'CoreData', icon: Database },
      { label: 'Auth', value: 'FaceID / LocalAuth', icon: ShieldCheck },
      { label: 'Architecture', value: 'Local-First', icon: BarChart2 },
    ],
    decisionsTitle: 'Key Engineering Decisions',
    decisionsSubtitle: 'Why I built it this way and which tradeoffs I accepted deliberately.',
    decisions: [
      {
        decision: 'Local-First over cloud sync',
        why: 'Financial information is the most sensitive data a person carries. Sending net worth, debt, and spending patterns to a server, even encrypted, creates unnecessary liability. CoreData on-device gives sub-millisecond reads, works offline, and makes a data breach structurally impossible.',
        tradeoff: 'Accepted: no cross-device sync. Revisit with CloudKit if real demand justifies it.',
      },
      {
        decision: 'Cash count as a first-class feature',
        why: 'Most finance apps treat cash as an afterthought. Real liquidity requires counting bills and coins. I built a denomination-based counter that turns physical cash into a real asset class inside the portfolio.',
        tradeoff: 'Accepted: requires manual updates. That discipline is intentional UX, not a bug.',
      },
      {
        decision: 'Cut and pay date modeling',
        why: 'Balance is not the same as real debt. A card showing 9,000 due tomorrow behaves very differently from one due in three weeks. Valance models that explicitly and surfaces actual urgency per card.',
        tradeoff: 'Accepted: more complex onboarding. Financial accuracy matters more than a shorter setup.',
      },
    ],
    featuresTitle: 'Core Feature Architecture',
    features: [
      {
        icon: ShieldCheck,
        title: 'Biometric Lock Layer',
        desc: 'LocalAuthentication with FaceID as primary method and device passcode as fallback. The app renders a lock screen on foreground restore to prevent shoulder surfing and unauthorized access even when the phone is unlocked.',
      },
      {
        icon: Wallet,
        title: 'Real Liquidity Engine',
        desc: 'Net worth equals debit accounts plus counted cash minus total credit card debt. Valance computes it in real time from CoreData fetches and returns a number that reflects money actually available.',
      },
      {
        icon: CreditCard,
        title: 'Credit Card Intelligence',
        desc: 'Each card stores limit, current debt, cut day, and pay day. The app calculates remaining days per card and sorts cards by urgency so users always know which debt is most time-sensitive.',
      },
      {
        icon: Database,
        title: 'CoreData Persistence',
        desc: 'Entities: Account, CreditCard, Transaction, and CashCount. Relationships are normalized with cascade delete rules. All writes go through a single NSManagedObjectContext on the main thread, eliminating concurrency bugs common in multi-context setups.',
      },
    ],
  },
};

export default function ValanceCaseStudy() {
  const { language } = useLanguage();
  const copy = VALANCE_COPY[language];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-primary selection:bg-accent/30 font-sans pb-24 pt-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <nav className="mb-16">
          <Link to="/#projects" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted hover:text-accent transition-colors">
            <ArrowLeft size={14} /> {copy.back}
          </Link>
        </nav>

        <header className="mb-16">
          <div className="mb-6">
            <span className="protocol-label" style={{ color: '#a855f7' }}>{copy.protocol}</span>
          </div>
          <h1 className="section-title mb-6">{copy.title}</h1>
          <p className="text-xl text-muted leading-relaxed max-w-3xl">
            {copy.intro}
          </p>
        </header>

        <div className="mb-24">
          <EvidenceCarousel images={VALANCE_IMAGES} labels={copy.labels} title={copy.evidenceTitle} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {copy.summary.map((item, i) => (
            <div key={i} className="glass-panel p-5 rounded-sm border border-white/5 hover:border-purple-500/30 transition-colors bg-[#0a0a0a]">
              <item.icon className="mb-3" size={20} style={{ color: '#a855f7' }} />
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
                <p className="text-xs font-mono leading-relaxed border-l-2 pl-3 mt-2" style={{ color: '#a855f7', borderColor: '#a855f750' }}>{item.tradeoff}</p>
              </div>
            ))}
          </div>
        </div>

        <section className="space-y-16">
          <div>
            <h2 className="item-title mb-6 border-b border-white/10 pb-4">{copy.featuresTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {copy.features.map((item, i) => (
                <div key={i} className="glass-panel p-6 rounded-sm border border-white/5 hover:border-purple-500/20 transition-colors bg-[#0a0a0a]">
                  <item.icon className="mb-4" size={20} style={{ color: '#a855f7' }} />
                  <h3 className="font-bold text-white text-sm uppercase tracking-tight mb-3">{item.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
