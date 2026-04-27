import React, { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Github } from 'lucide-react';

export default function App() {
  const [topScore, setTopScore] = useState(0);

  const handleScoreUpdate = (score: number) => {
    if (score > topScore) {
      setTopScore(score);
    }
  };

  return (
    <div className="min-h-screen bg-[#000] text-cyan-400 font-mono selection:bg-magenta-500/30 overflow-x-hidden relative">
      {/* Scanline Overlay */}
      <div className="fixed inset-0 scanline z-50 pointer-events-none opacity-20" />
      
      {/* Background Noise */}
      <div className="fixed inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] contrast-150" />

      {/* Header */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12 border-b-2 border-cyan-400/20 bg-black/80 backdrop-blur-md">
        <div className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.4)] group-hover:bg-fuchsia-500 transition-colors">
            <div className="w-2 h-6 bg-black rounded-sm group-hover:rotate-90 transition-transform" />
          </div>
          <span className="text-2xl font-black font-display tracking-tighter uppercase glitch-text">SYS_LINK://NEON_BEATS</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[14px] font-bold uppercase tracking-[0.3em] font-display">
          <a href="#" className="hover:text-fuchsia-400 transition-colors group">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">&gt;&gt; </span>
            [ CORE_GAME ]
          </a>
          <a href="#" className="hover:text-fuchsia-400 transition-colors group">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">&gt;&gt; </span>
            [ AUDIO_DRIVE ]
          </a>
          <a href="#" className="hover:text-fuchsia-400 transition-colors group">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">&gt;&gt; </span>
            [ DATA_WAVE ]
          </a>
        </div>

        <div className="flex items-center gap-4">
           <div className="hidden sm:block text-right mr-4">
             <p className="text-[10px] text-fuchsia-500 uppercase tracking-widest font-mono font-bold leading-none mb-1">MAX_DATA_INT</p>
             <p className="text-2xl font-black text-cyan-400 font-mono tracking-tighter leading-none">{topScore.toString().padStart(6, '0')}</p>
           </div>
           <button className="p-2 border-2 border-cyan-400/20 hover:bg-cyan-400 hover:text-black transition-all">
             <Github size={20} />
           </button>
        </div>
      </nav>

      <main className="relative z-10 container mx-auto px-6 pt-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column - Intro */}
          <div className="lg:col-span-4 space-y-12 order-2 lg:order-1">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "circOut" }}
            >
              <h1 className="text-7xl md:text-[6rem] lg:text-[7rem] font-black font-display tracking-tighter leading-[0.8] text-white uppercase break-words glitch-text">
                INIT_ <br />
                <span className="text-fuchsia-500">SEGMENT</span> <br />
                EAT_ <br />
                <span className="text-cyan-400">VIBE</span>
              </h1>
              <div className="mt-8 p-6 border-l-4 border-fuchsia-500 bg-fuchsia-500/5">
                <p className="text-fuchsia-400 text-sm uppercase tracking-widest leading-relaxed font-black italic">
                   CRITICAL SYSTEM OVERRIDE: <br />
                   Maintain kinetic flow. <br />
                   Audio synchronization mandatory. <br />
                   Avoid self-collision.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <MusicPlayer />
            </motion.div>
          </div>

          {/* Center Column - Game */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative p-2 border-4 border-cyan-400 shadow-[0_0_60px_rgba(0,255,255,0.15)] bg-black"
            >
              {/* Corner Accents */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-fuchsia-500" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-fuchsia-500" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-fuchsia-500" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-fuchsia-500" />
              
              <SnakeGame onScoreUpdate={handleScoreUpdate} />
              
              {/* Micro Labels */}
              <div className="absolute -bottom-10 inset-x-0 flex justify-between px-2 text-[10px] font-mono font-bold text-cyan-400/60 uppercase tracking-[0.4em]">
                <span>KERNEL: 1.0.4_REL</span>
                <span>DATA_STREAM: ENCRYPTED</span>
                <span>{Math.floor(Date.now() / 1000).toString(16).toUpperCase()}</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Stats/Meta */}
          <div className="lg:col-span-3 space-y-8 order-3">
             <motion.div
               initial={{ x: 20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               className="p-6 border-2 border-cyan-400/20 bg-black/50"
             >
                <div className="flex items-center justify-between mb-8 border-b-2 border-fuchsia-500 pb-2">
                  <h4 className="text-[14px] font-black uppercase tracking-[0.3em] font-display text-white">RAW_BUFFERS</h4>
                  <div className="w-2 h-2 bg-fuchsia-500 animate-pulse shadow-[0_0_10px_rgba(255,0,255,1)]" />
                </div>
                <div className="space-y-6">
                   {[
                     { name: 'X_CORP', score: 2450 },
                     { name: 'VOID_S', score: 2100 },
                     { name: 'L_NULL', score: 1840 },
                     { name: 'G_HOST', score: 1520 }
                   ].map((user, i) => (
                     <div key={i} className="group cursor-crosshair">
                        <div className="flex items-center justify-between text-[16px] font-mono mb-1 font-bold">
                           <span className="text-white/40 group-hover:text-cyan-400 transition-colors uppercase tracking-widest">{user.name}</span>
                           <span className="text-fuchsia-500 font-black tracking-tighter">{user.score}</span>
                        </div>
                        <div className="h-2 w-full bg-cyan-400/10 overflow-hidden">
                           <div className="h-full bg-cyan-400 group-hover:bg-fuchsia-500 transition-all duration-500" style={{ width: `${(user.score/2450)*100}%` }} />
                        </div>
                     </div>
                   ))}
                </div>
             </motion.div>

             <motion.div
               initial={{ x: 20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: 0.1 }}
               className="p-6 border-2 border-fuchsia-500/60 bg-fuchsia-500/10 relative overflow-hidden group hover:bg-fuchsia-500 hover:text-black transition-all cursor-help"
             >
                <div className="absolute top-0 right-0 p-1 text-[10px] bg-fuchsia-500 text-black font-black uppercase">SYSTEM_LOG</div>
                <h4 className="text-[14px] font-black uppercase tracking-widest mb-4 group-hover:text-black transition-colors">TACTICAL_OVERRIDE</h4>
                <p className="text-[16px] leading-[1.2] uppercase font-bold italic opacity-80 group-hover:opacity-100 transition-opacity">
                   &gt;&gt; ACCUMULATE_SOLIDS. <br />
                   &gt;&gt; ESCALATE_MOMENTUM. <br />
                   &gt;&gt; CIRCUMVENT_TAIL_DATA.
                </p>
             </motion.div>

             <div className="p-4 border-2 border-cyan-400/10 text-[10px] font-mono text-cyan-400/30 uppercase tracking-[0.2em] leading-relaxed">
               SEC_PROTOCOL: ENABLED <br />
               USER_AUTH: ANONYMOUS <br />
               V_SYNC: LOCKED
             </div>
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="py-16 border-t-2 border-white/5 text-center relative z-10 overflow-hidden">
        <p className="text-[12px] uppercase font-black tracking-[1em] text-white/5 glitch-text">
          BUILT_FOR_THE_FUTURE_BY_NEONSOFT_2026
        </p>
      </footer>
    </div>
  );
}
