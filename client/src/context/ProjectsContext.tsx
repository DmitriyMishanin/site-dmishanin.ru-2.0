import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project } from '../types';
import { getProjects } from '../api/projects';
import { useAuth } from './AuthContext';

interface ProjectsContextType {
  projects: Project[];
  loading: boolean;
  error: string | null;
  refreshProjects: () => Promise<void>;
}

const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
  loading: false,
  error: null,
  refreshProjects: async () => {}
});

export const useProjects = () => useContext(ProjectsContext);

export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token, isAuthenticated } = useAuth();

  const refreshProjects = async () => {
    setLoading(true);
    try {
      const data = await getProjects(
        {}, 
        isAuthenticated ? token : null, 
        false
      );
      
      setProjects(data);
      setError(null);
    } catch (err) {
      setError('Ошибка при загрузке проектов');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProjects();
  }, [token, isAuthenticated]);

  return (
    <ProjectsContext.Provider value={{ projects, loading, error, refreshProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
}; 