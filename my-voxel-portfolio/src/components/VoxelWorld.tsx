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
import { PROJECTS, HERO_CHARACTER, LAPTOP_VOXEL } from '../constants';
import type { ThreeElements } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

const Scene: React.FC = () => {
  return (
    <>
      <color attach="background" args={['#080808']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      <spotLight position={[-10, 20, 10]} angle={0.2} penumbra={1} intensity={1} castShadow />
      <Stars radius={100} depth={50} count={8000} factor={4} saturation={0} fade speed={1.5} />
      <Environment preset="night" />
      
      <ScrollControls pages={5} damping={0.25}>
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
          <group position={[0, -20, 0]}>
             <Float position={[-3, 1, 0]} speed={3}>
               <VoxelModel data={[{pos: [0,0,0], color: '#61dafb'}]} scale={1} />
             </Float>
             <Float position={[3, -1, -2]} speed={2.5}>
               <VoxelModel data={[{pos: [0,0,0], color: '#339933'}]} scale={1} />
             </Float>
             <Float position={[0, 2, -1]} speed={4}>
               <VoxelModel data={[{pos: [0,0,0], color: '#facc15'}]} scale={0.5} />
             </Float>
          </group>

          {/* Section 4: Projects */}
          <group position={[0, -30, 0]}>
            {PROJECTS.map((p, i) => (
              <Float key={p.id} position={[(i - 1) * 6, Math.sin(i) * 1, -2]} speed={2}>
                <VoxelModel data={p.voxelArt || []} scale={0.6} />
              </Float>
            ))}
          </group>

          {/* Section 5: Contact */}
          <group position={[0, -40, 0]}>
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
            <section className="h-screen flex flex-col items-center justify-center pointer-events-none">
              <div className="text-center mt-[40vh] pointer-events-auto">
                <h1 className="text-7xl sm:text-9xl font-black text-white drop-shadow-[10px_10px_0px_rgba(0,0,0,1)] tracking-tighter uppercase mb-2">
                  SHISHIR
                </h1>
                <div className="mc-panel px-4 py-2 inline-block bg-yellow-400">
                   <p className="text-[10px] text-black font-bold uppercase tracking-widest">Master of the Voxel-Verse</p>
                </div>
              </div>
            </section>

            <section className="h-screen flex items-center justify-start px-20">
              <div className="mc-panel p-10 max-w-2xl bg-[#c6c6c6] border-8 border-white">
                <h2 className="text-3xl mb-6 text-black border-b-8 border-gray-400 pb-2">_INIT_BIOGRAPHY</h2>
                <p className="text-xs text-gray-700 leading-loose mb-6 font-bold uppercase">
                  Based in the digital ether, I build scalable web architectures and immersive 3D interfaces. 
                  I believe the future of the web is spatial, blocky, and open-source.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black text-white p-3 text-[10px] border-r-4 border-b-4 border-gray-600">LOCATION: EARTH.EXE</div>
                  <div className="bg-black text-white p-3 text-[10px] border-r-4 border-b-4 border-gray-600">ROLE: LEAD CRAFTER</div>
                </div>
              </div>
            </section>

            <section className="h-screen flex flex-col items-center justify-center">
              <h2 className="text-5xl font-black mb-12 drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]">SKILL TREE</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                {['REACT', 'NODE', 'THREE', 'TYPESCRIPT'].map(skill => (
                  <div key={skill} className="mc-panel p-6 text-center hover:scale-110 transition-transform">
                    <p className="text-[10px] font-bold text-black">{skill}</p>
                    <div className="w-full h-4 bg-gray-400 mt-4 border-2 border-black overflow-hidden">
                      <div className="h-full bg-green-500 w-[85%]"></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="h-screen flex flex-col items-center justify-center">
              <h2 className="text-4xl font-black mb-16 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">QUEST LOG</h2>
              <div className="flex gap-12 overflow-x-auto px-20 no-scrollbar w-full py-10">
                {PROJECTS.map(p => (
                  <div key={p.id} className="mc-panel min-w-[320px] p-6 group hover:-translate-y-8 transition-all duration-300">
                    <img src={p.thumbnail} className="w-full h-40 object-cover border-4 border-black mb-4 pixelated grayscale group-hover:grayscale-0" />
                    <h3 className="text-lg font-black text-black mb-2">{p.title}</h3>
                    <p className="text-[10px] text-gray-600 mb-4 h-12 overflow-hidden">{p.description}</p>
                    <button className="mc-button w-full py-2 text-[10px] text-white font-bold">VIEW SOURCE</button>
                  </div>
                ))}
              </div>
            </section>

            <section className="h-screen flex items-center justify-center">
              <div className="mc-panel p-16 text-center bg-white border-8 border-gray-300">
                <h2 className="text-4xl font-black text-black mb-8">CONTACT SERVER</h2>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <button className="mc-button flex-1 py-4 text-[10px] text-white font-bold">DISCORD</button>
                    <button className="mc-button flex-1 py-4 text-[10px] text-white font-bold">X / TWITTER</button>
                  </div>
                  <button className="mc-button w-full py-6 text-sm text-white font-black bg-green-600 border-green-800">SEND MESSAGE</button>
                </div>
                <p className="mt-8 text-[8px] text-gray-400">© 2024 SHISHIR | ALL BLOCKS RESERVED</p>
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