import React from 'react';
import { Link } from 'react-router-dom';

export interface ArticleCardProps {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  title,
  excerpt,
  author,
  date,
  readTime,
  imageUrl
}) => {
  return (
    <div className="card transition-all hover:shadow-lg">
      {imageUrl && (
        <div className="mb-4 overflow-hidden rounded-lg h-48">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
        </div>
      )}
      <h3 className="mb-2 text-xl font-bold">
        <Link
          to={`/articles/${id}`}
          className="text-light-text hover:text-light-accent dark:text-dark-text dark:hover:text-dark-accent"
        >
          {title}
        </Link>
      </h3>
      <p className="mb-4 text-light-textSecondary dark:text-dark-textSecondary">
        {excerpt}
      </p>
      <div className="flex items-center justify-between text-sm text-light-textSecondary dark:text-dark-textSecondary">
        <div>{author}</div>
        <div className="flex items-center space-x-4">
          <span>{date}</span>
          <span>{readTime}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard; 