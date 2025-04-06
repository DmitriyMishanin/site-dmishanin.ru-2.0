import React from 'react';
import { Link } from 'react-router-dom';
import { ArticleCardProps } from '../types';

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const getExcerpt = (content: string) => {
    return content.length > 150 ? content.substring(0, 150) + '...' : content;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-light-text dark:text-dark-text">
          {article.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {getExcerpt(article.content)}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(article.created_at).toLocaleDateString()}
          </span>
          <Link 
            to={`/articles/${article.id}`}
            className="text-light-accent hover:text-light-accent/80 dark:text-dark-accent dark:hover:text-dark-accent/80"
          >
            Читать →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard; 