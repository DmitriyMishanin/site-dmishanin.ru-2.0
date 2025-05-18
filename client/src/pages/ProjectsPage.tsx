import React from 'react';
import ProjectCard from '../components/ProjectCard';
import { useProjects } from '../context/ProjectsContext';
import MainLayout from '../layouts/MainLayout';

const ProjectsPage: React.FC = () => {
  const { projects, loading, error } = useProjects();

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-light-accent dark:border-dark-accent"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-red-500 dark:text-red-400">
            {error}
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex flex-col flex-grow bg-light-background dark:bg-dark-background">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-light-text dark:text-dark-text">
              Проекты
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            {projects.length === 0 && (
              <div className="text-center py-12 text-light-textSecondary dark:text-dark-textSecondary">
                Нет проектов для отображения
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProjectsPage; 