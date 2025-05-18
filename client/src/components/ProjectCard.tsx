import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { getAssetUrl } from '../api/directus';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const imageUrl = getAssetUrl(project.image);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      {imageUrl && (
        <div className="relative w-full pt-[56.25%] overflow-hidden">
          <img 
            src={imageUrl} 
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-light-accent dark:group-hover:text-dark-accent">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {project.description.substring(0, 100)}...
        </p>
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-accent hover:text-light-accent/80 dark:text-dark-accent dark:hover:text-dark-accent/80 transition-colors"
              >
                Демо
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-accent hover:text-light-accent/80 dark:text-dark-accent dark:hover:text-dark-accent/80 transition-colors"
              >
                GitHub
              </a>
            )}
          </div>
          <Link 
            to={`/projects/${project.slug}`}
            className="text-light-accent hover:text-light-accent/80 dark:text-dark-accent dark:hover:text-dark-accent/80 transition-colors"
          >
            Подробнее →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 