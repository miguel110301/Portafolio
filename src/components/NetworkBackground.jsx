import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

function NetworkBackground() {
  const particlesInit = useCallback(async (engine) => {
    // Usamos la versión "slim" que es súper rápida y no alenta la página
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 z-0 pointer-events-auto"
      options={{
        fullScreen: { enable: false },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab", // Conecta los nodos al cursor
            },
          },
          modes: {
            grab: {
              distance: 150,
              links: {
                opacity: 0.5,
                color: "#38bdf8"
              },
            },
          },
        },
        particles: {
          color: {
            value: "#38bdf8",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.1,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 0.5, // Movimiento elegante y lento
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 40, // Cantidad de nodos
          },
          opacity: {
            value: 0.3,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}

export default NetworkBackground;