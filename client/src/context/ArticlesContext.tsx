import React, { createContext, useContext, useState, useEffect } from 'react';
import { Article } from '../types';
import { getArticles } from '../api/articles';
import { useAuth } from './AuthContext';

interface ArticlesContextType {
  articles: Article[];
  loading: boolean;
  error: string | null;
  refreshArticles: () => Promise<void>;
}

const ArticlesContext = createContext<ArticlesContextType>({
  articles: [],
  loading: false,
  error: null,
  refreshArticles: async () => {}
});

export const useArticles = () => useContext(ArticlesContext);

export const ArticlesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token, isAuthenticated } = useAuth();

  const refreshArticles = async () => {
    setLoading(true);
    try {
      const data = await getArticles(
        {}, 
        isAuthenticated ? token : null, 
        false
      );
      
      setArticles(data);
      setError(null);
    } catch (err) {
      setError('Ошибка при загрузке статей');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshArticles();
  }, [token, isAuthenticated]);

  return (
    <ArticlesContext.Provider value={{ articles, loading, error, refreshArticles }}>
      {children}
    </ArticlesContext.Provider>
  );
}; 