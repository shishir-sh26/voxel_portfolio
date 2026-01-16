
import React, { useState, useRef, useEffect } from 'react';
import VoxelWorld from './components/VoxelWorld';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.play().catch(() => {
          console.log("Autoplay blocked. User interaction required.");
          setIsMusicPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicPlaying]);

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden text-white bg-black font-['Press_Start_2P']">
      {/* Background Music Player */}
      <audio 
        ref={audioRef} 
        loop 
        src="c418_aria_math.mp3"
      />

      {/* 3D Core with Parallax Scroll */}
      <VoxelWorld />

      {/* Global Fixed HUD Elements */}
      <div className="fixed top-8 left-8 z-50 flex flex-col gap-4">
        {/* Player Status Panel */}
        <div className="mc-dark-panel px-4 py-3 pointer-events-auto shadow-[8px_8px_0px_rgba(0,0,0,0.8)] border-4">
          <p className="text-[10px] text-white font-bold mb-2 uppercase tracking-tighter">PLAYER: <span className="text-yellow-400">SHISHIR</span></p>
          <div className="flex items-center gap-2">
            <span className="text-[8px] text-red-500 font-bold">HP</span>
            <div className="w-32 h-4 bg-gray-800 border-2 border-gray-600">
              <div className="h-full bg-red-600 w-3/4"></div>
            </div>
          </div>
        </div>

        {/* Background Music Toggle */}
        <button 
          onClick={toggleMusic}
          className="mc-button px-4 py-3 text-[8px] font-bold text-white flex items-center gap-2 shadow-[8px_8px_0px_rgba(0,0,0,0.8)]"
        >
          {isMusicPlaying ? 'MUSIC: ON' : 'MUSIC: OFF'}
        </button>
      </div>

      {/* Decorative Scroll Indicators */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 pointer-events-none opacity-30">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-3 h-3 border-2 border-white rotate-45"></div>
        ))}
      </div>

      {/* AI Assistant Chat Interface */}
      <ChatInterface />
    </div>
  );
};

export default App;
