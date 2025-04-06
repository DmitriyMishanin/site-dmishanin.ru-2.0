import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MainLayout from '../layouts/MainLayout';
import { Article, getArticleById } from '../api/articles';

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticleById(Number(id));
        setArticle(data);
      } catch (err) {
        setError('Ошибка при загрузке статьи');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-6 pt-24 pb-16">
          <div className="text-center">Загрузка...</div>
        </div>
      </MainLayout>
    );
  }

  if (error || !article) {
    return (
      <MainLayout>
        <div className="container mx-auto px-6 pt-24 pb-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Статья не найдена</h1>
            <Link to="/" className="text-indigo-600 hover:text-indigo-700">
              Вернуться на главную
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-6">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
            </Link>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <Link to="/articles" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400">Статьи</Link>
          </div>
          <h1 className="text-4xl font-bold article-title mb-4">{article.title}</h1>
          <div className="flex items-center space-x-4 article-meta">
            <span className={`role-badge role-${article.author.role}`}>{article.author.name}</span>
            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </div>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.content}
          </ReactMarkdown>
        </div>
      </main>
    </MainLayout>
  );
};

export default ArticlePage; 