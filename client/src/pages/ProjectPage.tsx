import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MainLayout from '../layouts/MainLayout';
import { Project, getProjectById } from '../api/projects';

const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectById(Number(id));
        setProject(data);
      } catch (err) {
        setError('Ошибка при загрузке проекта');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-6 pt-24 pb-16">
          <div className="text-center">Загрузка...</div>
        </div>
      </MainLayout>
    );
  }

  if (error || !project) {
    return (
      <MainLayout>
        <div className="container mx-auto px-6 pt-24 pb-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Проект не найден</h1>
            <Link to="/" className="text-indigo-600 hover:text-indigo-700">
              Вернуться на главную
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-6">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
            </Link>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <Link to="/projects" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400">Проекты</Link>
          </div>
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <div className="flex items-center space-x-4 mb-6">
            <span className={`role-badge role-${project.author.role}`}>{project.author.name}</span>
            <span>{new Date(project.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {project.imageUrl && (
          <div className="mb-8">
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ node, ...props }) => (
                <img 
                  {...props} 
                  className="rounded-lg shadow-lg my-4"
                  alt={props.alt || ''}
                />
              )
            }}
          >
            {project.description}
          </ReactMarkdown>
        </div>

        <div className="flex space-x-4">
          {project.demoUrl && (
            <a 
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Демо
            </a>
          )}
          {project.githubUrl && (
            <a 
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              GitHub
            </a>
          )}
        </div>
      </main>
    </MainLayout>
  );
};

export default ProjectPage; 