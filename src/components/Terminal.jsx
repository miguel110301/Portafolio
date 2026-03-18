import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon } from 'lucide-react';

function Terminal({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    { type: 'system', text: 'MiguelOS v1.0.0 (tty1)' },
    { type: 'system', text: 'Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  // Auto-focus al abrir la terminal
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Auto-scroll hacia abajo cuando el historial crece
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'user', text: `visitor@miguel-dev:~$ ${cmd}` }];
      
      switch (cmd) {
        case 'help':
          newHistory.push({ type: 'system', text: 'Available commands:\n  whoami      - display user info\n  skills      - list technical skills\n  status      - show system operational status\n  clear       - clear terminal\n  sudo        - execute command as superuser' });
          break;
        case 'whoami':
          newHistory.push({ type: 'system', text: 'Miguel Ángel Moreno Sánchez\nRole: Automation & Backend Engineer\nLocation: Querétaro, Mexico' });
          break;
        case 'skills':
          newHistory.push({ type: 'system', text: '[Backend] Python, Django, Flask, MySQL\n[Automation] n8n, Webhooks, APIs\n[Mobile] Swift, iOS\n[DevOps] Linux, Nginx, VPS\n\n> Note: I don\'t just use these tools, I engineer bulletproof systems with them.' });
          break;
        case 'status':
          newHistory.push({ type: 'system', text: 'Status: EXECUTING\nEnergy: 100%\nCoffee level: Critical\n\n> "I build backend architectures that simply do not break, and orchestrate automations that replace entire manual workflows."' });
          break;
        case 'sudo':
        case 'sudo su':
        case 'sudo -i':
          newHistory.push({ type: 'system', text: 'Nice try. But I am the only root user here. 🕵🏻‍♂️\nIf you want my root privileges, you\'ll have to hire me first.' });
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case '':
          break;
        default:
          newHistory.push({ type: 'system', text: `bash: command not found: ${cmd}` });
      }
      
      setHistory(newHistory);
      setInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, y: 20 }} 
          animate={{ scale: 1, y: 0 }} 
          exit={{ scale: 0.95, y: 20 }}
          className="bg-[#1c1c1e] w-full max-w-2xl rounded-xl overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] font-mono text-sm"
          onClick={e => e.stopPropagation()} // Evita que se cierre al hacer clic adentro
        >
          {/* Header estilo macOS */}
          <div className="bg-[#2d2d2f] px-4 py-2 flex items-center justify-between border-b border-white/10">
            <div className="flex gap-2">
              <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-gray-400 text-xs flex items-center gap-2">
              <TerminalIcon size={14} /> miguel-terminal
            </div>
            <div className="w-10" /> {/* Spacer */}
          </div>
          
          {/* Cuerpo de la terminal */}
          <div className="p-4 h-[400px] overflow-y-auto text-gray-300" onClick={() => inputRef.current?.focus()}>
            {history.map((line, i) => (
              <div key={i} className={`mb-1 ${line.type === 'user' ? 'text-accent font-semibold' : 'text-gray-300 whitespace-pre-wrap'}`}>
                {line.text}
              </div>
            ))}
            <div className="flex items-center mt-1">
              <span className="text-accent font-semibold mr-2">visitor@miguel-dev:~$</span>
              <input 
                ref={inputRef}
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleCommand}
                className="flex-1 bg-transparent outline-none text-gray-300 caret-accent"
                autoComplete="off"
                spellCheck="false"
              />
            </div>
            <div ref={bottomRef} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Terminal;