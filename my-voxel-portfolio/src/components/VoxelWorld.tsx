
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  ScrollControls, 
  Scroll, 
  Stars, 
  Float, 
  Center,
  Environment
} from '@react-three/drei';
import VoxelModel from './VoxelModel';
import { PROJECTS, HERO_CHARACTER, LAPTOP_VOXEL, SKILLS } from '../constants';
import type { ThreeElements } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

const Scene: React.FC = () => {
  const categories = ['Frontend', 'Backend', 'AI & ML', 'IoT & Embedded'] as const;

  return (
    <>
      <color attach="background" args={['#050505']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      <spotLight position={[-10, 20, 10]} angle={0.2} penumbra={1} intensity={1} castShadow />
      <Stars radius={100} depth={50} count={8000} factor={4} saturation={0} fade speed={1.5} />
      <Environment preset="night" />
      
      <ScrollControls pages={8} damping={0.25}>
        <Scroll>
          {/* Section 1: Hero */}
          <group position={[0, 0, 0]}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
              <Center>
                <VoxelModel data={HERO_CHARACTER} scale={0.7} />
              </Center>
            </Float>
          </group>

          {/* Section 2: About */}
          <group position={[0, -10, -2]}>
            <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
              <Center>
                <VoxelModel data={LAPTOP_VOXEL} scale={0.8} />
              </Center>
            </Float>
          </group>

          {/* Section 3: Skills */}
          <group position={[0, -22, 0]}>
             <Float position={[-5, 2, 0]} speed={3}>
               <VoxelModel data={[{pos: [0,0,0], color: '#61dafb'}]} scale={1.2} />
             </Float>
             <Float position={[5, -2, -2]} speed={2.5}>
               <VoxelModel data={[{pos: [0,0,0], color: '#339933'}]} scale={1.2} />
             </Float>
             <Float position={[0, 4, -4]} speed={4}>
               <VoxelModel data={[{pos: [0,0,0], color: '#ee4c2c'}]} scale={1} />
             </Float>
          </group>

          {/* Section 4: Projects */}
          <group position={[0, -45, 0]}>
            {PROJECTS.map((p, i) => (
              <Float key={p.id} position={[(i % 2 === 0 ? -5 : 5), -i * 3, -2]} speed={2}>
                <VoxelModel data={p.voxelArt || []} scale={0.8} />
              </Float>
            ))}
          </group>

          {/* Section 5: Contact */}
          <group position={[0, -75, 0]}>
            <Float speed={5}>
              <VoxelModel 
                data={[
                  { pos: [0,0,0], color: '#ff4444' },
                  { pos: [0,1,0], color: '#ffffff' },
                  { pos: [1,0,0], color: '#ff4444' }
                ]} 
                scale={1}
              />
            </Float>
          </group>
        </Scroll>

        <Scroll html>
          <div className="w-screen">
            {/* HERO CONTENT */}
            <section className="h-screen flex flex-col items-center justify-center pointer-events-none">
              <div className="text-center mt-[40vh] pointer-events-auto">
                <div className="inline-block mb-4 px-4 py-1 bg-black/60 border-2 border-cyan-500 text-cyan-400 text-[8px] animate-pulse uppercase">
                  READY PLAYER ONE
                </div>
                <h1 className="text-5xl sm:text-8xl font-black text-white drop-shadow-[8px_8px_0px_rgba(0,0,0,1)] tracking-tighter uppercase mb-4">
                  DEV SHISHIR
                </h1>
                <div className="mc-panel px-4 py-2 inline-block bg-yellow-400 mb-6 border-4 border-black">
                   <p className="text-[10px] text-black font-bold uppercase">AI/ML Developer | Crafting Systems</p>
                </div>
                <div className="flex gap-4 justify-center">
                  <button className="mc-button px-6 py-3 text-[10px] text-white font-bold" onClick={() => window.open('/resume.pdf')}>RESUME.EXE</button>
                  <button className="mc-button px-6 py-3 text-[10px] text-white font-bold bg-blue-600" onClick={() => document.getElementById('contact-view')?.scrollIntoView({behavior: 'smooth'})}>CONTACT_ME</button>
                </div>
              </div>
            </section>

            {/* ABOUT CONTENT */}
            <section className="h-screen flex items-center justify-start px-10 md:px-20">
              <div className="mc-panel p-8 max-w-2xl bg-[#c6c6c6] border-8 border-white">
                <h2 className="text-2xl mb-6 text-black border-b-8 border-gray-400 pb-2 uppercase">_INIT_BIOGRAPHY</h2>
                <p className="text-[10px] text-gray-700 leading-relaxed mb-6 font-bold uppercase">
                  I bridge the gap between complex machine learning models and intuitive user interfaces.
                  Building systems that are as beautiful as they are intelligent. 
                  Based in Earth.exe, I specialize in PyTorch, React, and immersive 3D architectures.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-black/80 text-cyan-400 p-3 text-[8px] border-2 border-cyan-900 font-bold uppercase">ROLE: LEAD CRAFTER</div>
                  <div className="bg-black/80 text-cyan-400 p-3 text-[8px] border-2 border-cyan-900 font-bold uppercase">EXP: 99+ LVL</div>
                </div>
              </div>
            </section>

            {/* SKILLS CONTENT */}
            <section className="min-h-screen py-32 flex flex-col items-center justify-center bg-black/40">
              <h2 className="text-4xl font-black mb-16 drop-shadow-[6px_6px_0px_rgba(0,0,0,1)] text-white uppercase">Skill Tree</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl px-10 w-full">
                {categories.map(cat => (
                  <div key={cat} className="mc-panel p-6 bg-white/95">
                    <h3 className="text-[14px] font-black text-black mb-6 border-b-4 border-gray-300 pb-2 uppercase">{cat}</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {SKILLS.filter(s => s.category === cat).map(skill => (
                        <div key={skill.name}>
                          <div className="flex justify-between mb-2">
                            <span className="text-[8px] font-bold text-black uppercase">{skill.name}</span>
                            <span className="text-[8px] font-bold text-gray-500 uppercase">LVL {skill.level}</span>
                          </div>
                          <div className="w-full h-4 bg-gray-300 border-2 border-black relative">
                            <div 
                              className="h-full transition-all duration-1000" 
                              style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* PROJECTS CONTENT */}
            <section className="min-h-screen py-24 flex flex-col items-center justify-center">
              <h2 className="text-4xl font-black mb-16 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] text-white uppercase">Quest Log</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-10 md:px-20 w-full max-w-7xl">
                {PROJECTS.map(p => (
                  <div key={p.id} className="mc-panel p-4 group hover:-translate-y-4 transition-all duration-300 bg-gray-200 border-8 border-gray-400">
                    <div className="relative aspect-video mb-4 border-4 border-black overflow-hidden bg-black">
                      <img 
                        src={p.thumbnail} 
                        className="w-full h-full object-cover pixelated grayscale group-hover:grayscale-0 transition-all" 
                        alt={p.title}
                      />
                      <div className="absolute top-2 right-2 bg-yellow-400 text-black text-[6px] px-2 py-1 font-bold border-2 border-black">
                        {p.category.toUpperCase()}
                      </div>
                    </div>
                    <h3 className="text-[12px] font-black text-black mb-2 uppercase">{p.title}</h3>
                    <p className="text-[8px] text-gray-700 mb-4 h-12 overflow-hidden leading-tight uppercase font-bold">
                      {p.description}
                    </p>
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {p.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[6px] bg-black text-white px-1.5 py-0.5 border border-gray-600 uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {p.liveUrl && (
                        <button 
                          onClick={() => window.open(p.liveUrl, '_blank')}
                          className="mc-button-sm flex-1 py-2 text-[8px] text-white font-bold bg-green-600 border-green-800"
                        >
                          OPEN_LIVE
                        </button>
                      )}
                      {p.codeUrl && (
                        <button 
                          onClick={() => window.open(p.codeUrl, '_blank')}
                          className="mc-button-sm flex-1 py-2 text-[8px] text-white font-bold bg-gray-700 border-gray-900"
                        >
                          GITHUB
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 text-center">
                <a 
                  href="https://github.com/shishir-sh26?tab=repositories" 
                  target="_blank" 
                  className="mc-button inline-block px-8 py-4 text-[10px] text-white font-bold border-4"
                >
                  VIEW_ALL_REPOS.SH
                </a>
              </div>
            </section>

            {/* CONTACT CONTENT */}
            <section id="contact-view" className="h-screen flex items-center justify-center">
              <div className="mc-panel p-10 md:p-16 text-center bg-white border-8 border-gray-300 max-w-2xl w-full mx-6">
                <h2 className="text-3xl font-black text-black mb-8 uppercase">Contact Server</h2>
                <p className="text-[8px] text-gray-600 mb-8 uppercase font-bold leading-relaxed">
                  Open for new opportunities and blocky partnerships.<br/>Send a transmission.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <button 
                      onClick={() => window.open('https://www.linkedin.com/in/shishir-r-kulal-4757a9296', '_blank')}
                      className="mc-button flex-1 py-4 text-[8px] text-white font-bold bg-blue-500 border-blue-700"
                    >
                      LINKEDIN
                    </button>
                    <button 
                      onClick={() => window.open('https://www.instagram.com/bwmmerc/', '_blank')}
                      className="mc-button flex-1 py-4 text-[8px] text-white font-bold bg-pink-500 border-pink-700"
                    >
                      INSTAGRAM
                    </button>
                  </div>
                  <a href="mailto:shishirkulal1234@gmail.com" className="mc-button w-full py-6 text-[10px] text-white font-black bg-green-600 border-green-800 flex items-center justify-center gap-2">
                    SEND_MESSAGE.MAIL
                  </a>
                </div>
                <div className="mt-12 text-[6px] text-gray-400 font-bold uppercase">
                  IP: 127.0.0.1 | STATUS: ONLINE
                  <br />© 2024 SHISHIR | ALL BLOCKS RESERVED
                </div>
              </div>
            </section>
          </div>
        </Scroll>
      </ScrollControls>
    </>
  );
};

const VoxelWorld: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 h-screen w-screen overflow-hidden bg-black">
      <Canvas shadows camera={{ position: [0, 0, 15], fov: 40 }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default VoxelWorld;
