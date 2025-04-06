import React from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Логика аутентификации будет добавлена позже
    alert('Форма входа отправлена (демо)');
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    // Логика восстановления пароля будет добавлена позже
    alert('Восстановление пароля (демо)');
  };

  // Если модальное окно не открыто, не рендерим его
  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          onClick={onClose}
          aria-label="Закрыть"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Вход в систему</h2>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Пароль</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="remember-me" 
                name="remember-me"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 dark:text-gray-300">
                Запомнить меня
              </label>
            </div>
            <button 
              onClick={handleForgotPassword}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 bg-transparent border-none p-0"
            >
              Забыли пароль?
            </button>
          </div>
          
          <button 
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition duration-200"
          >
            Войти
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Нет аккаунта? </span>
          <a href="/register" className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            Зарегистрироваться
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginModal; 