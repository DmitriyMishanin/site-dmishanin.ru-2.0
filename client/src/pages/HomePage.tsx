import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HeroSection from '../components/HeroSection';
import LoginModal from '../components/LoginModal';
import { Article, getArticles } from '../api/articles';
import { Project, getProjects } from '../api/projects';

const HomePage: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (err) {
        console.error('Ошибка при загрузке статей:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error('Ошибка при загрузке проектов:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <MainLayout>
      <HeroSection openLoginModal={openLoginModal} />

      {/* About Me Section */}
      <section id="about" className="py-16">
        <div className="container">
          <h2 className="section-title">
            О портале
          </h2>
          <div className="max-w-3xl">
            <div className="text-gray-600 dark:text-gray-400 space-y-4">
              <p>
                dmishanin.ru — это персональный мини-портал, где я делюсь опытом и проектами с близким кругом разработчиков и единомышленниками.
              </p>
              <p>
                На портале вы найдёте:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Заметки и статьи по разработке и DevOps</li>
                <li>Полезные инструменты и утилиты для работы</li>
                <li>Информацию о текущих и завершённых проектах</li>
                <li>Пространство для обсуждений и обмена идеями</li>
              </ul>
              <p className="mt-4 italic">
                Доступ к порталу предоставляется только по приглашениям. Если вы хотите присоединиться к сообществу, свяжитесь со мной.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Articles Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Статьи</h2>
            <Link 
              to="/articles"
              className="text-light-accent hover:text-light-accent/80 dark:text-dark-accent dark:hover:text-dark-accent/80"
            >
              Все статьи →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div>Загрузка статей...</div>
            ) : (
              articles.slice(0, 3).map((article) => (
                <div key={article.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className={`role-badge role-${article.author.role}`}>{article.author.name}</span>
                      <Link 
                        to={`/articles/${article.id}`}
                        className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                      >
                        Читать →
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Проекты</h2>
            <Link 
              to="/projects"
              className="text-light-accent hover:text-light-accent/80 dark:text-dark-accent dark:hover:text-dark-accent/80"
            >
              Все проекты →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div>Загрузка проектов...</div>
            ) : (
              projects.slice(0, 3).map((project) => (
                <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  {project.imageUrl && (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.description.substring(0, 100)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`role-badge role-${project.author.role}`}>
                        {project.author.name}
                      </span>
                      <Link 
                        to={`/projects/${project.id}`}
                        className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                      >
                        Подробнее →
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Useful Links Section */}
      <section id="useful-links" className="py-16">
        <div className="container">
          <h2 className="section-title">
            Полезные ссылки
          </h2>
          <div className="space-y-4 max-w-3xl">
            <div className="group">
              <a href="https://react.dev" className="useful-links-item" target="_blank" rel="noopener noreferrer">
                <div className="flex items-start">
                  <div className="flex-grow">
                    <h3>
                      React Documentation
                      <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </h3>
                    <p>Официальная документация React с подробными руководствами, API и примерами кода</p>
                  </div>
                </div>
              </a>
            </div>
            <div className="group">
              <a href="https://doka.guide/css/animation/" className="useful-links-item" target="_blank" rel="noopener noreferrer">
                <div className="flex items-start">
                  <div className="flex-grow">
                    <h3>
                      CSS-анимации
                      <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </h3>
                    <p>Полное руководство по CSS-анимациям: от базовых свойств до сложных эффектов</p>
                  </div>
                </div>
              </a>
            </div>
            <div className="group">
              <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:hover" className="useful-links-item" target="_blank" rel="noopener noreferrer">
                <div className="flex items-start">
                  <div className="flex-grow">
                    <h3>
                      CSS Hover Effects
                      <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </h3>
                    <p>Подробное руководство по созданию эффектов при наведении в CSS</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Модальное окно входа */}
      {isLoginModalOpen && (
        <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      )}
    </MainLayout>
  );
};

export default HomePage; 