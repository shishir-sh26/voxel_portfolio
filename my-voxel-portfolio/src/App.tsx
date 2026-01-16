
import React, { useState, useRef, useEffect } from 'react';
import VoxelWorld from './components/VoxelWorld';
import ChatInterface from './components/ChatInterface';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return <div ref={cursorRef} className="sword-cursor" />;
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Loading progress simulation
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleStart = () => {
    setIsLoading(false);
    setIsMusicPlaying(true);
    // Explicitly play music on user gesture
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Playback failed:", e));
    }
  };

  useEffect(() => {
    if (audioRef.current && !isLoading) {
      if (isMusicPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicPlaying, isLoading]);

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#3f2a1d] flex flex-col items-center justify-center font-['Press_Start_2P']">
        <CustomCursor />
        {/* Dirt Background Overlay */}
        <div className="absolute inset-0 opacity-10 pixelated" style={{ backgroundImage: 'url(https://minecraft.wiki/images/Dirt_Path_JE3_BE2.png)', backgroundSize: '64px' }} />
        
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-2xl sm:text-4xl text-white font-black mb-12 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] uppercase text-center px-4">
            Loading World...
          </h1>
          
          <div className="w-64 sm:w-96 h-8 bg-[#1a1a1a] border-4 border-white relative overflow-hidden mb-8">
            <div 
              className="h-full bg-green-600 transition-all duration-300 border-r-4 border-green-800" 
              style={{ width: `${progress}%` }} 
            />
          </div>
          
          <p className="text-[10px] text-yellow-400 font-bold mb-12 animate-pulse uppercase">
            {progress < 100 ? `Generating Blocks... ${progress}%` : 'World Generated!'}
          </p>

          {progress === 100 && (
            <button 
              onClick={handleStart}
              className="mc-button px-8 py-4 text-white text-[12px] animate-bounce"
            >
              START_ADVENTURE
            </button>
          )}
        </div>
        
        <div className="absolute bottom-8 text-[8px] text-gray-400 font-bold uppercase">
          Tip: Use your diamond sword to interact
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden text-white bg-black font-['Press_Start_2P']">
      <CustomCursor />
      
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
