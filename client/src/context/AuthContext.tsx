import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { User, AuthState, LoginCredentials } from '../types';
import { login as apiLogin, logout as apiLogout, refreshToken as apiRefreshToken, getCurrentUser } from '../api/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem(TOKEN_KEY),
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
    isAuthenticated: false,
    loading: true,
    error: null
  });

  // Загрузка пользователя при инициализации
  useEffect(() => {
    const loadUser = async () => {
      if (state.token) {
        try {
          const user = await getCurrentUser(state.token);
          setState(prev => ({
            ...prev,
            user,
            isAuthenticated: true,
            loading: false
          }));
        } catch (err) {
          // Если токен невалиден, попробуем обновить
          await refreshAccessToken();
        } finally {
          setState(prev => ({ ...prev, loading: false }));
        }
      } else {
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    if (state.loading) {
      loadUser();
    }
  }, [state.token, state.loading]);

  // Обновление токена
  const refreshAccessToken = async (): Promise<boolean> => {
    if (!state.refreshToken) return false;

    try {
      const data = await apiRefreshToken(state.refreshToken);
      localStorage.setItem(TOKEN_KEY, data.access_token);
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);
      
      const user = await getCurrentUser(data.access_token);
      setState({
        user,
        token: data.access_token,
        refreshToken: data.refresh_token,
        isAuthenticated: true,
        loading: false,
        error: null
      });
      return true;
    } catch (err) {
      // Если обновление не удалось, очищаем состояние
      clearAuthState();
      return false;
    }
  };

  // Очистка состояния авторизации
  const clearAuthState = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    setState({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      loading: false,
      error: null
    });
  };

  // Авторизация
  const login = async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await apiLogin(credentials);
      localStorage.setItem(TOKEN_KEY, data.access_token);
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);
      
      const user = await getCurrentUser(data.access_token);
      setState({
        user,
        token: data.access_token,
        refreshToken: data.refresh_token,
        isAuthenticated: true,
        loading: false,
        error: null
      });
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.errors?.[0]?.message || 'Ошибка при входе в систему'
      }));
      throw err;
    }
  };

  // Выход
  const logout = async () => {
    setState(prev => ({ ...prev, loading: true }));
    
    try {
      if (state.refreshToken) {
        await apiLogout(state.refreshToken);
      }
    } catch (err) {
      console.error('Ошибка при выходе:', err);
    } finally {
      clearAuthState();
    }
  };

  // Проверка авторизации
  const checkAuth = useCallback(async (): Promise<boolean> => {
    if (state.isAuthenticated) return true;
    if (state.token) {
      try {
        await getCurrentUser(state.token);
        return true;
      } catch (err) {
        return refreshAccessToken();
      }
    } else if (state.refreshToken) {
      return refreshAccessToken();
    }
    return false;
  }, [state.isAuthenticated, state.token, state.refreshToken]);

  const value = {
    ...state,
    login,
    logout,
    checkAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 