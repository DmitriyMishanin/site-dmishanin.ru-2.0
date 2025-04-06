import React from 'react';

export interface ProjectCardProps {
  title: string;
  description: string;
  links: string[];
  tags?: string[];
  imageUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  links,
  tags = [],
  imageUrl
}) => {
  return (
    <div className="card transition-all hover:shadow-lg">
      {imageUrl && (
        <div className="mb-4 overflow-hidden rounded-lg h-48">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
        </div>
      )}
      <h3 className="mb-2 text-xl font-bold text-light-text dark:text-dark-text">
        {title}
      </h3>
      
      <p className="mb-4 text-light-textSecondary dark:text-dark-textSecondary">
        {description}
      </p>
      
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium rounded-full bg-light-secondary text-light-textSecondary dark:bg-dark-secondary dark:text-dark-textSecondary"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {links.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-light-accent hover:underline dark:text-dark-accent"
            >
              {index === 0 ? 'Демо' : index === 1 ? 'GitHub' : `Ссылка ${index + 1}`}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectCard; 