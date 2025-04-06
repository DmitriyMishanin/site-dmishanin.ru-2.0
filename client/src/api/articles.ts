import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export interface Article {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  authorId: number;
  imageUrl: string | null;
  visibility: 'public' | 'private';
  readTime: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
    role: 'admin' | 'core' | 'member';
  };
}

export const getArticles = async (): Promise<Article[]> => {
  const response = await axios.get(`${API_URL}/articles`);
  return response.data;
};

export const getArticleById = async (id: number): Promise<Article> => {
  const response = await axios.get(`${API_URL}/articles/${id}`);
  return response.data;
}; 