import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import Projects from "./sections/Projects";
import About from "./sections/About";
import Contact from "./sections/Contact";
import LogisticsCaseStudy from "./pages/LogisticsCaseStudy";
// 1. Agrega esta línea para importar tu nuevo caso de estudio:
import GammaCaseStudy from "./pages/GammaCaseStudy";
import QroDataCaseStudy from "./pages/QroDataCaseStudy";

function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyecto/logisticsflow" element={<LogisticsCaseStudy />} />
        {/* 2. Agrega esta línea para la nueva ruta: */}
        <Route path="/proyecto/gamma" element={<GammaCaseStudy />} />
        <Route path="/proyecto/qrodata" element={<QroDataCaseStudy />} />
      </Routes>
    </Router>
  );
}

export default App;