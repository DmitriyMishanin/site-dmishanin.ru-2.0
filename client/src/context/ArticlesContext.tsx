import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Article } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

interface ArticlesContextType {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

const ArticlesContext = createContext<ArticlesContextType>({
  articles: [],
  loading: false,
  error: null
});

export const useArticles = () => useContext(ArticlesContext);

export const ArticlesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/articles`);
        setArticles(response.data);
      } catch (err) {
        setError('Ошибка при загрузке статей');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <ArticlesContext.Provider value={{ articles, loading, error }}>
      {children}
    </ArticlesContext.Provider>
  );
}; 