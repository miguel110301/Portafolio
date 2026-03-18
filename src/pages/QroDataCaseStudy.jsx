import { motion } from 'framer-motion';
import { ArrowLeft, LineChart, Database, LayoutDashboard } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function QroDataCaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-6">
        
        <Link to="/" className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-12 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Volver al Portafolio
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">Fullstack Web</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted">React</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted">Python Analytics</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            QroData: Analítica y <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">Monitoreo Visual</span>
          </h1>
          <p className="text-xl text-muted leading-relaxed mb-12">
            Desarrollo end-to-end de una plataforma web capaz de ingerir volúmenes de datos crudos, procesarlos en el backend y servirlos en interfaces interactivas y tableros de control en tiempo real.
          </p>
        </motion.div>

        {/* Aquí va tu primera captura de pantalla principal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 aspect-video relative flex items-center justify-center"
        >
          {/* Instrucción: Reemplaza "/ruta-a-tu-imagen.png" con el nombre de tu imagen real que pongas en la carpeta "public" */}
          <p className="absolute text-muted/50 z-0">Espacio para Captura del Dashboard</p>
          <img 
            src="/dashboard-qrodata.png" 
            alt="Dashboard principal de QroData" 
            className="w-full h-full object-cover relative z-10 opacity-0 transition-opacity duration-500"
            onLoad={(e) => e.target.classList.remove('opacity-0')}
            onError={(e) => e.target.style.display = 'none'} 
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-16 text-muted leading-relaxed"
        >
          
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
              <Database className="text-accent" /> Ingesta y Procesamiento
            </h2>
            <p>
              El principal desafío de los datos no es mostrarlos, sino limpiarlos y estructurarlos. Para este proyecto, el backend en Python se encarga de extraer la información de múltiples fuentes, aplicar transformaciones (ETL) y almacenarlas en una base de datos MySQL optimizada para consultas de lectura rápida.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
              <LayoutDashboard className="text-accent" /> Interfaz y Experiencia
            </h2>
            <p className="mb-6">
              Del lado del cliente, la aplicación está construida con React, enfocándose en un rendimiento fluido sin recargas de página completas. Los componentes consumen los endpoints REST del backend y renderizan la información utilizando librerías de gráficos modernos.
            </p>
            
            {/* Aquí va tu segunda captura (ej. detalle de una gráfica o tabla) */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 aspect-[21/9] relative flex items-center justify-center">
               <p className="absolute text-muted/50 z-0">Espacio para Captura de Tabla/Gráficos</p>
               <img 
                src="/detalle-qrodata.png" 
                alt="Vista de detalle QroData" 
                className="w-full h-full object-cover relative z-10 opacity-0 transition-opacity duration-500"
                onLoad={(e) => e.target.classList.remove('opacity-0')}
                onError={(e) => e.target.style.display = 'none'} 
              />
            </div>
          </section>

          <section className="bg-gradient-to-r from-accent/10 to-transparent p-8 rounded-2xl border border-accent/20">
            <h2 className="text-2xl font-bold text-primary mb-2">Valor Aportado</h2>
            <p className="text-primary/80">
              QroData demuestra mi capacidad para salir del código backend puro y conectar los sistemas lógicos con interfaces de usuario consumibles. Es la prueba de que puedo tomar un requerimiento desde la base de datos hasta el navegador del usuario final.
            </p>
          </section>

        </motion.div>
      </div>
    </div>
  );
}

export default QroDataCaseStudy;