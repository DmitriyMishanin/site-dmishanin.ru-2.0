import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import ProjectPage from './pages/ProjectPage';
import ArticlesPage from './pages/ArticlesPage';
import ProjectsPage from './pages/ProjectsPage';
import { ArticlesProvider } from './context/ArticlesContext';
import { ProjectsProvider } from './context/ProjectsContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <ArticlesProvider>
            <ProjectsProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/articles" element={<ArticlesPage />} />
                <Route path="/articles/:slug" element={<ArticlePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:slug" element={<ProjectPage />} />
                <Route path="/signin" element={<div>Вход в систему в разработке</div>} />
                <Route path="/signup" element={<div>Регистрация в разработке</div>} />
                <Route path="*" element={<div>Страница не найдена</div>} />
              </Routes>
            </ProjectsProvider>
          </ArticlesProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App; 