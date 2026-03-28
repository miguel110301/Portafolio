import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Projects from "./sections/Projects";
import About from "./sections/About";
import Contact from "./sections/Contact";
import LogisticsCaseStudy from "./pages/LogisticsCaseStudy";
import GammaCaseStudy from "./pages/GammaCaseStudy";
import QroDataCaseStudy from "./pages/QroDataCaseStudy";
import DashboardProCaseStudy from "./pages/DashboardProCaseStudy";
import Labs from "./sections/Labs";
import CustomCursor from './components/CustomCursor';
import Services from "./sections/Services";
import ValanceCaseStudy from './pages/ValanceCaseStudy';
import { Toaster } from 'sileo';
import { FloatingPaths } from './components/FloatingPaths';
import ScrollExpandMedia from './components/ScrollExpandMedia';

// ─── SPLASH IMAGES ────────────────────────────────────────────────────────────
const SPLASH_MEDIA   = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1280&auto=format&fit=crop';
const SPLASH_BG      = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop';

// ─── HOME ─────────────────────────────────────────────────────────────────────
function Home() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Hero />
      <Experience />
      <Education />
      <Projects />
      <Services />
      <Labs />
      <About />
      <Contact />
    </motion.main>
  );
}

// ─── ANIMATED ROUTES ──────────────────────────────────────────────────────────
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/proyecto/logisticsflow" element={
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: "easeOut" }}>
            <LogisticsCaseStudy />
          </motion.div>
        } />
        <Route path="/proyecto/gamma" element={
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: "easeOut" }}>
            <GammaCaseStudy />
          </motion.div>
        } />
        <Route path="/proyecto/qrodata" element={
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: "easeOut" }}>
            <QroDataCaseStudy />
          </motion.div>
        } />
        <Route path="/proyecto/dashboard" element={
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: "easeOut" }}>
            <DashboardProCaseStudy />
          </motion.div>
        } />
        <Route path="/proyecto/valance" element={
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: "easeOut" }}>
            <ValanceCaseStudy />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <Router>
      {/* Global floating paths background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <Toaster
        position="bottom-right"
        options={{
          fill: '#0a0a0a',
          roundness: 6,
          styles: {
            title: 'font-bold uppercase tracking-widest text-[11px] text-white!',
            description: 'text-white/50! text-[10px] font-mono tracking-wide',
            badge: 'bg-white/10!',
          },
        }}
      />

      <CustomCursor />

      <AnimatePresence mode="wait">
        {!splashDone ? (
          /* ── SPLASH SCREEN ── */
          <motion.div
            key="splash"
            className="fixed inset-0 z-50 bg-black"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <ScrollExpandMedia
              mediaType="image"
              mediaSrc={SPLASH_MEDIA}
              bgImageSrc={SPLASH_BG}
              title="Automation & Backend"
              scrollToExpand="Scroll to expand"
              textBlend
              onExpanded={() => setSplashDone(true)}
            />
          </motion.div>
        ) : (
          /* ── PORTFOLIO ── */
          <motion.div
            key="portfolio"
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Navbar />
            <AnimatedRoutes />
          </motion.div>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;