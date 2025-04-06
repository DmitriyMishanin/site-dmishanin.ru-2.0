-- Создание базы данных если не существует
CREATE DATABASE IF NOT EXISTS dmishanin_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Использование базы данных
USE dmishanin_db;

-- Создание таблицы users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'author', 'premium_reader', 'reader') NOT NULL DEFAULT 'reader',
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Создание таблицы articles
CREATE TABLE IF NOT EXISTS articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content LONGTEXT NOT NULL,
  excerpt TEXT NOT NULL,
  authorId INT NOT NULL,
  imageUrl VARCHAR(255),
  visibility ENUM('public', 'premium', 'private') NOT NULL DEFAULT 'public',
  readTime VARCHAR(50),
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (authorId) REFERENCES users(id) ON DELETE CASCADE
);

-- Создание таблицы projects
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  imageUrl VARCHAR(255),
  links JSON NOT NULL,
  tags JSON,
  authorId INT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (authorId) REFERENCES users(id) ON DELETE CASCADE
);

-- Создание таблицы comments
CREATE TABLE IF NOT EXISTS comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  content TEXT NOT NULL,
  articleId INT NOT NULL,
  userId INT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (articleId) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Создание администратора (пароль: admin123)
INSERT INTO users (name, email, password, role)
VALUES ('Admin', 'admin@dmishanin.ru', '$2b$10$3wQjWtBk8BnA1qBBJuXMveOBrpB6Rx0QJH9v0P.el2FQ5stO/CZry', 'admin');

-- Создание тестовых статей
INSERT INTO articles (title, content, excerpt, authorId, visibility, readTime)
VALUES 
('Введение в React Hooks', 
'# Введение в React Hooks\n\nReact Hooks — это новая возможность, появившаяся в React 16.8, которая позволяет использовать состояние (state) и другие возможности React без написания классов.\n\n## Преимущества Hooks\n\n- Более простой и понятный код\n- Повторное использование логики состояний\n- Лучшая организация кода компонентов\n\n## Базовые Hooks\n\n### useState\n\n```jsx\nimport React, { useState } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <p>Вы кликнули {count} раз</p>\n      <button onClick={() => setCount(count + 1)}>\n        Нажми на меня\n      </button>\n    </div>\n  );\n}\n```\n\n### useEffect\n\n```jsx\nimport React, { useState, useEffect } from "react";\n\nfunction Example() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    document.title = `Вы кликнули ${count} раз`;\n  });\n\n  return (\n    <div>\n      <p>Вы кликнули {count} раз</p>\n      <button onClick={() => setCount(count + 1)}>\n        Нажми на меня\n      </button>\n    </div>\n  );\n}\n```\n\n## Правила использования Hooks\n\n1. Вызывайте Hooks только на верхнем уровне компонента, не внутри циклов, условий или вложенных функций.\n2. Вызывайте Hooks только из функциональных компонентов React или из пользовательских Hooks.\n\n## Создание пользовательских Hooks\n\n```jsx\nimport { useState, useEffect } from "react";\n\nfunction useWindowSize() {\n  const [windowSize, setWindowSize] = useState({\n    width: window.innerWidth,\n    height: window.innerHeight,\n  });\n\n  useEffect(() => {\n    const handleResize = () => {\n      setWindowSize({\n        width: window.innerWidth,\n        height: window.innerHeight,\n      });\n    };\n\n    window.addEventListener("resize", handleResize);\n    \n    return () => {\n      window.removeEventListener("resize", handleResize);\n    };\n  }, []);\n\n  return windowSize;\n}\n```\n\n## Заключение\n\nReact Hooks — это мощный инструмент, который упрощает разработку и улучшает читаемость кода. Они позволяют легко переиспользовать логику состояний между компонентами и делают код более понятным и лаконичным.', 
'Подробное руководство по использованию React Hooks и их преимуществах над классовыми компонентами.', 
1, 'public', '10 мин'),

('Архитектура современных веб-приложений', 
'# Архитектура современных веб-приложений\n\nВ этой статье мы рассмотрим основные подходы к архитектуре современных веб-приложений, их преимущества и недостатки.\n\n## Монолитная архитектура\n\nМонолитное приложение — это единое целое, где все функциональные компоненты (маршрутизация, бизнес-логика, доступ к данным) объединены в одну программу и выполняются в одном процессе.\n\n### Преимущества:\n- Простота разработки и развертывания\n- Легкость тестирования\n- Высокая производительность (отсутствие сетевых вызовов между компонентами)\n\n### Недостатки:\n- Сложность масштабирования\n- Сложность внесения изменений в больших проектах\n- Все компоненты используют одну и ту же технологию\n\n## Микросервисная архитектура\n\nМикросервисная архитектура предполагает разбиение приложения на небольшие, слабо связанные сервисы, каждый из которых отвечает за определенную бизнес-функцию.\n\n### Преимущества:\n- Независимое масштабирование сервисов\n- Возможность использования разных технологий для разных сервисов\n- Более простое внесение изменений и обновлений\n\n### Недостатки:\n- Сложность разработки и развертывания\n- Накладные расходы на сетевое взаимодействие\n- Сложность тестирования всей системы\n\n## Серверлесс архитектура\n\nСерверлесс-архитектура — это модель, при которой разработчик пишет и развертывает код без необходимости управления серверами.\n\n### Преимущества:\n- Снижение операционных затрат\n- Автоматическое масштабирование\n- Оплата только за фактическое использование\n\n### Недостатки:\n- Ограничения по времени выполнения функций\n- Сложность отладки и мониторинга\n- Зависимость от облачного провайдера\n\n## JAMstack\n\nJAMstack (JavaScript, API, Markup) — это архитектура, основанная на клиентском JavaScript, повторно используемых API и предварительно созданной разметке.\n\n### Преимущества:\n- Высокая производительность\n- Улучшенная безопасность\n- Меньшая сложность масштабирования\n\n### Недостатки:\n- Ограничения для динамического контента\n- Сложность для крупных приложений с часто меняющимся контентом\n\n## Выбор архитектуры\n\nВыбор архитектуры зависит от многих факторов:\n\n1. Сложность и масштаб проекта\n2. Требования к производительности\n3. Размер команды и ее опыт\n4. Бюджет проекта\n5. Планы по масштабированию\n\n## Заключение\n\nНе существует универсального решения, подходящего для всех проектов. Часто используются гибридные подходы, сочетающие элементы различных архитектур. Важно тщательно проанализировать требования проекта и выбрать наиболее подходящую архитектуру, учитывая как текущие потребности, так и перспективы развития.',
'Обзор современных подходов к построению веб-приложений с использованием фреймворков и сервисной архитектуры.', 
1, 'premium', '15 мин'),

('Оптимизация производительности веб-сайтов', 
'# Оптимизация производительности веб-сайтов\n\nВ этой статье мы рассмотрим основные методы и инструменты для оптимизации скорости загрузки и производительности веб-сайтов.\n\n## Почему скорость важна\n\n- Улучшение пользовательского опыта\n- Повышение конверсии\n- Лучшее ранжирование в поисковых системах\n- Снижение показателя отказов\n\n## Основные метрики производительности\n\n### Core Web Vitals\n\n1. **Largest Contentful Paint (LCP)** — время загрузки основного контента страницы.\n   - Хорошо: до 2.5 секунд\n   - Требует улучшения: 2.5 - 4 секунды\n   - Плохо: более 4 секунд\n\n2. **First Input Delay (FID)** — время до первого взаимодействия пользователя со страницей.\n   - Хорошо: до 100 мс\n   - Требует улучшения: 100 - 300 мс\n   - Плохо: более 300 мс\n\n3. **Cumulative Layout Shift (CLS)** — визуальная стабильность страницы.\n   - Хорошо: до 0.1\n   - Требует улучшения: 0.1 - 0.25\n   - Плохо: более 0.25\n\n## Оптимизация изображений\n\n### Форматы изображений\n\n- **WebP** — современный формат с хорошим сжатием и поддержкой прозрачности.\n- **AVIF** — еще более эффективный формат, но с меньшей поддержкой браузерами.\n- **SVG** — идеален для векторной графики и иконок.\n\n### Ленивая загрузка\n\n```html\n<img src="image.jpg" loading="lazy" alt="Description" width="800" height="600">\n```\n\n### Использование правильных размеров\n\n```html\n<picture>\n  <source media="(max-width: 600px)" srcset="small.jpg">\n  <source media="(max-width: 1200px)" srcset="medium.jpg">\n  <img src="large.jpg" alt="Description">\n</picture>\n```\n\n## Оптимизация JavaScript\n\n### Уменьшение размера файлов\n\n- Минификация кода\n- Использование современных сборщиков (Webpack, Rollup, Vite)\n- Разделение кода (code splitting)\n\n### Асинхронная загрузка\n\n```html\n<script src="script.js" async></script>\n<script src="critical-script.js" defer></script>\n```\n\n## Оптимизация CSS\n\n### Критический CSS\n\nВыделение и встраивание CSS, необходимого для отображения контента в верхней части страницы.\n\n```html\n<style>\n  /* Critical CSS */\n  header { background-color: #f8f9fa; }\n  .hero { padding: 2rem 0; }\n</style>\n<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">\n```\n\n### Минификация и сжатие\n\nИспользование инструментов типа PostCSS, CSSO, cssnano для оптимизации CSS файлов.\n\n## Кэширование и CDN\n\n### Заголовки кэширования\n\n```\nCache-Control: max-age=31536000, immutable\nETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"\n```\n\n### Content Delivery Network (CDN)\n\nИспользование CDN для доставки статических ресурсов ближе к пользователю.\n\n## Инструменты для измерения и анализа\n\n1. **Lighthouse** — инструмент от Google для комплексного анализа производительности.\n2. **WebPageTest** — детальное тестирование загрузки страниц.\n3. **Chrome DevTools Performance** — анализ рендеринга и выполнения JavaScript.\n4. **PageSpeed Insights** — сочетание лабораторных и полевых данных.\n\n## Заключение\n\nОптимизация производительности — это непрерывный процесс, а не разовая задача. Регулярно измеряйте показатели производительности, устанавливайте цели и работайте над их достижением. Даже небольшие улучшения могут значительно повлиять на пользовательский опыт и бизнес-показатели.',
'Практические советы и инструменты для повышения скорости загрузки и отзывчивости веб-сайтов.', 
1, 'public', '12 мин');

-- Создание тестовых проектов
INSERT INTO projects (title, description, imageUrl, links, tags, authorId)
VALUES 
('DMishanin.ru', 
'Персональный мини-портал для обмена знаниями и идеями. Построен на React, Node.js и MariaDB.', 
'https://via.placeholder.com/800x450', 
'["https://dmishanin.ru", "https://github.com/dmishanin/dmishanin-ru"]', 
'["React", "Node.js", "MariaDB", "TailwindCSS"]', 
1),

('Проект Таймер', 
'Приложение для управления временем и повышения продуктивности с техникой Pomodoro.', 
'https://via.placeholder.com/800x450', 
'["https://timer-app.example.com", "https://github.com/dmishanin/timer-app"]', 
'["React", "Redux", "Firebase"]', 
1); 