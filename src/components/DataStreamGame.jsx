import { useState, useEffect, useRef } from 'react';
import { Terminal, Trophy, Play, RotateCcw } from 'lucide-react';

const GRID_COLS = 20;
const GRID_ROWS = 10;
const INITIAL_SNAKE = [
  { x: 5, y: 5 },
  { x: 4, y: 5 },
  { x: 3, y: 5 }
];
const INITIAL_DIRECTION = { x: 1, y: 0 };

export default function DataStreamGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 15, y: 5 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const directionRef = useRef(INITIAL_DIRECTION);
  const [touchStart, setTouchStart] = useState(null);

  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    directionRef.current = INITIAL_DIRECTION;
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    setFood({ x: 15, y: 5 });
  };

  // Lógica principal del juego
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = prevSnake[0];
        const newHead = { 
          x: head.x + directionRef.current.x, 
          y: head.y + directionRef.current.y 
        };

        // Colisiones con paredes o cuerpo
        if (
          newHead.x < 0 || newHead.x >= GRID_COLS ||
          newHead.y < 0 || newHead.y >= GRID_ROWS ||
          prevSnake.some(seg => seg.x === newHead.x && seg.y === newHead.y)
        ) {
          setGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Comer el paquete JSON (comida)
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10);
          let newFood;
          while (true) {
            newFood = { 
              x: Math.floor(Math.random() * GRID_COLS), 
              y: Math.floor(Math.random() * GRID_ROWS) 
            };
            if (!newSnake.some(s => s.x === newFood.x && s.y === newFood.y)) break;
          }
          setFood(newFood);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    // Aumenta la velocidad ligeramente según el score
    const speed = Math.max(60, 140 - (score * 0.8));
    const intervalId = setInterval(moveSnake, speed);
    return () => clearInterval(intervalId);
  }, [isPlaying, gameOver, food, score]);

  // Controles de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        if (isPlaying) e.preventDefault(); // Evita que la página haga scroll al jugar
      }

      if (e.key === ' ' && (!isPlaying || gameOver)) {
        startGame();
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (directionRef.current.y === 0) directionRef.current = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (directionRef.current.y === 0) directionRef.current = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (directionRef.current.x === 0) directionRef.current = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (directionRef.current.x === 0) directionRef.current = { x: 1, y: 0 };
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, gameOver]);

  // Controles táctiles (Swipes para celular)
  const handleTouchStart = (e) => {
    setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchEnd = (e) => {
    if (!touchStart || !isPlaying) return;
    const dx = e.changedTouches[0].clientX - touchStart.x;
    const dy = e.changedTouches[0].clientY - touchStart.y;

    if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0 && directionRef.current.x === 0) directionRef.current = { x: 1, y: 0 };
      else if (dx < 0 && directionRef.current.x === 0) directionRef.current = { x: -1, y: 0 };
    } else {
      if (dy > 0 && directionRef.current.y === 0) directionRef.current = { x: 0, y: 1 };
      else if (dy < 0 && directionRef.current.y === 0) directionRef.current = { x: 0, y: -1 };
    }
    setTouchStart(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 mb-8 select-none">
      <div className="glass-panel p-5 md:p-8 rounded-[2rem] bg-[#0a0a0a]/90 border border-white/10 shadow-[0_0_50px_rgba(56,189,248,0.05)] relative overflow-hidden">
        
        {/* Cabecera del juego */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shadow-inner">
              <Terminal className="text-accent" size={24} />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-primary font-bold text-xl leading-tight">Data Stream Routing</h3>
              <p className="text-sm text-muted mt-1">Collect JSON payloads. Don't hit the firewall.</p>
            </div>
          </div>
          <div className="bg-[#121212] px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3 shadow-inner">
            <Trophy size={18} className="text-yellow-400" />
            <span className="text-primary font-mono font-bold text-xl">{score}</span>
          </div>
        </div>

        {/* Tablero */}
        <div 
          className="relative w-full aspect-[2/1] bg-[#050505] border border-white/10 rounded-2xl overflow-hidden shadow-inner touch-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Cuadrícula sutil de fondo */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:5%_10%]" />

          {/* Renderizado de la Serpiente y Comida */}
          {(isPlaying || gameOver) && (
            <>
              {/* Comida (Paquete JSON) */}
              <div 
                className="absolute bg-purple-500 rounded-sm shadow-[0_0_15px_#a855f7] animate-pulse flex items-center justify-center text-[8px] font-bold text-white/80"
                style={{ 
                  width: '5%', height: '10%', 
                  left: `${(food.x / GRID_COLS) * 100}%`, 
                  top: `${(food.y / GRID_ROWS) * 100}%` 
                }}
              >
                {`{}`}
              </div>

              {/* Serpiente (Datos) */}
              {snake.map((segment, i) => (
                <div 
                  key={i}
                  className={`absolute rounded-sm border border-[#050505] transition-all duration-75 ${
                    i === 0 ? 'bg-accent shadow-[0_0_15px_#38bdf8] z-10' : 'bg-accent/60'
                  }`}
                  style={{ 
                    width: '5%', height: '10%', 
                    left: `${(segment.x / GRID_COLS) * 100}%`, 
                    top: `${(segment.y / GRID_ROWS) * 100}%` 
                  }}
                />
              ))}
            </>
          )}

          {/* Pantallas de Inicio / Fin */}
          {!isPlaying && !gameOver && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-20">
              <button 
                onClick={startGame} 
                className="flex items-center gap-2 bg-primary text-background px-8 py-3.5 rounded-full font-bold hover:scale-105 transition-transform"
              >
                <Play size={18} fill="currentColor" /> Initialize Routing
              </button>
            </div>
          )}

          {gameOver && (
            <div className="absolute inset-0 bg-red-950/80 backdrop-blur-[2px] flex flex-col items-center justify-center z-20">
              <div className="text-red-400 font-bold text-2xl mb-1">Connection Refused</div>
              <div className="text-white/80 text-base mb-6">Final Packets Routed: {score}</div>
              <button 
                onClick={startGame} 
                className="flex items-center gap-2 bg-white text-red-900 px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
              >
                <RotateCcw size={18} /> Reconnect
              </button>
            </div>
          )}
        </div>
        
        {/* Ayuda visual en mobile */}
        <p className="text-center text-xs text-muted/50 mt-4 md:hidden">Swipe to route the data stream</p>
      </div>
    </div>
  );
}