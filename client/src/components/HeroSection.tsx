import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import imageAvatar from '../assets/image_avatar.png';
import { getRandomEpigraph, Epigraph } from '../api/epigraphs';
import { useAuth } from '../context/AuthContext';

interface HeroSectionProps {
  onLoginClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onLoginClick }) => {
  const [epigraph, setEpigraph] = useState<Epigraph | null>(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  // Функция для загрузки случайного эпиграфа
  const fetchEpigraph = async () => {
    try {
      setLoading(true);
      const randomEpigraph = await getRandomEpigraph(token);
      setEpigraph(randomEpigraph);
    } catch (error) {
      console.error('Ошибка при загрузке эпиграфа:', error);
      // Устанавливаем дефолтный эпиграф в случае ошибки
      setEpigraph({
        id: 0,
        quote: "Хороший код пишется для людей, а не только для компьютеров",
        author: "Дмитрий Мишанин",
        status: 'published'
      });
    } finally {
      setLoading(false);
    }
  };

  // Загружаем эпиграф при монтировании компонента
  useEffect(() => {
    fetchEpigraph();
  }, []);

  // Добавляем обработчик для обновления эпиграфа при каждом посещении страницы
  useEffect(() => {
    // Функция для обработки события видимости страницы
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchEpigraph();
      }
    };

    // Регистрируем обработчик события
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Очищаем обработчик при размонтировании компонента
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <>
      {/* Quote Epigraph */}
      <div className="container mx-auto px-6 pt-16 pb-0">
        <div className="flex justify-start">
          <div className="quote-epigraph text-gray-600 dark:text-gray-400">
            {loading ? (
              <p className="text-sm">Загрузка эпиграфа...</p>
            ) : (
              <div className="max-w-2xl mx-auto">
                <div 
                  onClick={fetchEpigraph}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  title="Нажмите для нового эпиграфа"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && fetchEpigraph()}
                >
                  <p className="text-sm">"{epigraph?.quote}"</p>
                  <cite className="block mt-1 text-xs text-right accent-text">— {epigraph?.author}</cite>                  
                </div>
              </div>
            )}
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
                <Link
                  to="/articles"
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Статьи
                </Link>
                <Link
                  to="/projects"
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Проекты
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