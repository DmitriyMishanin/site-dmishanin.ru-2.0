import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.theme === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Инициализация темы
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDarkMode]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <header className="fixed w-full top-0 z-50 bg-white bg-opacity-80 dark:bg-dark-secondary dark:bg-opacity-80 backdrop-blur-sm shadow-sm">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold accent-text">
                dmishanin.ru
              </Link>
              <div className="ml-12 hidden md:flex space-x-6 desktop-menu">
                <Link to="/#about">О портале</Link>
                <Link to="/projects">Проекты</Link>
                <Link to="/articles">Статьи</Link>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <button 
                id="theme-toggle" 
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={toggleDarkMode}
                aria-label={isDarkMode ? 'Включить светлую тему' : 'Включить темную тему'}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </button>
              <button 
                id="mobile-menu-button" 
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={toggleMenu}
                aria-label="Меню"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
              <button 
                id="login-button" 
                className="px-4 py-2 rounded-full bg-light-accent text-white hover:bg-opacity-90 dark:bg-dark-accent"
                onClick={openLoginModal}
              >
                Войти
              </button>
            </div>
          </div>
          
          {/* Мобильное меню */}
          <div id="mobile-menu" className={`mobile-menu mt-4 pb-4 ${isMenuOpen ? '' : 'hidden'}`}>
            <div className="flex flex-col space-y-4">
              <Link to="/#about">О портале</Link>
              <Link to="/projects">Проекты</Link>
              <Link to="/articles">Статьи</Link>
              <button 
                onClick={openLoginModal}
                className="px-4 py-2 rounded-full bg-light-accent text-white text-center hover:bg-opacity-90 dark:bg-dark-accent"
              >
                Войти
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Модальное окно входа */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default Header; 