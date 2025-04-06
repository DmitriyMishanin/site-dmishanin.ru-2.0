import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Пока заглушки для будущих маршрутов */}
        <Route path="/articles" element={<div>Раздел статей в разработке</div>} />
        <Route path="/articles/:id" element={<div>Страница статьи в разработке</div>} />
        <Route path="/projects" element={<div>Раздел проектов в разработке</div>} />
        <Route path="/signin" element={<div>Вход в систему в разработке</div>} />
        <Route path="/signup" element={<div>Регистрация в разработке</div>} />
        <Route path="*" element={<div>Страница не найдена</div>} />
      </Routes>
    </Router>
  );
};

export default App; 