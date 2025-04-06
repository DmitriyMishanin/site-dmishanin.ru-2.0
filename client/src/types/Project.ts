export interface Project {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  author: {
    role: 'admin' | 'core' | 'member';
    name: string;
  };
} 