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

// 1. Envolvemos el Home en un motion.div para su animación de entrada/salida
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
      <Labs />     {/* <-- Agregamos Labs justo aquí */}
      <About />
      <Contact />
    </motion.main>
  );
}

// 2. Componente que maneja la detección de ruta y las animaciones
function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    // AnimatePresence detecta cuándo un componente se desmonta para animar su salida
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        
        {/* Envolvemos cada caso de estudio con su propia animación de página */}
        <Route path="/proyecto/logisticsflow" element={
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <LogisticsCaseStudy />
          </motion.div>
        } />
        
        <Route path="/proyecto/gamma" element={
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <GammaCaseStudy />
          </motion.div>
        } />
        
        <Route path="/proyecto/qrodata" element={
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <QroDataCaseStudy />
          </motion.div>
        } />

        <Route path="/proyecto/dashboard" element={
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <DashboardProCaseStudy />
          </motion.div>
        } />

      </Routes>
    </AnimatePresence>
  );
}

// 3. App Principal
function App() {
  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;