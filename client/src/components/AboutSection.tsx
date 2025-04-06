import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="section-title">О портале</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-lg mb-6 text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">dmishanin.ru</span> — 
              это место, где я делюсь своими знаниями, опытом и идеями в области программирования и веб-разработки.
            </p>
            <p className="text-lg mb-6 text-gray-600 dark:text-gray-400">
              Здесь вы найдете статьи на технические темы, обзоры моих проектов, полезные ресурсы и инструменты, 
              которые я использую в своей работе.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Моя цель — создать сообщество единомышленников, где каждый может учиться, делиться идеями и 
              находить вдохновение для своих проектов.
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Возможности портала</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-600 dark:text-gray-400">Статьи о программировании и веб-разработке</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-600 dark:text-gray-400">Обзоры проектов с исходным кодом</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-600 dark:text-gray-400">Возможность комментирования и обсуждения</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-600 dark:text-gray-400">Полезные ресурсы и инструменты</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-600 dark:text-gray-400">Личный кабинет для участников сообщества</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 