import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
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

function App() {
  return (
    <Router>
      {/* Global background — fixed, behind everything */}
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
      <Navbar />
      <div className="relative z-10">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;