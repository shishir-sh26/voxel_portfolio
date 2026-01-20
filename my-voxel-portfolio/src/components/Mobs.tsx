import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Interface for customizing mob colors via props or AI-generated variants.
 */
export interface MobProps {
  colorOverride?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  scale?: number;
}

/**
 * A reusable Humanoid component that handles proportions and basic walking animations
 * for Steve, Zombies, and Skeletons.
 */
const Humanoid: React.FC<MobProps & { 
  skinColor: string; 
  shirtColor: string; 
  pantsColor: string; 
  isSkeleton?: boolean;
  isZombie?: boolean;
}> = ({ skinColor, shirtColor, pantsColor, isSkeleton = false, isZombie = false, scale = 1 }) => {
  const group = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Mesh>(null);
  const rightArm = useRef<THREE.Mesh>(null);
  const leftLeg = useRef<THREE.Mesh>(null);
  const rightLeg = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const walkingSpeed = 3.5;
    const limbSwing = Math.sin(t * walkingSpeed) * 0.5;

    if (leftLeg.current) leftLeg.current.rotation.x = -limbSwing;
    if (rightLeg.current) rightLeg.current.rotation.x = limbSwing;

    if (isZombie) {
      // Zombies hold their arms forward
      if (leftArm.current) leftArm.current.rotation.x = -Math.PI / 2 + Math.sin(t * 2) * 0.05;
      if (rightArm.current) rightArm.current.rotation.x = -Math.PI / 2 + Math.cos(t * 2) * 0.05;
    } else {
      if (leftArm.current) leftArm.current.rotation.x = limbSwing;
      if (rightArm.current) rightArm.current.rotation.x = -limbSwing;
    }

    if (group.current) {
      group.current.position.y = Math.abs(Math.cos(t * walkingSpeed * 2)) * 0.05;
    }
  });

  const limbWidth = isSkeleton ? 0.2 : 0.4;
  const limbDepth = isSkeleton ? 0.2 : 0.4;

  return (
    <group ref={group} scale={scale}>
      {/* Head - 8x8x8 pixels relative */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color={skinColor} />
      </mesh>
      
      {/* Body - 8x12x4 pixels */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[0.8, 1.2, 0.4]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>

      {/* Arms - 4x12x4 pixels */}
      <mesh ref={leftArm} position={[-0.6, 0.7, 0]} castShadow>
        <boxGeometry args={[limbWidth, 1.2, limbDepth]} />
        <meshStandardMaterial color={isSkeleton ? skinColor : shirtColor} />
      </mesh>
      <mesh ref={rightArm} position={[0.6, 0.7, 0]} castShadow>
        <boxGeometry args={[limbWidth, 1.2, limbDepth]} />
        <meshStandardMaterial color={isSkeleton ? skinColor : shirtColor} />
      </mesh>

      {/* Legs - 4x12x4 pixels */}
      <mesh ref={leftLeg} position={[-0.2, -0.5, 0]} castShadow>
        <boxGeometry args={[limbWidth, 1.2, limbDepth]} />
        <meshStandardMaterial color={pantsColor} />
      </mesh>
      <mesh ref={rightLeg} position={[0.2, -0.5, 0]} castShadow>
        <boxGeometry args={[limbWidth, 1.2, limbDepth]} />
        <meshStandardMaterial color={pantsColor} />
      </mesh>
    </group>
  );
};

export const Steve: React.FC<MobProps> = ({ colorOverride, scale }) => (
  <Humanoid 
    skinColor={colorOverride?.accent || "#FFDBAC"} 
    shirtColor={colorOverride?.primary || "#00A86B"} 
    pantsColor={colorOverride?.secondary || "#3B5998"} 
    scale={scale}
  />
);

export const Zombie: React.FC<MobProps> = ({ colorOverride, scale }) => (
  <Humanoid 
    skinColor={colorOverride?.accent || "#5E8C31"} 
    shirtColor={colorOverride?.primary || "#1F3D1F"} 
    pantsColor={colorOverride?.secondary || "#2E2E2E"} 
    isZombie={true}
    scale={scale}
  />
);

export const Skeleton: React.FC<MobProps> = ({ colorOverride, scale }) => (
  <Humanoid 
    skinColor={colorOverride?.primary || "#D3D3D3"} 
    shirtColor={colorOverride?.secondary || "#D3D3D3"} 
    pantsColor={colorOverride?.accent || "#D3D3D3"} 
    isSkeleton={true} 
    scale={scale}
  />
);

/**
 * Detailed Ender Dragon component with animated wings, tail, and head movement.
 */
export const EnderDragon: React.FC<MobProps & { glow?: boolean }> = ({ colorOverride, scale = 1, glow = false }) => {
  const group = useRef<THREE.Group>(null);
  const wingLeft = useRef<THREE.Group>(null);
  const wingRight = useRef<THREE.Group>(null);
  const headGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const flapSpeed = 4.0;
    
    // Wing flapping
    if (wingLeft.current) wingLeft.current.rotation.z = Math.sin(t * flapSpeed) * 0.5;
    if (wingRight.current) wingRight.current.rotation.z = -Math.sin(t * flapSpeed) * 0.5;
    
    // Body hover & head bobbing
    if (group.current) {
      group.current.position.y = Math.sin(t * 1.5) * 0.2;
    }
    if (headGroup.current) {
      headGroup.current.rotation.x = Math.sin(t * 1.5) * 0.1;
      headGroup.current.rotation.y = Math.cos(t * 0.8) * 0.1;
    }
  });

  const mainColor = colorOverride?.primary || "#111111";
  const wingColor = colorOverride?.secondary || "#1a1a1a";
  const eyeColor = colorOverride?.accent || "#ff00ff";

  return (
    <group ref={group} scale={scale}>
      {/* Head Assembly */}
      <group ref={headGroup} position={[0, 0.4, 1.2]}>
        <mesh>
          <boxGeometry args={[0.8, 0.8, 1]} />
          <meshStandardMaterial color={mainColor} emissive={glow ? mainColor : 'black'} emissiveIntensity={glow ? 0.2 : 0} />
        </mesh>
        {/* Snout */}
        <mesh position={[0, -0.1, 0.8]}>
          <boxGeometry args={[0.5, 0.4, 0.6]} />
          <meshStandardMaterial color={mainColor} emissive={glow ? mainColor : 'black'} emissiveIntensity={glow ? 0.2 : 0} />
        </mesh>
        {/* Eyes (Glowing) */}
        <mesh position={[0.25, 0.15, 0.51]}>
          <boxGeometry args={[0.15, 0.1, 0.05]} />
          <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={5} />
        </mesh>
        <mesh position={[-0.25, 0.15, 0.51]}>
          <boxGeometry args={[0.15, 0.1, 0.05]} />
          <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={5} />
        </mesh>
        {/* Horns */}
        <mesh position={[0.2, 0.4, -0.2]}>
          <boxGeometry args={[0.15, 0.3, 0.15]} />
          <meshStandardMaterial color={mainColor} />
        </mesh>
        <mesh position={[-0.2, 0.4, -0.2]}>
          <boxGeometry args={[0.15, 0.3, 0.15]} />
          <meshStandardMaterial color={mainColor} />
        </mesh>
      </group>

      {/* Neck Segments */}
      {[0.4, 0.8].map((z, i) => (
        <mesh key={i} position={[0, 0.2, z]}>
          <boxGeometry args={[0.6, 0.6, 0.4]} />
          <meshStandardMaterial color={mainColor} />
        </mesh>
      ))}

      {/* Main Body */}
      <mesh position={[0, 0, -0.5]}>
        <boxGeometry args={[1.5, 1.2, 2.5]} />
        <meshStandardMaterial color={mainColor} />
      </mesh>

      {/* Wings */}
      <group ref={wingLeft} position={[-0.75, 0.4, -0.5]}>
        <mesh position={[-1.25, 0, 0]}>
          <boxGeometry args={[2.5, 0.05, 1.5]} />
          <meshStandardMaterial color={wingColor} transparent opacity={0.9} metalness={0.5} roughness={0.2} />
        </mesh>
      </group>
      <group ref={wingRight} position={[0.75, 0.4, -0.5]}>
        <mesh position={[1.25, 0, 0]}>
          <boxGeometry args={[2.5, 0.05, 1.5]} />
          <meshStandardMaterial color={wingColor} transparent opacity={0.9} metalness={0.5} roughness={0.2} />
        </mesh>
      </group>

      {/* Tail - Multiple Segments */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[0, -0.1 * i, -1.8 - i * 0.7]}>
          <boxGeometry args={[0.8 - i * 0.1, 0.8 - i * 0.1, 0.8]} />
          <meshStandardMaterial color={mainColor} />
          {/* Spines on tail */}
          <mesh position={[0, 0.45 - i * 0.05, 0]}>
            <boxGeometry args={[0.2, 0.3, 0.2]} />
            <meshStandardMaterial color={wingColor} />
          </mesh>
        </mesh>
      ))}

      {/* Legs (Sturdy blocks) */}
      <group position={[0, -0.6, 0]}>
        <mesh position={[-0.5, -0.3, 0.3]}><boxGeometry args={[0.5, 0.8, 0.5]} /><meshStandardMaterial color={mainColor} /></mesh>
        <mesh position={[0.5, -0.3, 0.3]}><boxGeometry args={[0.5, 0.8, 0.5]} /><meshStandardMaterial color={mainColor} /></mesh>
        <mesh position={[-0.5, -0.3, -1.3]}><boxGeometry args={[0.5, 0.8, 0.5]} /><meshStandardMaterial color={mainColor} /></mesh>
        <mesh position={[0.5, -0.3, -1.3]}><boxGeometry args={[0.5, 0.8, 0.5]} /><meshStandardMaterial color={mainColor} /></mesh>
      </group>
    </group>
  );
};
