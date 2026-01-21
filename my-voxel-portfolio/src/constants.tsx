import type { Project, VoxelData, Skill, Certification } from './types';

export const SPLASH_TEXTS = [
  "Coded with blocks!",
  "Voxelized!",
  "99% Bug Free!",
  "Now with AI!",
  "Also try Terraria!",
  "Creeper? Aw man!",
  "RTX: ON",
  "Powered by logic!",
  "Adventure is out there!",
  "Diggy Diggy Hole!"
];

// --- Chat Bot Logic Tree ---
export const CHAT_TREE: Record<string, { message: string; options: { label: string; next: string }[] }> = {
  start: {
    message: "Greetings, Adventurer! I am Shishir's Voxel Guide. I contain all the data regarding his builds and scrolls. What shall we explore?",
    options: [
      { label: "VIEW PROJECTS", next: "projects" },
      { label: "CHECK SKILLS", next: "skills" },
      { label: "CERTIFICATIONS", next: "certs" },
    ],
  },
  projects: {
    message: "Shishir has forged many artifacts. Which category of magic interests you?",
    options: [
      { label: "AI & DEEP LEARNING", next: "ai_proj" },
      { label: "WEB & REAL-TIME", next: "web_proj" },
      { label: "MOBILE APPS", next: "mobile_proj" },
      { label: "BACK TO START", next: "start" },
    ],
  },
  ai_proj: {
    message: "In the AI forge: 'Avian Weather Net' predicts weather via bird sounds, 'Plant AgriSense' detects crop disease, and he has even built an LSTM Stock predictor.",
    options: [
      { label: "TELL ME MORE", next: "projects" },
      { label: "MAIN MENU", next: "start" },
    ],
  },
  web_proj: {
    message: "For the web: 'WarRoom' serves as a real-time command center, and he built a full MERN Expense Tracker for digital gold.",
    options: [
      { label: "TELL ME MORE", next: "projects" },
      { label: "MAIN MENU", next: "start" },
    ],
  },
  mobile_proj: {
    message: "On mobile: He developed a Blood Donation app with Firebase and Geolocation to help save lives.",
    options: [
      { label: "OTHER PROJECTS", next: "projects" },
      { label: "BACK", next: "start" },
    ],
  },
  skills: {
    message: "Inventory Check: Shishir is Level 95 in React, 90 in Next.js, and 80 in PyTorch. He also carries IoT gear like Arduino and Raspberry Pi.",
    options: [
      { label: "SEE PROJECTS", next: "projects" },
      { label: "BACK", next: "start" },
    ],
  },
  certs: {
    message: "Mastery Scrolls: Deep Learning Specialization (Dhaarini Academy), TensorFlow (Kaggle), and AWS Solutions Architect.",
    options: [{ label: "BACK TO START", next: "start" }],
  },
};

// --- Voxel Model Utilities ---
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

// --- Voxel Assets ---
export const ENDER_DRAGON_VOXEL: VoxelData[] = [
  ...createVoxelCube(3, '#1a1a1a', [-1.5, 0, -1.5]),
  ...createVoxelCube(1, '#1a1a1a', [-0.5, 0.5, -2.5]),
  ...createVoxelCube(1, '#1a1a1a', [-0.5, 0.8, -3.5]),
  ...createVoxelCube(1, '#1a1a1a', [-0.5, 1.5, 1.5]),
  ...createVoxelCube(1.5, '#1a1a1a', [-0.75, 2.2, 2]),
  { pos: [-0.4, 2.8, 3.4], color: '#ff00ff' }, 
  { pos: [0.4, 2.8, 3.4], color: '#ff00ff' },  
  ...createVoxelCube(4, '#000', [-5.5, 1, -1]), 
  ...createVoxelCube(4, '#000', [1.5, 1, -1]),  
];

export const CREEPER_VOXEL: VoxelData[] = [
  ...createVoxelCube(1.5, '#4ade80', [-0.75, 4, -0.75]), 
  { pos: [-0.4, 4.8, 0.76], color: '#000' }, 
  { pos: [0.4, 4.8, 0.76], color: '#000' },  
  { pos: [0, 4.4, 0.76], color: '#000' },    
  ...createVoxelCube(1.2, '#22c55e', [-0.6, 1.5, -0.6]), 
  ...createVoxelCube(0.8, '#16a34a', [-1, 0, 0.2]),   
  ...createVoxelCube(0.8, '#16a34a', [0.2, 0, 0.2]),  
  ...createVoxelCube(0.8, '#16a34a', [-1, 0, -1]),    
  ...createVoxelCube(0.8, '#16a34a', [0.2, 0, -1]),   
];

export const HERO_CHARACTER: VoxelData[] = [
  ...createVoxelCube(2, '#444', [-1, 0, -1]), 
  ...createVoxelCube(1.5, '#facc15', [-0.75, 2, -0.75]), 
  { pos: [-0.5, 2.5, 0.5], color: '#fff' }, 
  { pos: [0.5, 2.5, 0.5], color: '#fff' }, 
  ...createVoxelCube(0.5, '#333', [-1.2, 0.5, -0.25]), 
  ...createVoxelCube(0.5, '#333', [0.7, 0.5, -0.25]), 
];

export const STEVE_VOXEL: VoxelData[] = [
  ...createVoxelCube(2, '#00b8d4', [-1, 0, -1]), 
  ...createVoxelCube(1.5, '#ffccbc', [-0.75, 2, -0.75]), 
  ...createVoxelCube(0.5, '#4e342e', [-0.75, 3.2, -0.75]), 
  { pos: [-0.5, 2.5, 0.5], color: '#fff' }, 
  { pos: [0.5, 2.5, 0.5], color: '#fff' }, 
  ...createVoxelCube(0.5, '#ffccbc', [-1.2, 0.5, -0.25]), 
  ...createVoxelCube(0.5, '#ffccbc', [0.7, 0.5, -0.25]), 
];

export const SKELETON_VOXEL: VoxelData[] = [
  ...createVoxelCube(2, '#e0e0e0', [-1, 0, -1]), 
  ...createVoxelCube(1.5, '#eeeeee', [-0.75, 2, -0.75]), 
  { pos: [-0.4, 2.6, 0.51], color: '#000' }, 
  { pos: [0.4, 2.6, 0.51], color: '#000' }, 
  ...createVoxelCube(0.3, '#bdbdbd', [-1.1, 0.2, -0.15]), 
  ...createVoxelCube(0.3, '#bdbdbd', [0.8, 0.2, -0.15]), 
];
// Detailed Voxel Laptop - Added back to fix VoxelWorld.tsx import error
export const LAPTOP_VOXEL: VoxelData[] = [
  ...createVoxelCube(3, '#222', [-1.5, 0, -1.5]), // Base
  ...createVoxelCube(3, '#111', [-1.5, 0.2, -1.5]), // Screen Frame
  { pos: [0, 1.5, -1.4], color: '#3b82f6' }, // Glowing screen bit
];

export const SKINS = [
  { id: 'dev', name: 'Golden Dev', model: HERO_CHARACTER, color: '#facc15' },
  { id: 'steve', name: 'Classic Steve', model: STEVE_VOXEL, color: '#00b8d4' },
  { id: 'skeleton', name: 'Skeleton Coder', model: SKELETON_VOXEL, color: '#eeeeee' },
  { id: 'creeper', name: 'Creeper Bot', model: CREEPER_VOXEL, color: '#4ade80' }
];

export const SKILLS: Skill[] = [
  { name: 'React', level: 95, color: '#61dafb', category: 'Frontend' },
  { name: 'Next.js', level: 90, color: '#000000', category: 'Frontend' },
  { name: 'ThreeJs', level: 75, color: '#3178c6', category: 'Frontend' },
  { name: 'Tailwind CSS', level: 90, color: '#38bdf8', category: 'Frontend' },
  { name: 'Node.js', level: 90, color: '#339933', category: 'Backend' },
  { name: 'FastAPI', level: 85, color: '#3776ab', category: 'Backend' },
  { name: 'Flask', level: 65, color: '#a71fa0', category: 'Backend' },
  { name: 'Express.js', level: 80, color: '#000000', category: 'Backend' },
  { name: 'PyTorch', level: 80, color: '#ee4c2c', category: 'AI & ML' },
  { name: 'GenAI', level: 60, color: '#b8c229', category: 'AI & ML' },
  { name: 'TensorFlow', level: 75, color: '#ff6f00', category: 'AI & ML' },
  { name: 'Arduino', level: 30, color: '#00979d', category: 'IoT & Embedded' },
  { name: 'Raspberry Pi', level: 40, color: '#c31d39', category: 'IoT & Embedded' }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Avian Weather Net',
    description: 'Predicting weather using Birds sound through a Deep Learning model and a full-stack application.',
    tags: ['Deep Learning', 'PyTorch', 'React'],
    thumbnail: 'https://picsum.photos/400/300?random=1',
    category: 'ai',
    videoUrl: '/Minecraft_Video_Bird_Sound_Weather_Prediction.mp4',
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
    videoUrl: '/Minecraft_Plant_Disease_Detection_Video.mp4',
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
    videoUrl: '/War_Room_Video_Generation.mp4',
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
    videoUrl: '/expense_tracker.mp4',
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
    videoUrl: '/blood_donar.mp4',
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
    videoUrl: '/stock_prediction.mp4',
    codeUrl: 'https://github.com/shishir-sh26/Stock-prediction',
    voxelArt: createVoxelCube(2, '#a855f7', [0, 0, 0])
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'c1',
    title: 'Deep Learning Specialization',
    issuer: 'Dhaarini Academy',
    date: '2025',
    link: '#'
  },
  {
    id: 'c2',
    title: 'TensorFlow Developer Certificate',
    issuer: 'Kaggle',
    date: '2025',
    link: '#'
  },
  {
    id: 'c3',
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2023',
    link: '#'
  },
  {
    id: 'c4',
    title: 'Data Analytics',
    issuer: 'IT Specialist',
    date: '2025',
    link: '#'
  }
];