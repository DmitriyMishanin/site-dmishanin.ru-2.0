import React from 'react';
import ArticleCard from '../components/ArticleCard';
import { useArticles } from '../context/ArticlesContext';
import MainLayout from '../layouts/MainLayout';

const ArticlesPage: React.FC = () => {
  const { articles, loading, error } = useArticles();

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
              Статьи
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            {articles.length === 0 && (
              <div className="text-center py-12 text-light-textSecondary dark:text-dark-textSecondary">
                Нет статей для отображения
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ArticlesPage; 