import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';
import { getAssetUrl } from '../api/directus';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const imageUrl = getAssetUrl(article.image);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      {imageUrl && (
        <div className="relative w-full pt-[56.25%] overflow-hidden">
          <img 
            src={imageUrl} 
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-light-accent dark:group-hover:text-dark-accent">{article.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{article.excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {article.readTime || '5 мин'}
          </span>
          <Link 
            to={`/articles/${article.slug}`}
            className="text-light-accent hover:text-light-accent/80 dark:text-dark-accent dark:hover:text-dark-accent/80 transition-colors"
          >
            Читать →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard; 