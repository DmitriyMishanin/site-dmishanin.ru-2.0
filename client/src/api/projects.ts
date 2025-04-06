import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  demoUrl: string | null;
  githubUrl: string | null;
  authorId: number;
  visibility: 'public' | 'private';
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
    role: 'admin' | 'core' | 'member';
  };
}

export const getProjects = async (): Promise<Project[]> => {
  const response = await axios.get(`${API_URL}/projects`);
  return response.data;
};

export const getProjectById = async (id: number): Promise<Project> => {
  const response = await axios.get(`${API_URL}/projects/${id}`);
  return response.data;
}; 