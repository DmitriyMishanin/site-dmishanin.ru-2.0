import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useRoleCheck } from '../hooks/useRoleCheck';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { isAuthenticated, user } = useAuth();
  const { isPremium, isPrivate, isAuthor, isAdmin } = useRoleCheck();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">О dmishanin.ru</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Персональный мини-портал dmishanin.ru. Пространство для обмена идеями и знаниями с близкими по духу людьми.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Навигация</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li><a href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Главная</a></li>
              <li><a href="#about" className="hover:text-indigo-600 dark:hover:text-indigo-400">О портале</a></li>
              <li><a href="/projects" className="hover:text-indigo-600 dark:hover:text-indigo-400">Проекты</a></li>
              <li><a href="/articles" className="hover:text-indigo-600 dark:hover:text-indigo-400">Статьи</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ресурсы</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>
                  <a href="https://wiki.dmishanin.ru" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                    wiki.dmishanin.ru
                  </a>
                </li>
                <li>
                  <a href="https://tools.dmishanin.ru" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    tools.dmishanin.ru
                  </a>
                </li>

              {isAuthenticated && (
                <li>
                  <a href="https://redmine.dmishanin.ru" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    redmine.dmishanin.ru
                  </a>
                </li>
              )}

              {isAuthenticated && (
                <li>
                  <a href="https://chat.dmishanin.ru" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                    chat.dmishanin.ru
                  </a>
                </li>
              )}

              {(isPrivate()) && (
                <li>
                  <a href="https://uptime.dmishanin.ru" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                    uptime.dmishanin.ru
                  </a>
                </li>
              )}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Контакты</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <a 
                  href="mailto:contact@dmishanin.ru" 
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  contact@dmishanin.ru
                </a>
              </li>
              <li>
                <a 
                  href="https://t.me/dmishanin_bot" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  @dmishanin.bot
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-800 pt-8">
          <p>&copy; {currentYear} dmishanin.ru. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 