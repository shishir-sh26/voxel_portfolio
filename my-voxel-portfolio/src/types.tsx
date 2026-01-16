
export interface VoxelPosition {
  x: number;
  y: number;
  z: number;
}

export interface VoxelData {
  pos: [number, number, number];
  color: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  category: 'web' | 'mobile' | 'ai';
  voxelArt?: VoxelData[];
  liveUrl?: string;
  codeUrl?: string;
}

export interface Skill {
  name: string;
  level: number;
  color: string;
  category?: 'Frontend' | 'Backend' | 'AI & ML' | 'IoT & Embedded';
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
