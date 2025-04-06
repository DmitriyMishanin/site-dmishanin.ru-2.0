export interface Article {
  id: string;
  title: string;
  content: string;
  date: string;
  readingTime: string;
  author: {
    role: 'admin' | 'core' | 'member';
    name: string;
  };
} 