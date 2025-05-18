import axios from 'axios';

const DIRECTUS_URL = process.env.REACT_APP_DIRECTUS_URL || 'https://directus.dmishanin.ru';
const DIRECTUS_TOKEN = process.env.REACT_APP_DIRECTUS_TOKEN;

// Создаем базовый API клиент
const createDirectusApi = (token?: string | null) => {
  return axios.create({
    baseURL: DIRECTUS_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
  });
};

// API клиент без токена для публичных запросов
const publicApi = createDirectusApi();

// API клиент для системных запросов (с токеном администратора)
const systemApi = createDirectusApi(DIRECTUS_TOKEN);

// Получение URL для статического ресурса
export const getAssetUrl = (assetId: string | null): string | null => {
  if (!assetId) return null;
  return `${DIRECTUS_URL}/assets/${assetId}`;
};

// Получение списка элементов коллекции
export const getItems = async <T>(
  collection: string, 
  params?: Record<string, any>, 
  token?: string | null,
  useSystemToken: boolean = false
): Promise<T[]> => {
  // Выбираем API клиент:
  // 1. Пользовательский токен, если он есть
  // 2. Системный токен, если указан флаг useSystemToken
  // 3. Публичный API без токена во всех остальных случаях
  let api;
  if (token) {
    api = createDirectusApi(token);
  } else if (useSystemToken) {
    api = systemApi;
  } else {
    api = publicApi;
  }
  
  const response = await api.get(`/items/${collection}`, { 
    params: {
      filter: params?.filter || {},
      fields: params?.fields || '*',
      sort: params?.sort || ['-date_created'],
      limit: params?.limit || -1
    } 
  });
  return response.data.data;
};

// Получение элемента коллекции по ID
export const getItem = async <T>(
  collection: string, 
  id: string | number, 
  params?: Record<string, any>,
  token?: string | null,
  useSystemToken: boolean = false
): Promise<T> => {
  // Выбираем API клиент по той же логике что и в getItems
  let api;
  if (token) {
    api = createDirectusApi(token);
  } else if (useSystemToken) {
    api = systemApi;
  } else {
    api = publicApi;
  }
  
  const response = await api.get(`/items/${collection}/${id}`, { 
    params: {
      fields: params?.fields || '*'
    } 
  });
  return response.data.data;
};

// Создание элемента коллекции (требуется авторизация)
export const createItem = async <T>(
  collection: string, 
  data: Record<string, any>,
  token?: string | null
): Promise<T> => {
  // Для создания элементов требуется токен
  const api = token ? createDirectusApi(token) : systemApi;
  
  const response = await api.post(`/items/${collection}`, data);
  return response.data.data;
};

// Обновление элемента коллекции (требуется авторизация)
export const updateItem = async <T>(
  collection: string, 
  id: string | number, 
  data: Record<string, any>,
  token?: string | null
): Promise<T> => {
  // Для обновления элементов требуется токен
  const api = token ? createDirectusApi(token) : systemApi;
  
  const response = await api.patch(`/items/${collection}/${id}`, data);
  return response.data.data;
};

// Удаление элемента коллекции (требуется авторизация)
export const deleteItem = async (
  collection: string, 
  id: string | number,
  token?: string | null
): Promise<void> => {
  // Для удаления элементов требуется токен
  const api = token ? createDirectusApi(token) : systemApi;
  
  await api.delete(`/items/${collection}/${id}`);
};

export default {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  getAssetUrl
}; 