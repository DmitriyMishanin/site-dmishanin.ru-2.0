import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import HeroSection from '../components/HeroSection';
import LoginModal from '../components/LoginModal';

const HomePage: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    document.body.style.overflow = '';
  };

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
      <section id="articles" className="py-16">
        <div className="container">
          <h2 className="section-title">
            Статьи
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <div>
                <h3 className="text-xl font-semibold mb-2">Введение в React Hooks</h3>
                <p className="mb-4">Детальный обзор хуков в React и примеры их использования</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="role-badge role-core">Автор</span>
                    <span className="date">01.04.2024</span>
                  </div>
                  <button className="card-link" onClick={() => window.location.href = '/article.html'}>Читать →</button>
                </div>
              </div>
            </div>
            <div className="card">
              <div>
                <h3 className="text-xl font-semibold mb-2">CSS-анимации: от простого к сложному</h3>
                <p className="mb-4">Полное руководство по созданию современных анимаций на CSS</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="role-badge role-core">Автор</span>
                    <span className="date">28.03.2024</span>
                  </div>
                  <button className="card-link" onClick={() => window.location.href = '/article.html'}>Читать →</button>
                </div>
              </div>
            </div>
            <div className="card">
              <div>
                <h3 className="text-xl font-semibold mb-2">TypeScript: типизация в React</h3>
                <p className="mb-4">Практическое руководство по использованию TypeScript в React-приложениях</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="role-badge role-core">Автор</span>
                    <span className="date">25.03.2024</span>
                  </div>
                  <button className="card-link" onClick={() => window.location.href = '/article.html'}>Читать →</button>
                </div>
              </div>
            </div>
            <div className="card">
              <div>
                <h3 className="text-xl font-semibold mb-2">Tailwind CSS: современный подход к стилизации</h3>
                <p className="mb-4">Как использовать Tailwind CSS для быстрой разработки интерфейсов</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="role-badge role-core">Автор</span>
                    <span className="date">22.03.2024</span>
                  </div>
                  <button className="card-link" onClick={() => window.location.href = '/article.html'}>Читать →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16">
        <div className="container">
          <h2 className="section-title">
            Проекты
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80" 
                   alt="React Dashboard Preview" 
                   className="w-full h-48 object-cover" />
              <div>
                <h3 className="text-xl font-semibold mb-2">React Dashboard</h3>
                <p className="mb-4">Панель управления с аналитикой и визуализацией данных</p>
                <div className="flex justify-between items-center">
                  <span className="role-badge role-core">Автор</span>
                  <button className="card-link" onClick={() => window.location.href = '/projects/react-dashboard'}>Подробнее →</button>
                </div>
              </div>
            </div>
            <div className="card">
              <img src="https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=80" 
                   alt="CSS Animation Library Preview" 
                   className="w-full h-48 object-cover" />
              <div>
                <h3 className="text-xl font-semibold mb-2">CSS Animation Library</h3>
                <p className="mb-4">Библиотека готовых анимаций для веб-проектов</p>
                <div className="flex justify-between items-center">
                  <span className="role-badge role-core">Автор</span>
                  <button className="card-link" onClick={() => window.location.href = '/projects/css-animation-library'}>Подробнее →</button>
                </div>
              </div>
            </div>
            <div className="card">
              <img src="https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?w=800&auto=format&fit=crop&q=80" 
                   alt="TypeScript Boilerplate Preview" 
                   className="w-full h-48 object-cover" />
              <div>
                <h3 className="text-xl font-semibold mb-2">TypeScript Boilerplate</h3>
                <p className="mb-4">Стартовый шаблон для React-приложений с TypeScript</p>
                <div className="flex justify-between items-center">
                  <span className="role-badge role-core">Автор</span>
                  <button className="card-link" onClick={() => window.location.href = '/projects/typescript-boilerplate'}>Подробнее →</button>
                </div>
              </div>
            </div>
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
                    <p>Документация по псевдоклассу :hover и созданию интерактивных эффектов</p>
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