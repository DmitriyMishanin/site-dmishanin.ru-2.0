import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectCardProps } from '../types';

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        {project.imageUrl ? (
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400 dark:text-gray-500 text-center p-4">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Изображение отсутствует</p>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-light-text dark:text-dark-text">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {project.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(project.created_at).toLocaleDateString()}
          </span>
          <Link 
            to={`/projects/${project.id}`}
            className="text-light-accent hover:text-light-accent/80 dark:text-dark-accent dark:hover:text-dark-accent/80"
          >
            Подробнее →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 