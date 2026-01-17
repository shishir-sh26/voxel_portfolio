import type { Project, VoxelData, Skill, Certification } from './types';

export const SPLASH_TEXTS = [
  "Coded with blocks!",
  "Voxelized!",
  "99% Bug Free!",
  "Now with AI!",
  "Also try Terraria!",
  "Creeper? Aw man!",
  "RTX: ON",
  "Powered by Gemini!",
  "Adventure is out there!",
  "Diggy Diggy Hole!"
];

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

// RESTORED: Detailed Voxel Creeper
export const CREEPER_VOXEL: VoxelData[] = [
  ...createVoxelCube(1.5, '#4ade80', [-0.75, 4, -0.75]), // Head
  { pos: [-0.4, 4.8, 0.76], color: '#000' }, // Eye L
  { pos: [0.4, 4.8, 0.76], color: '#000' },  // Eye R
  { pos: [0, 4.4, 0.76], color: '#000' },    // Mouth center
  ...createVoxelCube(1.2, '#22c55e', [-0.6, 1.5, -0.6]), // Body
  ...createVoxelCube(0.8, '#16a34a', [-1, 0, 0.2]),   // Front Leg L
  ...createVoxelCube(0.8, '#16a34a', [0.2, 0, 0.2]),  // Front Leg R
  ...createVoxelCube(0.8, '#16a34a', [-1, 0, -1]),    // Back Leg L
  ...createVoxelCube(0.8, '#16a34a', [0.2, 0, -1]),   // Back Leg R
];

// RESTORED: Detailed Voxel Character
export const HERO_CHARACTER: VoxelData[] = [
  ...createVoxelCube(2, '#444', [-1, 0, -1]), // Body
  ...createVoxelCube(1.5, '#facc15', [-0.75, 2, -0.75]), // Head
  { pos: [-0.5, 2.5, 0.5], color: '#fff' }, // Eye L
  { pos: [0.5, 2.5, 0.5], color: '#fff' }, // Eye R
  ...createVoxelCube(0.5, '#333', [-1.2, 0.5, -0.25]), // Arm L
  ...createVoxelCube(0.5, '#333', [0.7, 0.5, -0.25]), // Arm R
];

// RESTORED: Detailed Voxel Laptop
export const LAPTOP_VOXEL: VoxelData[] = [
  ...createVoxelCube(3, '#222', [-1.5, 0, -1.5]), // Base
  ...createVoxelCube(3, '#111', [-1.5, 0.2, -1.5]), // Screen Frame
  { pos: [0, 1.5, -1.4], color: '#3b82f6' }, // Glowing screen bit
];

export const SKILLS: Skill[] = [
  { name: 'React', level: 95, color: '#61dafb', category: 'Frontend' },
  { name: 'Next.js', level: 90, color: '#000000', category: 'Frontend' },
  { name: 'TypeScript', level: 95, color: '#3178c6', category: 'Frontend' },
  { name: 'Tailwind CSS', level: 90, color: '#38bdf8', category: 'Frontend' },
  { name: 'Node.js', level: 90, color: '#339933', category: 'Backend' },
  { name: 'Python', level: 85, color: '#3776ab', category: 'Backend' },
  { name: 'PyTorch', level: 80, color: '#ee4c2c', category: 'AI & ML' },
  { name: 'TensorFlow', level: 75, color: '#ff6f00', category: 'AI & ML' },
  { name: 'Arduino', level: 85, color: '#00979d', category: 'IoT & Embedded' }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Avian Weather Net',
    description: 'Predicting weather using Birds sound through a Deep Learning model and a full-stack application.',
    tags: ['Deep Learning', 'PyTorch', 'React'],
    thumbnail: 'https://picsum.photos/400/300?random=1',
    category: 'ai',
    videoUrl: '/AvainWeatherNet.mp4',
    codeUrl: 'https://github.com/shishir-sh26/AvainWeatherNet',
    voxelArt: createVoxelCube(2, '#3b82f6', [0, 0, 0])
  },
  {
    id: '2',
    title: 'Plant Fertilizer & Disease Detection',
    description: 'AI-based agricultural assistance using computer vision to diagnose plant diseases and recommend fertilizers.',
    tags: ['Computer Vision', 'FastAPI', 'React'],
    thumbnail: 'https://picsum.photos/400/300?random=2',
    category: 'ai',
    videoUrl: '/agrisense.mp4',
    liveUrl: 'https://shrinidhianchan.github.io/ai-plant-based-agrisense/',
    codeUrl: 'https://github.com/shishir-sh26/agrisense',
    voxelArt: createVoxelCube(2, '#10b981', [0, 0, 0])
  },
  {
    id: '3',
    title: 'WarRoom',
    description: 'War Room is a real-time command center designed for hackathons and rapid development sprints.',
    tags: ['Real-time', 'Socket.io', 'Node.js'],
    thumbnail: 'https://picsum.photos/400/300?random=3',
    category: 'web',
    videoUrl: '/WarRoom_Hackathon_Collaboration_Dashboard_Video.mp4',
    liveUrl: 'https://h-teamstate.vercel.app/',
    codeUrl: 'https://github.com/shishir-sh26/H-TeamState',
    voxelArt: createVoxelCube(2, '#f59e0b', [0, 0, 0])
  },
  {
    id: '4',
    title: 'Expense Tracker',
    description: 'Project built to track your daily expenses using React and Node.js.',
    tags: ['MERN', 'Auth', 'Dashboard'],
    thumbnail: 'https://picsum.photos/400/300?random=4',
    category: 'web',
    videoUrl: '/Expense_Tracker_Video_Generation.mp4',
    codeUrl: 'https://github.com/shishir-sh26/expense-tracker',
    voxelArt: createVoxelCube(2, '#6366f1', [0, 0, 0])
  },
  {
    id: '5',
    title: 'Blood Donation App',
    description: 'Application to store the blood type and search for an donar nearby.',
    tags: ['Mobile', 'Geolocation', 'Firebase'],
    thumbnail: 'https://picsum.photos/400/300?random=5',
    category: 'mobile',
    videoUrl: '/Blood_Donor_Search_Application.mp4',
    codeUrl: 'https://github.com/shishir-sh26/-blooddonar',
    voxelArt: createVoxelCube(2, '#ef4444', [0, 0, 0])
  },
  {
    id: '6',
    title: 'Stock-prediction',
    description: 'LSTM Stock Price Prediction Model for all stocks',
    tags: ['LSTM', 'Data Science', 'Python'],
    thumbnail: 'https://picsum.photos/400/300?random=6',
    category: 'ai',
    videoUrl: '/AI_Stock_Prediction_Video_Ready.mp4',
    codeUrl: 'https://github.com/shishir-sh26/Stock-prediction',
    voxelArt: createVoxelCube(2, '#a855f7', [0, 0, 0])
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'c1',
    title: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI',
    date: '2023',
    link: '#'
  },
  {
    id: 'c2',
    title: 'TensorFlow Developer Certificate',
    issuer: 'Google',
    date: '2024',
    link: '#'
  },
  {
    id: 'c3',
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2023',
    link: '#'
  }
];

export const SYSTEM_INSTRUCTION = `
You are the AI Guide for Shishir's Voxel World. 
Shishir is an AI/ML Developer experienced in Deep Learning and Full-Stack deployment.
Refer to visitors as "Adventurers" or "Players".
Mention his key projects like "Avian Weather Net" or "WarRoom" if asked.
Keep responses snappy, helpful, and block-themed.
`;