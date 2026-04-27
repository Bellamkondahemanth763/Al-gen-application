import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { motion } from 'motion/react';

interface Song {
  id: number;
  title: string;
  artist: string;
  url: string;
  cover: string;
  color: string;
}

const PLAYLIST: Song[] = [
  {
    id: 1,
    title: "Electric Dreams",
    artist: "SynthAI",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://picsum.photos/seed/synth/400/400",
    color: "#22d3ee" // cyan
  },
  {
    id: 2,
    title: "Neon Pulse",
    artist: "CyberBeats",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://picsum.photos/seed/cyber/400/400",
    color: "#8b5cf6" // violet
  },
  {
    id: 3,
    title: "Midnight Ride",
    artist: "RetroGen",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://picsum.photos/seed/retro/400/400",
    color: "#f43f5e" // rose
  }
];

export default function MusicPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const currentSong = PLAYLIST[currentIndex];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipForward = () => {
    setCurrentIndex((prev) => (prev + 1) % PLAYLIST.length);
    setIsPlaying(true);
  };

  const skipBack = () => {
    setCurrentIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentSong.url;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Auto-play blocked or error:", e));
      }
    }
  }, [currentIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleEnded = () => {
    skipForward();
  };

  return (
    <div className="w-full max-w-sm p-6 bg-black border-2 border-cyan-400/40 shadow-[0_0_30px_rgba(0,255,255,0.1)] overflow-hidden relative group">
      {/* Background Chromatic Shift */}
      <div 
        className="absolute inset-0 opacity-10 bg-gradient-to-br from-cyan-500 via-transparent to-fuchsia-500 animate-pulse"
      />
      
      <div className="relative z-10">
        <div className="flex items-center gap-6 mb-8 border-b border-cyan-400/20 pb-4">
          <div className="relative w-24 h-24 border border-fuchsia-500">
             <img 
               src={currentSong.cover} 
               alt={currentSong.title} 
               className={`w-full h-full object-cover grayscale contrast-150 ${isPlaying ? 'animate-pulse' : ''}`}
               referrerPolicy="no-referrer"
             />
             <div className="absolute inset-0 flex items-center justify-center bg-black/40">
               <Music className="text-cyan-400/30" size={32} />
             </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <h3 className="text-white text-2xl font-black uppercase tracking-tighter truncate glitch-text">{currentSong.title}</h3>
            <p className="text-fuchsia-500 font-bold uppercase tracking-[0.2em] text-[12px] truncate">USR_ID: {currentSong.artist}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-4 w-full bg-cyan-400/10 border border-cyan-400/20 overflow-hidden relative">
            <motion.div 
              initial={false}
              animate={{ width: `${progress}%` }}
              className="h-full bg-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.5)]"
            />
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white/40 pointer-events-none">
              {Math.floor(progress)}%_SYNCHRONIZED
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <button onClick={skipBack} className="p-3 border border-cyan-400/20 hover:bg-cyan-400 hover:text-black transition-all">
            <SkipBack size={20} />
          </button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="w-20 h-12 flex items-center justify-center bg-fuchsia-500 text-black font-black uppercase tracking-widest shadow-[0_0_20px_rgba(255,0,255,0.3)]"
          >
            {isPlaying ? 'PAUSE' : 'PLAY'}
          </motion.button>

          <button onClick={skipForward} className="p-3 border border-cyan-400/20 hover:bg-cyan-400 hover:text-black transition-all">
            <SkipForward size={20} />
          </button>
        </div>
      </div>

      <audio 
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
    </div>
  );
}
