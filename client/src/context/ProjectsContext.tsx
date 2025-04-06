import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Project } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

interface ProjectsContextType {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
  loading: false,
  error: null
});

export const useProjects = () => useContext(ProjectsContext);

export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/projects`);
        setProjects(response.data);
      } catch (err) {
        setError('Ошибка при загрузке проектов');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, loading, error }}>
      {children}
    </ProjectsContext.Provider>
  );
}; 