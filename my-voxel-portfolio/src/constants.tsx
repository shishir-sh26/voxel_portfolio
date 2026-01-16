import type { Project, VoxelData, Skill } from './types';

const createVoxelCube = (size: number, color: string, offset: [number, number, number]): VoxelData[] => {
  const voxels: VoxelData[] = [];
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      for (let z = 0; z < size; z++) {
        voxels.push({
          pos: [x + offset[0], y + offset[1], z + offset[2]],
          color
        });
      }
    }
  }
  return voxels;
};

// Voxel Art for Shishir (Character/Avatar)
export const HERO_CHARACTER: VoxelData[] = [
  ...createVoxelCube(2, '#444', [-1, 0, -1]), // Body
  ...createVoxelCube(1.5, '#facc15', [-0.75, 2, -0.75]), // Head
  { pos: [-0.5, 2.5, 0.5], color: '#fff' }, // Eye L
  { pos: [0.5, 2.5, 0.5], color: '#fff' }, // Eye R
  ...createVoxelCube(0.5, '#333', [-1.2, 0.5, -0.25]), // Arm L
  ...createVoxelCube(0.5, '#333', [0.7, 0.5, -0.25]), // Arm R
];

// Voxel Laptop for About
export const LAPTOP_VOXEL: VoxelData[] = [
  ...createVoxelCube(3, '#222', [-1.5, 0, -1.5]), // Base
  ...createVoxelCube(3, '#111', [-1.5, 0.2, -1.5]), // Screen Frame (closed/open look)
  { pos: [0, 1.5, -1.4], color: '#3b82f6' }, // Glowing screen bit
];

export const SKILLS: Skill[] = [
  { name: 'React', level: 95, color: '#61dafb' },
  { name: 'Node.js', level: 90, color: '#339933' },
  { name: 'Three.js', level: 85, color: '#ffffff' },
  { name: 'Tailwind', level: 95, color: '#06b6d4' }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'BlockCloud Storage',
    description: 'Decentralized voxel-based storage solution with end-to-end encryption.',
    tags: ['Next.js', 'Solidity', 'IPFS'],
    thumbnail: 'https://picsum.photos/400/300?random=21',
    category: 'web',
    voxelArt: createVoxelCube(2, '#ef4444', [0, 0, 0])
  },
  {
    id: '2',
    title: 'MineQuest Engine',
    description: 'A custom physics engine for voxel-based destructible environments.',
    tags: ['C++', 'WASM', 'WebGPU'],
    thumbnail: 'https://picsum.photos/400/300?random=22',
    category: 'web',
    voxelArt: createVoxelCube(2, '#10b981', [0, 0, 0])
  },
  {
    id: '3',
    title: 'PixelBot AI',
    description: 'Autonomous agents that navigate and build in 3D voxel worlds.',
    tags: ['Python', 'TensorFlow', 'React'],
    thumbnail: 'https://picsum.photos/400/300?random=23',
    category: 'ai',
    voxelArt: createVoxelCube(2, '#8b5cf6', [0, 0, 0])
  }
];

export const SYSTEM_INSTRUCTION = `
You are the AI Guide for Shishir's Voxel World. 
Shishir is a premier Full-Stack Developer specializing in 3D Voxel interfaces.
Refer to visitors as "Adventurers" or "Players".
Explain that Shishir "crafts" code like a master builder.
Keep responses snappy and pixel-themed.
`;