import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

export const useRoleCheck = () => {
  const { user } = useAuth();

  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    
    return user.role === role;
  };

  const isAdmin = (): boolean => hasRole('Administrator');
  const isAuthor = (): boolean => hasRole(['Administrator', 'Автор']);
  const isPremium = (): boolean => hasRole(['Administrator', 'Премиум']);
  const isPrivate = (): boolean => hasRole(['Administrator', 'Приватный']);

  return {
    hasRole,
    isAdmin,
    isAuthor,
    isPremium,
    isPrivate
  };
}; 