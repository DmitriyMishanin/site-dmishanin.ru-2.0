import React from 'react';
import { Link } from 'react-router-dom';
import imageAvatar from '../assets/image_avatar.png';

interface HeroSectionProps {
  openLoginModal: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ openLoginModal }) => {
  return (
    <>
      {/* Quote Epigraph */}
      <div className="container mx-auto px-6 pt-16 pb-0">
        <div className="flex justify-start">
          <div className="quote-epigraph text-gray-600 dark:text-gray-400">
            <p className="text-sm">"Хороший код пишется для людей, а не только для компьютеров"</p>
            <cite className="block mt-1 text-xs text-right accent-text">— Дмитрий Мишанин</cite>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-4 relative">
        {/* Hero Container */}
        <div className="hero-container">
          <div className="gradient-circle">
            <img src={imageAvatar} alt="Аватар" />
          </div>
          
          {/* Hero Section */}
          <section id="hero" className="py-1 md:py-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 hero-content">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Мини-портал <span className="accent-text">dmishanin.ru</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Мини пространство для <span className="accent-text font-medium">идей</span>, <span className="accent-text font-medium">проектов</span> и обмена знаниями с единомышленниками
              </p>
              <div className="flex space-x-4 hero-buttons">
                <button
                  onClick={openLoginModal}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Войти
                </button>
                <Link
                  to="/articles"
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Статьи
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default HeroSection; 