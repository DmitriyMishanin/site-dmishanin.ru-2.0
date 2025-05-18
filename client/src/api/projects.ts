import { Project } from '../types';
import { getItems, getItem } from './directus';

// Флаг useSystemToken определяет, нужно ли использовать системный токен
// для административных операций
export const getProjects = async (
  params?: Record<string, any>, 
  token?: string | null, 
  useSystemToken: boolean = false
): Promise<Project[]> => {
  return getItems<Project>('projects', {
    filter: {
      status: {
        _eq: 'published'
      },
      ...params?.filter
    },
    ...params
  }, token, useSystemToken);
};

export const getProjectById = async (
  id: number, 
  token?: string | null, 
  useSystemToken: boolean = false
): Promise<Project> => {
  return getItem<Project>('projects', id, undefined, token, useSystemToken);
};

export const getProjectBySlug = async (
  slug: string, 
  token?: string | null, 
  useSystemToken: boolean = false
): Promise<Project> => {
  const projects = await getItems<Project>('projects', {
    filter: {
      slug: {
        _eq: slug
      },
      status: {
        _eq: 'published'
      }
    }
  }, token, useSystemToken);
  return projects[0];
}; 