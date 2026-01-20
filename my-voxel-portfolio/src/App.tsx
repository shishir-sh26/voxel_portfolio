import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, Float } from '@react-three/drei';
import VoxelWorld from './components/VoxelWorld';
import ChatInterface from './components/ChatInterface';
import VoxelModel from './components/VoxelModel';
import { SPLASH_TEXTS, SKINS } from './constants';

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

const PlayerStatsModal = ({ 
  isOpen, 
  onClose, 
  scrollPos, 
  selectedSkin, 
  onSkinChange 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  scrollPos: number,
  selectedSkin: typeof SKINS[0],
  onSkinChange: (skin: typeof SKINS[0]) => void
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="mc-panel w-full max-w-2xl bg-[#c6c6c6] border-8 border-white p-0 overflow-hidden animate-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-[#373737] p-4 flex justify-between items-center border-b-8 border-black">
          <h2 className="text-[12px] text-white font-bold uppercase tracking-widest">PLAYER_PROFILE.DAT</h2>
          <button onClick={onClose} className="mc-button px-4 py-2 text-[10px] text-white bg-red-600 border-red-800">X</button>
        </div>

        <div className="flex flex-col md:flex-row p-6 gap-8">
          {/* 3D Character Preview */}
          <div className="w-full md:w-1/2 aspect-square bg-[#111] border-4 border-black relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url(https://minecraft.wiki/images/Stone_JE5_BE3.png)', backgroundSize: '32px' }} />
            <Canvas camera={{ position: [0, 2, 8], fov: 35 }}>
              <ambientLight intensity={0.8} />
              <pointLight position={[10, 10, 10]} intensity={1.5} />
              <Suspense fallback={null}>
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                  <Center position={[0, -1, 0]}>
                    <VoxelModel data={selectedSkin.model} scale={1} />
                  </Center>
                </Float>
              </Suspense>
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={4} />
            </Canvas>
            <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 text-[6px] text-cyan-400 uppercase">3D_PREVIEW: {selectedSkin.name}</div>
          </div>

          {/* Player Details */}
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <p className="text-[8px] text-gray-600 mb-1 uppercase font-bold">Player Identity</p>
              <h3 className="text-xl font-black text-black uppercase tracking-tighter">SHISHIR R KULAL</h3>
              <div className="flex items-center gap-2 mt-2">
                 <span className="text-[8px] bg-green-700 text-white px-2 py-1 border-2 border-black font-bold uppercase">LVL 99</span>
                 <span className="text-[8px] text-gray-500 font-bold uppercase">EXP: 1337 / 2000</span>
              </div>
            </div>

            <div className="space-y-4">
              {/* Coordinates */}
              <div className="bg-white/50 border-4 border-gray-400 p-3">
                <p className="text-[8px] text-gray-500 mb-2 font-bold uppercase">Coordinates</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-black p-2"><p className="text-[8px] text-cyan-400">X: 0.00</p></div>
                  <div className="bg-black p-2"><p className="text-[8px] text-cyan-400">Y: {Math.round(scrollPos * 100)}</p></div>
                  <div className="bg-black p-2"><p className="text-[8px] text-cyan-400">Z: 0.00</p></div>
                </div>
              </div>

              {/* Skin Selector */}
              <div className="bg-white/50 border-4 border-gray-400 p-3">
                <p className="text-[8px] text-gray-500 mb-2 font-bold uppercase">Change Skin</p>
                <div className="grid grid-cols-4 gap-2">
                  {SKINS.map((skin) => (
                    <button 
                      key={skin.id}
                      onClick={() => onSkinChange(skin)}
                      className={`aspect-square border-4 flex items-center justify-center p-1 transition-all ${
                        selectedSkin.id === skin.id 
                          ? 'bg-yellow-400 border-white' 
                          : 'bg-[#8b8b8b] border-white/50 hover:bg-[#9b9b9b]'
                      }`}
                      title={skin.name}
                    >
                      <div className="w-full h-full" style={{ backgroundColor: skin.color }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Inventory (Visual Only) */}
              <div className="bg-white/50 border-4 border-gray-400 p-3">
                <p className="text-[8px] text-gray-500 mb-2 font-bold uppercase">Hotbar Items</p>
                <div className="grid grid-cols-4 gap-2">
                  <div className="aspect-square bg-[#8b8b8b] border-4 border-white/50 flex items-center justify-center p-1">
                    <img src="https://minecraft.wiki/images/Diamond_Sword_JE3_BE3.png" className="w-full h-full object-contain pixelated" alt="item" />
                  </div>
                  <div className="aspect-square bg-[#8b8b8b] border-4 border-white/50 flex items-center justify-center p-1">
                    <img src="https://minecraft.wiki/images/Knowledge_Book_JE2_BE2.png" className="w-full h-full object-contain pixelated" alt="item" />
                  </div>
                  <div className="aspect-square bg-[#8b8b8b] border-4 border-white/50 flex items-center justify-center p-1">
                    <img src="https://minecraft.wiki/images/Enchanted_Golden_Apple_JE2_BE2.gif" className="w-full h-full object-contain pixelated" alt="item" />
                  </div>
                  <div className="aspect-square bg-[#8b8b8b] border-4 border-white/50 flex items-center justify-center p-1">
                    <img src="https://minecraft.wiki/images/Redstone_Dust_JE2_BE2.png" className="w-full h-full object-contain pixelated" alt="item" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <button onClick={onClose} className="mc-button w-full py-4 text-[10px] text-white font-bold bg-green-600 border-green-800 uppercase">SAVE_DATA.EXE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [selectedSkin, setSelectedSkin] = useState(SKINS[0]);
  const [scrollPos, setScrollPos] = useState(0);
  const [splash, setSplash] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setSplash(SPLASH_TEXTS[Math.floor(Math.random() * SPLASH_TEXTS.length)]);
    
    const timer = setTimeout(() => {
      setProgress(100);
    }, 8000);

    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = winScroll / height;
      setScrollPos(scrolled || 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    if (audioRef.current) {
      audioRef.current.play().catch(e => {
        console.warn("Audio playback blocked by browser.");
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
      <audio 
        ref={audioRef} 
        loop 
        src="c418_aria_math.mp3"
      />

      <VoxelWorld />

      <div className="fixed top-8 left-8 z-50 flex flex-col gap-4 pointer-events-none">
        <div 
          onClick={() => setIsStatsOpen(true)}
          className="mc-dark-panel px-5 py-4 pointer-events-auto shadow-[10px_10px_0px_rgba(0,0,0,0.8)] border-4 hover:scale-105 transition-transform cursor-pointer group"
        >
          <div className="flex items-center gap-3 mb-3">
             <div className="w-10 h-10 border-2 border-white/30 bg-[#444] pixelated p-1 group-hover:border-yellow-400 transition-colors flex items-center justify-center">
                <div className="w-full h-full" style={{ backgroundColor: selectedSkin.color }} />
             </div>
             <div>
                <p className="text-[10px] text-white font-bold uppercase tracking-tighter">
                  PLAYER: <span className="text-yellow-400">SHISHIR</span>
                </p>
                <p className="text-[6px] text-gray-400 uppercase font-bold group-hover:text-cyan-400">Click to view stats</p>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[8px] text-red-500 font-bold">HP</span>
            <div className="w-40 h-5 bg-gray-800 border-2 border-gray-600 relative">
              <div className="h-full bg-red-600 w-3/4 shadow-[inset_0_-2px_rgba(0,0,0,0.3)]"></div>
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

      <PlayerStatsModal 
        isOpen={isStatsOpen} 
        onClose={() => setIsStatsOpen(false)} 
        scrollPos={scrollPos} 
        selectedSkin={selectedSkin}
        onSkinChange={setSelectedSkin}
      />

      <ChatInterface />

      {/* Render cursor last to ensure it's ALWAYS on top of everything else */}
      <CustomCursor />
    </div>
  );
};

export default App;