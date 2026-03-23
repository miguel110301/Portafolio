import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Smartphone, Database, ShieldCheck, CreditCard, Wallet, BarChart2 } from 'lucide-react';
import EvidenceCarousel from '../components/EvidenceCarousel';

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

const VALANCE_LABELS = [
  'Home screen — Valance installed on device',
  'Lock screen — FaceID biometric protection',
  'Onboarding — User profile setup',
  'Onboarding — Debit account registration',
  'Onboarding — Cash count (Arqueo de Caja)',
  'Onboarding — Credit card setup with cut/pay dates',
  'Dashboard — Net worth overview with real liquidity',
  'Accounts — Multi-account portfolio view',
  'Accounts — Add account action sheet',
  'Expense registration — Cash arqueo flow',
  'Transaction — Expense form with payment method',
  'Transaction — Income registration form',
  'Accounts — Detailed Arqueo de Caja breakdown',
];

export default function ValanceCaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-primary selection:bg-accent/30 font-sans pb-24 pt-12 relative overflow-hidden">

      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">

        <nav className="mb-16">
          <Link to="/#projects" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted hover:text-accent transition-colors">
            <ArrowLeft size={14} /> System_Return
          </Link>
        </nav>

        <header className="mb-16">
          <div className="mb-6">
            <span className="protocol-label" style={{ color: '#a855f7' }}>iOS_Native_Development</span>
          </div>
          <h1 className="section-title mb-6">Valance.</h1>
          <p className="text-xl text-muted leading-relaxed max-w-3xl">
            A local-first personal finance application built natively for the Apple ecosystem.
            Valance tracks real liquidity — not just bank balances — by combining debit accounts,
            credit card debt with cut/pay dates, and a physical cash count system (Arqueo de Caja).
            All data lives on-device via CoreData, protected behind FaceID biometric authentication.
            Zero network requests. Zero subscriptions. Zero data exposure.
          </p>
        </header>

        {/* Evidence Carousel */}
        <div className="mb-24">
          <EvidenceCarousel
            images={VALANCE_IMAGES}
            labels={VALANCE_LABELS}
            title="App Screenshots"
          />
        </div>

        {/* Stack */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {[
            { label: 'Language',      value: 'Swift',          icon: Smartphone  },
            { label: 'Persistence',   value: 'CoreData',       icon: Database    },
            { label: 'Auth',          value: 'FaceID / LocalAuth', icon: ShieldCheck },
            { label: 'Architecture',  value: 'Local-First',    icon: BarChart2   },
          ].map((item, i) => (
            <div key={i} className="glass-panel p-5 rounded-sm border border-white/5 hover:border-purple-500/30 transition-colors bg-[#0a0a0a]">
              <item.icon className="mb-3" size={20} style={{ color: '#a855f7' }} />
              <span className="tech-subtitle !mb-1">{item.label}</span>
              <div className="font-bold text-white uppercase tracking-tight">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Key Engineering Decisions */}
        <div className="mb-24 glass-panel p-8 md:p-10 rounded-sm border border-white/5">
          <h2 className="item-title mb-2">Key Engineering Decisions</h2>
          <p className="text-muted text-sm mb-8 font-mono">Why I built it this way — and what I consciously traded off.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                decision: "Local-First over cloud sync",
                why: "Financial data is the most sensitive data a person carries. Sending net worth, debt levels, and spending patterns to a server — even encrypted — creates a liability. CoreData on-device gives sub-millisecond reads, works offline, and makes a data breach structurally impossible.",
                tradeoff: "Accepted: no cross-device sync. Revisit with CloudKit if user demand justifies it. Privacy is a feature, not a limitation."
              },
              {
                decision: "Cash count as a first-class feature",
                why: "Existing finance apps treat cash as an afterthought — a manual input field. Real liquidity requires counting physical bills. I built a denomination-based cash counter that calculates total liquid MXN from bills and coins, making cash a real asset class in the portfolio.",
                tradeoff: "Accepted: requires manual count update. The discipline of counting cash is intentional UX, not a bug."
              },
              {
                decision: "Credit card cut/pay date modeling",
                why: "Balance ≠ real debt. A $9,000 balance on a card with a cut date of the 15th and a pay date of the 5th behaves completely differently from the same balance on a card due tomorrow. Valance models this explicitly, showing days-to-pay per card instead of just a balance number.",
                tradeoff: "Accepted: more complex onboarding. The tradeoff is accurate financial picture vs simpler setup — accuracy wins."
              }
            ].map((item, i) => (
              <div key={i} className="space-y-3">
                <h3 className="text-white font-bold text-sm uppercase tracking-tight border-b border-white/10 pb-3">{item.decision}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.why}</p>
                <p className="text-xs font-mono leading-relaxed border-l-2 pl-3 mt-2" style={{ color: '#a855f7', borderColor: '#a855f750' }}>{item.tradeoff}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feature breakdown */}
        <section className="space-y-16">
          <div>
            <h2 className="item-title mb-6 border-b border-white/10 pb-4">Core Feature Architecture</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: ShieldCheck,
                  title: "Biometric Lock Layer",
                  desc: "LocalAuthentication framework with FaceID as primary and device passcode as fallback. The app renders a lock screen component on foreground restoration, preventing shoulder-surfing and unauthorized access even when the device is unlocked."
                },
                {
                  icon: Wallet,
                  title: "Real Liquidity Engine",
                  desc: "Net worth = (sum of debit accounts) + (cash from Arqueo) − (total credit card debt). Valance computes this in real-time from CoreData fetch requests, giving a single number that reflects actual available money — not accounting fiction."
                },
                {
                  icon: CreditCard,
                  title: "Credit Card Intelligence",
                  desc: "Each card stores limit, current debt, cut day, and pay day. The app calculates days-remaining-to-pay per card and sorts them by urgency, so users always know which debt is most time-sensitive."
                },
                {
                  icon: Database,
                  title: "CoreData Persistence",
                  desc: "Entities: Account, CreditCard, Transaction, CashCount. Relationships are normalized with cascade delete rules. All writes go through a single NSManagedObjectContext on the main thread, eliminating concurrency bugs common in multi-context setups."
                },
              ].map((item, i) => (
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