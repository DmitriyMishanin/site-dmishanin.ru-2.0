import { Project } from '../types/Project';

export const projects: Project[] = [
  {
    id: 'react-dashboard',
    title: 'React Dashboard',
    description: 'Панель управления с аналитикой и визуализацией данных',
    content: `
      <h2>О проекте</h2>
      <p>React Dashboard — это современная панель управления, разработанная с использованием React и TypeScript. Проект предоставляет удобный интерфейс для анализа и визуализации данных.</p>
      
      <h2>Основные возможности</h2>
      <ul>
        <li>Интерактивные графики и диаграммы</li>
        <li>Фильтрация и сортировка данных</li>
        <li>Экспорт отчетов в различных форматах</li>
        <li>Адаптивный дизайн</li>
      </ul>
      
      <h2>Технологии</h2>
      <ul>
        <li>React 18</li>
        <li>TypeScript</li>
        <li>Tailwind CSS</li>
        <li>Chart.js</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    author: {
      role: 'core',
      name: 'Дмитрий Мишанин'
    }
  },
  {
    id: 'css-animation-library',
    title: 'CSS Animation Library',
    description: 'Библиотека готовых анимаций для веб-проектов',
    content: `
      <h2>О проекте</h2>
      <p>CSS Animation Library — это набор готовых анимаций, которые можно легко интегрировать в любой веб-проект. Библиотека оптимизирована для производительности и совместимости.</p>
      
      <h2>Основные возможности</h2>
      <ul>
        <li>Более 50 готовых анимаций</li>
        <li>Простая интеграция через CSS-классы</li>
        <li>Поддержка темной темы</li>
        <li>Документация с примерами</li>
      </ul>
      
      <h2>Технологии</h2>
      <ul>
        <li>CSS3</li>
        <li>SCSS</li>
        <li>JavaScript</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=80',
    author: {
      role: 'core',
      name: 'Дмитрий Мишанин'
    }
  },
  {
    id: 'typescript-boilerplate',
    title: 'TypeScript Boilerplate',
    description: 'Стартовый шаблон для React-приложений с TypeScript',
    content: `
      <h2>О проекте</h2>
      <p>TypeScript Boilerplate — это готовый шаблон для быстрого старта React-приложений с TypeScript. Включает все необходимые настройки и инструменты для разработки.</p>
      
      <h2>Основные возможности</h2>
      <ul>
        <li>Настроенный ESLint и Prettier</li>
        <li>Конфигурация Jest для тестирования</li>
        <li>Настроенный Webpack</li>
        <li>Примеры компонентов и хуков</li>
      </ul>
      
      <h2>Технологии</h2>
      <ul>
        <li>React 18</li>
        <li>TypeScript</li>
        <li>Webpack 5</li>
        <li>Jest</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?w=800&auto=format&fit=crop&q=80',
    author: {
      role: 'core',
      name: 'Дмитрий Мишанин'
    }
  }
]; 