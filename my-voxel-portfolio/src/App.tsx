
import React from 'react';
import VoxelWorld from './components/VoxelWorld';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden text-white bg-black font-['Press_Start_2P']">
      {/* 3D Core with Parallax Scroll */}
      <VoxelWorld />

      {/* Global Fixed HUD Elements */}
      <div className="fixed top-8 left-8 z-50 pointer-events-none">
        <div className="mc-dark-panel px-4 py-2 pointer-events-auto">
          <p className="text-[8px] text-white">PLAYER: <span className="text-yellow-400">SHISHIR</span></p>
          <div className="w-32 h-2 bg-gray-800 border border-gray-600 mt-1">
            <div className="h-full bg-red-600 w-3/4"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 pointer-events-none opacity-30">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-3 h-3 border-2 border-white rotate-45"></div>
        ))}
      </div>

      {/* AI Assistant Chat */}
      <ChatInterface />
    </div>
  );
};

export default App;
