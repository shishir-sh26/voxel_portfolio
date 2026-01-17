import React, { useState, useRef, useEffect } from 'react';
import VoxelWorld from './components/VoxelWorld';
import ChatInterface from './components/ChatInterface';
import { SPLASH_TEXTS } from './constants';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(true);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className={`sword-cursor ${!imageLoaded ? 'bg-cyan-500 w-4 h-4' : ''}`}
      style={{ backgroundImage: imageLoaded ? "url('/Diamond_Sword-removebg-preview.png')" : 'none' }}
      onError={() => setImageLoaded(false)}
    />
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [splash, setSplash] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setSplash(SPLASH_TEXTS[Math.floor(Math.random() * SPLASH_TEXTS.length)]);
    
    // Safety timeout: If world isn't "ready" in 8 seconds, force progress to 100
    const timer = setTimeout(() => {
      setProgress(100);
    }, 8000);
    
    return () => clearTimeout(timer);
  }, []);

  // Loading progress simulation
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleStart = () => {
    setIsLoading(false);
    setIsMusicPlaying(true);
    // Audio plays ONLY here after explicit user click on JOIN_SERVER
    if (audioRef.current) {
      audioRef.current.play().catch(e => {
        console.warn("Audio playback blocked by browser. This is normal if there was no interaction.");
        setIsMusicPlaying(false);
      });
    }
  };

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
    if (audioRef.current) {
      if (!isMusicPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#3f2a1d] flex flex-col items-center justify-center font-['Press_Start_2P']">
        <CustomCursor />
        <div className="absolute inset-0 opacity-10 pixelated pointer-events-none" style={{ backgroundImage: 'url(https://minecraft.wiki/images/Dirt_Path_JE3_BE2.png)', backgroundSize: '64px' }} />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-12">
            <h1 className="text-2xl sm:text-4xl text-white font-black drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] uppercase text-center px-4">
              Generating World...
            </h1>
            <div className="absolute -right-10 -bottom-4 rotate-[-20deg] animate-pulse text-yellow-400 text-[10px] sm:text-[14px] font-black drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] whitespace-nowrap">
              {splash}
            </div>
          </div>
          
          <div className="w-64 sm:w-96 h-8 bg-[#1a1a1a] border-4 border-white relative overflow-hidden mb-8">
            <div 
              className="h-full bg-green-600 transition-all duration-300 border-r-4 border-green-800" 
              style={{ width: `${progress}%` }} 
            />
          </div>
          
          <p className="text-[10px] text-yellow-400 font-bold mb-12 animate-pulse uppercase">
            {progress < 100 ? `Crafting Voxels... ${progress}%` : 'Level Loaded!'}
          </p>

          {progress === 100 && (
            <button 
              onClick={handleStart}
              className="mc-button px-8 py-4 text-white text-[12px] animate-bounce"
            >
              JOIN_SERVER
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden text-white bg-black font-['Press_Start_2P']">
      <CustomCursor />
      {/* Explicitly no autoPlay attribute */}
      <audio 
        ref={audioRef} 
        loop 
        src="c418_aria_math.mp3"
      />

      <VoxelWorld />

      <div className="fixed top-8 left-8 z-50 flex flex-col gap-4 pointer-events-none">
        <div className="mc-dark-panel px-4 py-3 pointer-events-auto shadow-[8px_8px_0px_rgba(0,0,0,0.8)] border-4">
          <p className="text-[10px] text-white font-bold mb-2 uppercase tracking-tighter">PLAYER: <span className="text-yellow-400">SHISHIR</span></p>
          <div className="flex items-center gap-2">
            <span className="text-[8px] text-red-500 font-bold">HP</span>
            <div className="w-32 h-4 bg-gray-800 border-2 border-gray-600">
              <div className="h-full bg-red-600 w-3/4"></div>
            </div>
          </div>
        </div>

        <button 
          onClick={toggleMusic}
          className="mc-button pointer-events-auto px-4 py-3 text-[8px] font-bold text-white flex items-center gap-2 shadow-[8px_8px_0px_rgba(0,0,0,0.8)]"
        >
          {isMusicPlaying ? 'MUSIC: ON' : 'MUSIC: OFF'}
        </button>
      </div>

      <ChatInterface />
    </div>
  );
};

export default App;