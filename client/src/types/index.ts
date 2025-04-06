// Типы пользователей
export type UserRole = 'admin' | 'author' | 'premium_reader' | 'reader';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

// Типы для статей
export interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  created_at: string;
  updated_at: string;
}

// Типы для проектов
export interface Project {
  id: number;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  created_at: string;
  updated_at: string;
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
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface ArticleCardProps {
  article: Article;
}

export interface ProjectCardProps {
  project: Project;
} 