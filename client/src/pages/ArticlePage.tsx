import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MainLayout from '../layouts/MainLayout';
import { getArticleBySlug } from '../api/articles';
import { Article } from '../types';
import { getAssetUrl } from '../api/directus';
import { Components } from 'react-markdown';
import { useAuth } from '../context/AuthContext';

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) {
        setError('Slug не найден');
        setLoading(false);
        return;
      }

      try {
        const data = await getArticleBySlug(
          slug, 
          isAuthenticated ? token : null,
          false
        );
        
        setArticle(data);
      } catch (err) {
        setError('Ошибка при загрузке статьи');
        console.error('Ошибка при загрузке статьи:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug, token, isAuthenticated]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-6 pt-24 pb-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !article) {
    return (
      <MainLayout>
        <div className="container mx-auto px-6 pt-24 pb-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {error || 'Статья не найдена'}
            </h1>
            <Link 
              to="/articles" 
              className="text-light-accent hover:text-light-accent/80 dark:text-dark-accent dark:hover:text-dark-accent/80"
            >
              Вернуться к списку статей
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  const imageUrl = getAssetUrl(article.image);

  const components: Components = {
    h1: ({node, ...props}) => <h1 className="text-3xl font-bold mb-4" {...props} />,
    h2: ({node, ...props}) => <h2 className="text-2xl font-bold mb-3" {...props} />,
    h3: ({node, ...props}) => <h3 className="text-xl font-bold mb-2" {...props} />,
    p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
    ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4" {...props} />,
    ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4" {...props} />,
    li: ({node, ...props}) => <li className="mb-2" {...props} />,
    a: ({node, ...props}) => <a className="text-light-accent hover:text-light-accent/80 dark:text-dark-accent dark:hover:text-dark-accent/80" {...props} />,
    code: ({inline, className, children, ...props}: CodeProps) => 
      inline ? 
        <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-gray-800 dark:text-gray-200" {...props}>{children}</code> :
        <code className="block bg-gray-100 dark:bg-gray-800 p-4 rounded mb-4 overflow-x-auto text-gray-800 dark:text-gray-200 font-mono text-sm" {...props}>{children}</code>,
    pre: ({node, ...props}) => <pre className="mb-4" {...props} />,
    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic mb-4" {...props} />,
    img: ({node, ...props}) => <img className="rounded-lg mb-4" {...props} />,
    table: ({node, ...props}) => <div className="overflow-x-auto mb-4"><table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props} /></div>,
    th: ({node, ...props}) => <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" {...props} />,
    td: ({node, ...props}) => <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100" {...props} />,
  };

  return (
    <MainLayout>
      <main className="container mx-auto px-6 pt-24 pb-16">
        {/* Хлебные крошки */}
        <div className="flex items-center space-x-4 mb-6">
          <Link to="/" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
          </Link>
          <span className="text-gray-400 dark:text-gray-500">/</span>
          <Link to="/articles" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400">Статьи</Link>
        </div>

        {/* Заголовок статьи */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {article.title}
        </h1>

        {/* Метаданные статьи */}
        <div className="flex items-center space-x-4 mb-8">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {article.readTime || '5 мин'} чтения
          </span>
          <span className="text-gray-400 dark:text-gray-500">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(article.date_created).toLocaleDateString('ru-RU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>

        {/* Изображение статьи */}
        {imageUrl && (
          <div className="mb-8 max-w-3xl mx-auto">
            <div className="relative pt-[56.25%] w-full overflow-hidden rounded-lg">
              <img 
                src={imageUrl} 
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Контент статьи */}
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={components}
          >
            {article.content}
          </ReactMarkdown>
        </div>
      </main>
    </MainLayout>
  );
};

export default ArticlePage; 