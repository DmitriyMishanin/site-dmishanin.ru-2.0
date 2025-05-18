import axios from 'axios';
import { LoginCredentials, AuthResponse, User } from '../types';

const DIRECTUS_URL = process.env.REACT_APP_DIRECTUS_URL || 'https://directus.dmishanin.ru';

// API клиент без токена для аутентификации
const authApi = axios.create({
  baseURL: DIRECTUS_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Авторизация пользователя
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await authApi.post('/auth/login', credentials);
  return response.data.data;
};

// Выход из системы
export const logout = async (refresh_token: string): Promise<void> => {
  await authApi.post('/auth/logout', { refresh_token });
};

// Обновление токена
export const refreshToken = async (refresh_token: string): Promise<AuthResponse> => {
  const response = await authApi.post('/auth/refresh', { refresh_token });
  return response.data.data;
};

// Получение информации о текущем пользователе
export const getCurrentUser = async (access_token: string): Promise<User> => {
  const response = await axios.get(`${DIRECTUS_URL}/users/me`, {
    headers: { 'Authorization': `Bearer ${access_token}` },
    params: { 
      fields: ['id', 'first_name', 'last_name', 'email', 'role.*'],
      deep: { role: { _fields: ['id', 'name'] } }
    }
  });
  
  // Преобразуем данные роли в нужный формат
  const userData = response.data.data;
  return {
    ...userData,
    role: userData.role.name // Используем название роли вместо ID
  };
}; 