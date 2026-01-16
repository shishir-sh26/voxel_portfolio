
import React from 'react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="mc-panel p-4 w-72 flex-shrink-0 flex flex-col group hover:-translate-y-2 transition-transform cursor-pointer">
      <div className="relative h-32 w-full mb-3 overflow-hidden bg-gray-900 border-2 border-gray-700">
        <img 
          src={project.thumbnail} 
          alt={project.title}
          className="w-full h-full object-cover pixelated opacity-80 group-hover:opacity-100 transition-opacity"
        />
        <div className="absolute top-1 left-1 bg-black/50 text-[8px] px-1 py-0.5 text-yellow-400 border border-yellow-400/50">
          {project.category.toUpperCase()}
        </div>
      </div>
      
      <h3 className="text-[10px] mb-2 text-gray-800 border-b-2 border-gray-400 pb-1">{project.title}</h3>
      <p className="text-[8px] text-gray-600 leading-tight mb-4 flex-grow">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-1 mt-auto">
        {project.tags.map(tag => (
          <span key={tag} className="text-[6px] bg-gray-400 px-1 py-0.5 border border-gray-500 text-white">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
