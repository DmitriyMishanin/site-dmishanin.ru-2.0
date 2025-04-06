import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import ProjectPage from './pages/ProjectPage';
import ArticlesPage from './pages/ArticlesPage';
import ProjectsPage from './pages/ProjectsPage';
import { ArticlesProvider } from './context/ArticlesContext';
import { ProjectsProvider } from './context/ProjectsContext';

const App: React.FC = () => {
  return (
    <Router>
      <ArticlesProvider>
        <ProjectsProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:id" element={<ArticlePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectPage />} />
            <Route path="/signin" element={<div>Вход в систему в разработке</div>} />
            <Route path="/signup" element={<div>Регистрация в разработке</div>} />
            <Route path="*" element={<div>Страница не найдена</div>} />
          </Routes>
        </ProjectsProvider>
      </ArticlesProvider>
    </Router>
  );
};

export default App; 