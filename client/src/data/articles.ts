import { Article } from '../types/Article';

export const articles: Article[] = [
  {
    id: 'react-hooks',
    title: 'Введение в React Hooks',
    content: `
      <h2>Что такое React Hooks?</h2>
      <p>React Hooks — это функции, которые позволяют использовать состояние и другие возможности React в функциональных компонентах.</p>
      
      <h2>Основные хуки</h2>
      <p>Рассмотрим основные хуки, которые предоставляет React:</p>
      
      <h3>useState</h3>
      <pre><code class="language-javascript">import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Вы кликнули {count} раз</p>
      <button onClick={() => setCount(count + 1)}>
        Нажми меня
      </button>
    </div>
  );
}</code></pre>
      
      <h3>useEffect</h3>
      <p>useEffect позволяет выполнять побочные эффекты в функциональных компонентах.</p>
    `,
    date: '01.04.2024',
    readingTime: '15 мин',
    author: {
      role: 'core',
      name: 'Дмитрий Мишанин'
    }
  },
  {
    id: 'css-animations',
    title: 'CSS-анимации: от простого к сложному',
    content: `
      <h2>Основы CSS-анимаций</h2>
      <p>CSS-анимации позволяют создавать плавные переходы между состояниями элементов.</p>
      
      <h3>@keyframes</h3>
      <pre><code class="language-css">@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}</code></pre>
    `,
    date: '28.03.2024',
    readingTime: '12 мин',
    author: {
      role: 'core',
      name: 'Дмитрий Мишанин'
    }
  }
]; 