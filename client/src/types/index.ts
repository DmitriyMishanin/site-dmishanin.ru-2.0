// Типы пользователей
export type UserRole = 'Administrator' | 'Премиум' | 'Приватный' | 'Автор';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  date_created: string;
}

// Типы для статей
export interface Article {
  id: number;
  status: 'published' | 'draft' | 'archived';
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string | null;
  visibility: 'public' | 'premium' | 'private';
  readTime: string | null;
  author_id: string;
  date_created: string;
  date_updated: string;
  user_created: string;
  user_updated: string;
  author?: User;
}

// Типы для проектов
export interface Project {
  id: number;
  status: 'published' | 'draft' | 'archived';
  title: string;
  slug: string;
  description: string;
  image: string | null;
  demoUrl: string | null;
  githubUrl: string | null;
  visibility: 'public' | 'private';
  author_id: string;
  date_created: string;
  date_updated: string;
  user_created: string;
  user_updated: string;
  author?: User;
}

// Типы для комментариев
export interface Comment {
  id: number;
  articleId: number;
  userId: number;
  user?: User;
  content: string;
  createdAt: string;
}

// Типы для аутентификации
export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  first_name: string;
  last_name: string;
}

export interface AuthResponse {
  access_token: string;
  expires: number;
  refresh_token: string;
}

export interface ArticleCardProps {
  article: Article;
}

export interface ProjectCardProps {
  project: Project;
} 