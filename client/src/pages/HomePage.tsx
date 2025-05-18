import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HeroSection from '../components/HeroSection';
import LoginModal from '../components/LoginModal';
import { Article } from '../types';
import { getArticles } from '../api/articles';
import { Project } from '../types';
import { getProjects } from '../api/projects';
import { getAssetUrl } from '../api/directus';
import ProjectCard from '../components/ProjectCard';
import ArticleCard from '../components/ArticleCard';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { token, isAuthenticated } = useAuth();

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    document.body.style.overflow = '';
  };

  // Загрузка данных при монтировании или изменении статуса авторизации
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Загрузка статей
        const articlesData = await getArticles(
          {}, 
          isAuthenticated ? token : null,
          false
        );
        setArticles(articlesData);
        
        // Загрузка проектов
        const projectsData = await getProjects(
          {},
          isAuthenticated ? token : null,
          false
        );
        setProjects(projectsData);
      } catch (err) {
        console.error('Ошибка при загрузке данных:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, isAuthenticated]); // Зависимость от статуса авторизации

  return (
    <MainLayout>
      <HeroSection onLoginClick={openLoginModal} />

      {/* About Me Section */}
      <section id="about" className="py-8">
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
                Доступ к закрытой части портала предоставляется только по приглашениям. Если вы хотите присоединиться к сообществу, свяжитесь с автором.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Articles Section */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Мини-статьи</h2>
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
            ) : articles.length > 0 ? (
              articles.slice(0, 3).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            ) : (
              <div className="col-span-3 text-center py-2 text-gray-500">
                {isAuthenticated 
                  ? "У вас нет доступа к статьям или статьи отсутствуют"
                  : "Доступных статей нет. Авторизуйтесь для просмотра"}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Мини-проекты</h2>
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
            ) : projects.length > 0 ? (
              projects.slice(0, 3).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div className="col-span-3 text-center py-2 text-gray-500">
                {isAuthenticated 
                  ? "У вас нет доступа к проектам или проекты отсутствуют"
                  : "Доступных проектов нет. Авторизуйтесь для просмотра"}
              </div>
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
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </MainLayout>
  );
};

export default HomePage; 