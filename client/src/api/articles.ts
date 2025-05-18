import { Article } from '../types';
import { getItems, getItem } from './directus';

// Флаг useSystemToken определяет, нужно ли использовать системный токен
// для административных операций
export const getArticles = async (
  params?: Record<string, any>, 
  token?: string | null, 
  useSystemToken: boolean = false
): Promise<Article[]> => {
  return getItems<Article>('articles', {
    filter: {
      status: {
        _eq: 'published'
      },
      ...params?.filter
    },
    ...params
  }, token, useSystemToken);
};

export const getArticleById = async (
  id: number, 
  token?: string | null, 
  useSystemToken: boolean = false
): Promise<Article> => {
  return getItem<Article>('articles', id, undefined, token, useSystemToken);
};

export const getArticleBySlug = async (
  slug: string, 
  token?: string | null, 
  useSystemToken: boolean = false
): Promise<Article> => {
  const articles = await getItems<Article>('articles', {
    filter: {
      slug: {
        _eq: slug
      },
      status: {
        _eq: 'published'
      }
    }
  }, token, useSystemToken);
  return articles[0];
}; 