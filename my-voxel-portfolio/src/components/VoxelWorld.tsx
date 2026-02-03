import React, { Suspense, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  ScrollControls, 
  Scroll, 
  Stars, 
  Float, 
  Center,
  Environment,
} from '@react-three/drei';
import VoxelModel from './VoxelModel';
import { EnderDragon, Zombie, Skeleton, Steve } from './Mobs';
import { PROJECTS, HERO_CHARACTER, LAPTOP_VOXEL, CREEPER_VOXEL, SKILLS, CERTIFICATIONS } from '../constants';
import * as THREE from 'three';

const MovingEnderDragon: React.FC = () => {
  const ref = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const [targetIdx, setTargetIdx] = useState(0);
  
  const corners = useMemo(() => [
    new THREE.Vector3(-10, 6, 0),  // Top Left
    new THREE.Vector3(10, 6, 0),   // Top Right
    new THREE.Vector3(10, -6, 0),  // Bottom Right
    new THREE.Vector3(-10, -6, 0), // Bottom Left
  ], []);

  useFrame((state, delta) => {
    if (ref.current) {
      const target = corners[targetIdx];
      // Slowed down movement for a graceful, slow glide
      ref.current.position.lerp(target, 0.003);
      
      // Look at target smoothly
      const lookTarget = new THREE.Vector3().copy(target);
      ref.current.lookAt(lookTarget);
      
      // Pulsing light effect
      if (lightRef.current) {
        lightRef.current.intensity = 2 + Math.sin(state.clock.elapsedTime * 3) * 1.5;
      }

      if (ref.current.position.distanceTo(target) < 1.5) {
        setTargetIdx((prev) => (prev + 1) % corners.length);
      }
    }
  });

  return (
    <group ref={ref}>
       <EnderDragon scale={1.5} glow={true} />
       <pointLight ref={lightRef} color="#ff00ff" distance={20} intensity={5} />
    </group>
  );
};

const InteractiveVoxel: React.FC<{ data: any, scale: number, jump?: boolean }> = ({ data, scale, jump }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += hovered ? 0.08 : 0.01;
      
      if (clicked) {
        ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, 2.5, 0.2);
        if (ref.current.position.y > 2.3) setClicked(false);
      } else {
        ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, 0, 0.1);
      }
      
      const targetScale = hovered ? scale * 1.15 : scale;
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group 
      ref={ref}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        setClicked(true);
      }}
    >
      <VoxelModel data={data} scale={1} />
    </group>
  );
};

const Scene: React.FC = () => {
  const categories = ['Frontend', 'Backend', 'AI & ML', 'IoT & Embedded'] as const;

  return (
    <>
      <color attach="background" args={['#050505']} />
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <spotLight position={[-10, 20, 10]} angle={0.25} penumbra={1} intensity={2} castShadow />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
      
      <Scroll>
        {/* Intro */}
        <group position={[0, 0, 0]}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <Center>
              <InteractiveVoxel data={HERO_CHARACTER} scale={0.7} />
            </Center>
          </Float>
        </group>

        {/* Bio Section - Humanoid NPCs around */}
        <group position={[-5, -10, -2]}>
          <Steve scale={0.8} />
        </group>
        <group position={[5, -14, -2]}>
          <Zombie scale={0.8} />
        </group>

        <group position={[0, -12, -2]}>
          <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
            <Center>
              <InteractiveVoxel data={LAPTOP_VOXEL} scale={0.8} />
            </Center>
          </Float>
        </group>

        <group position={[0, -25, 0]}>
           <Float position={[-5, 2, 0]} speed={3}>
             <InteractiveVoxel data={[{pos: [0,0,0], color: '#61dafb'}]} scale={1.2} />
           </Float>
           <Float position={[5, -2, -2]} speed={2.5}>
             <InteractiveVoxel data={[{pos: [0,0,0], color: '#339933'}]} scale={1.2} />
           </Float>
           <Float position={[0, 4, -4]} speed={4}>
             <InteractiveVoxel data={[{pos: [0,0,0], color: '#ee4c2c'}]} scale={1} />
           </Float>
        </group>

        {/* Project Section NPCs */}
        <group position={[-8, -45, -3]}>
           <Skeleton scale={1} />
        </group>

        <group position={[0, -48, 0]}>
          {PROJECTS.map((p, i) => (
            <Float key={p.id} position={[(i % 2 === 0 ? -5 : 5), -i * 5, -2]} speed={2}>
              <InteractiveVoxel data={p.voxelArt || []} scale={0.8} />
            </Float>
          ))}
        </group>

        <group position={[0, -85, 0]}>
          <Float speed={1} rotationIntensity={0.5}>
            <Center>
              <InteractiveVoxel data={CREEPER_VOXEL} scale={0.7} jump />
            </Center>
          </Float>
        </group>

        {/* The End section with Ender Dragon */}
        <group position={[0, -115, 0]}>
           <MovingEnderDragon />
        </group>
      </Scroll>

      <Scroll html>
        <div className="w-screen">
          <section className="h-screen flex flex-col items-center justify-center pointer-events-none">
            <div className="text-center mt-[40vh] pointer-events-auto">
              <div className="inline-block mb-4 px-4 py-1 bg-black/60 border-2 border-cyan-500 text-cyan-400 text-[8px] animate-pulse uppercase">
                WORLD LOADED
              </div>
              <h1 className="text-5xl sm:text-8xl font-black text-white drop-shadow-[8px_8px_0px_rgba(0,0,0,1)] tracking-tighter uppercase mb-4">
                SHISHIR R KULAL
              </h1>
              <div className="mc-panel px-4 py-2 inline-block bg-yellow-400 mb-6 border-4 border-black">
                 <p className="text-[10px] text-black font-bold uppercase tracking-tight">AI & ML Engineer / Developer</p>
              </div>
              <div className="flex gap-4 justify-center">
                <button className="mc-button px-6 py-3 text-[10px] text-white font-bold" onClick={() => window.open('/resume_shishir.pdf')}>RESUME.EXE</button>
                <button className="mc-button px-6 py-3 text-[10px] text-white font-bold bg-blue-600" onClick={() => document.getElementById('contact-view')?.scrollIntoView({behavior: 'smooth'})}>CONTACT_ME</button>
              </div>
            </div>
          </section>

          <section className="h-screen flex items-center justify-start px-10 md:px-20">
            <div className="mc-panel p-8 max-w-2xl bg-[#c6c6c6] border-8 border-white hover:scale-[1.02] hover:border-yellow-400 transition-all duration-300 group cursor-default">
              <h2 className="text-2xl mb-6 text-black border-b-8 border-gray-400 pb-2 uppercase group-hover:border-yellow-600 transition-colors">_LOG_BIOGRAPHY</h2>
              <p className="text-[10px] text-gray-700 leading-relaxed mb-6 font-bold uppercase group-hover:text-black transition-colors">
                Crafting intelligent systems through computer vision and machine learning.
              </p>
              <p className="text-[10px] text-gray-700 leading-relaxed mb-6 font-bold uppercase group-hover:text-black transition-colors">
              Orchestrating scalable realms through strategic automation and survival-ready deployments.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-black/80 text-cyan-400 p-3 text-[8px] border-2 border-cyan-900 font-bold uppercase group-hover:border-cyan-400 transition-colors">EXP: 99+ LVL</div>
                <div className="bg-black/80 text-cyan-400 p-3 text-[8px] border-2 border-cyan-900 font-bold uppercase group-hover:border-cyan-400 transition-colors">ROLE: CRAFTER</div>
              </div>
            </div>
          </section>

          <section className="min-h-screen py-32 flex flex-col items-center justify-center bg-black/30">
            <h2 className="text-4xl font-black mb-16 drop-shadow-[6px_6px_0px_rgba(0,0,0,1)] text-white uppercase">Skill Tree</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl px-10 w-full">
              {categories.map(cat => (
                <div key={cat} className="mc-panel p-6 bg-white/95 hover:scale-[1.02] hover:border-cyan-500 transition-all duration-300">
                  <h3 className="text-[14px] font-black text-black mb-6 border-b-4 border-gray-300 pb-2 uppercase">{cat}</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {SKILLS.filter(s => s.category === cat).map(skill => (
                      <div key={skill.name} className="group/skill">
                        <div className="flex justify-between mb-2">
                          <span className="text-[8px] font-bold text-black uppercase group-hover/skill:text-blue-600 transition-colors">{skill.name}</span>
                          <span className="text-[8px] font-bold text-gray-500 uppercase">{skill.level}%</span>
                        </div>
                        <div className="w-full h-4 bg-gray-300 border-2 border-black relative">
                          <div 
                            className="h-full transition-all duration-1000 group-hover/skill:brightness-110" 
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

          <section className="min-h-screen py-24 flex flex-col items-center justify-center">
            <h2 className="text-4xl font-black mb-16 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] text-white uppercase">Completed Quests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-10 md:px-20 w-full max-w-7xl">
              {PROJECTS.map(p => (
                <div key={p.id} className="mc-panel p-4 group hover:-translate-y-4 transition-all duration-300 bg-gray-200 border-8 border-gray-400">
                  <div className="relative aspect-video mb-4 border-4 border-black overflow-hidden bg-black">
                    {p.videoUrl ? (
                      <video 
                        src={p.videoUrl} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className="w-full h-full object-cover pixelated grayscale group-hover:grayscale-0 transition-all"
                      />
                    ) : (
                      <img 
                        src={p.thumbnail} 
                        className="w-full h-full object-cover pixelated grayscale group-hover:grayscale-0 transition-all" 
                        alt={p.title}
                      />
                    )}
                  </div>
                  <h3 className="text-[12px] font-black text-black mb-2 uppercase">{p.title}</h3>
                  <p className="text-[8px] text-gray-700 mb-4 h-12 overflow-hidden uppercase font-bold">
                    {p.description}
                  </p>
                  <div className="flex gap-2">
                    <button onClick={() => window.open(p.codeUrl, '_blank')} className="mc-button-sm flex-1 py-2 text-[8px] text-white font-bold bg-gray-700">GITHUB</button>
                    {p.liveUrl && <button onClick={() => window.open(p.liveUrl, '_blank')} className="mc-button-sm flex-1 py-2 text-[8px] text-white font-bold bg-green-600">LIVE</button>}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-20 flex flex-col items-center justify-center text-center">
              <p className="text-[10px] text-gray-400 mb-6 font-bold uppercase">
                For more projects and code samples, visit my GitHub:
              </p>
              <button 
                onClick={() => window.open('https://github.com/shishir-sh26?tab=repositories', '_blank')}
                className="mc-button px-8 py-4 text-[10px] text-white font-bold flex items-center gap-3"
              >
                REPOSITORIES.EXE
              </button>
            </div>
          </section>


          <section className="min-h-screen py-24 flex flex-col items-center justify-center bg-black/40">
             <h2 className="text-4xl font-black mb-16 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] text-white uppercase">Achievements</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-10 w-full max-w-7xl">
               {CERTIFICATIONS.map(cert => (
                 <div key={cert.id} className="mc-panel p-6 bg-[#c6c6c6] border-8 border-white hover:border-yellow-400 hover:-translate-y-2 hover:shadow-[15px_15px_0px_rgba(0,0,0,1)] transition-all duration-300 group">
                   <div className="flex flex-col items-center text-center">
                     <div className="w-12 h-12 mb-4 pixelated grayscale group-hover:grayscale-0 transition-all opacity-80" style={{backgroundImage: 'url(https://minecraft.wiki/images/Knowledge_Book_JE2_BE2.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}} />
                     <h3 className="text-[10px] font-black text-black mb-2 uppercase">{cert.title}</h3>
                     <p className="text-[8px] text-gray-700 mb-1 uppercase font-bold">{cert.issuer}</p>
                     <p className="text-[7px] text-gray-500 mb-6 uppercase font-bold">DATE: {cert.date}</p>
                     <button onClick={() => window.open(cert.link, '_blank')} className="mc-button-sm w-full py-3 text-[8px] text-white font-bold bg-blue-600">VIEW_LOG</button>
                   </div>
                 </div>
               ))}
             </div>
          </section>

          <section id="contact-view" className="h-screen flex items-center justify-center">
            <div className="mc-panel p-10 text-center bg-white border-8 border-gray-300 max-w-2xl w-full mx-6">
              <h2 className="text-3xl font-black text-black mb-8 uppercase">Transmission</h2>
              <div className="flex flex-col gap-4">
                <a href="mailto:shishirkulal1234@gmail.com" className="mc-button w-full py-4 text-[10px] text-white font-black bg-red-600 border-red-800 flex items-center justify-center gap-2">
                  MAIL.ME
                </a>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button onClick={() => window.open('https://github.com/shishir-sh26', '_blank')} className="mc-button py-3 text-[8px] text-white font-bold bg-[#333]">GITHUB</button>
                  <button onClick={() => window.open('https://www.linkedin.com/in/shishir-r-kulal-4757a9296', '_blank')} className="mc-button py-3 text-[8px] text-white font-bold bg-[#0077b5]">LINKEDIN</button>
                  <button onClick={() => window.open('https://www.instagram.com/bwmmerc/', '_blank')} className="mc-button py-3 text-[8px] text-white font-bold bg-[#e1306c]">INSTAGRAM</button>
                </div>
              </div>
            </div>
          </section>

          <section className="h-screen flex flex-col items-center justify-center bg-purple-900/20">
             <div className="text-center">
                <h2 className="text-6xl sm:text-9xl font-black text-white drop-shadow-[10px_10px_0px_#ff00ff] uppercase mb-12 animate-pulse">
                  THE END
                </h2>
                <div className="mc-panel bg-black/80 px-8 py-4 border-4 border-purple-500">
                  <p className="text-[12px] text-purple-400 font-bold uppercase tracking-widest">Adventure Completed</p>
                </div>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="mc-button mt-12 px-8 py-4 text-white text-[10px] font-bold"
                >
                  RESTART_JOURNEY
                </button>
             </div>
          </section>
        </div>
      </Scroll>
    </>
  );
};

const VoxelWorld: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 h-screen w-screen overflow-hidden bg-black">
      <Canvas shadows camera={{ position: [0, 0, 15], fov: 40 }}>
        <Suspense fallback={null}>
          <ScrollControls pages={15} damping={0.15} infinite={false}>
            <Scene />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default VoxelWorld;
