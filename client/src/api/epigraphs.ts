import { getItems } from './directus';

export interface Epigraph {
  id: number;
  quote: string;
  author: string;
  status: 'published' | 'draft';
}

// Получение случайного эпиграфа
export const getRandomEpigraph = async (token?: string | null): Promise<Epigraph> => {
  // Получаем только опубликованные эпиграфы
  const epigraphs = await getItems<Epigraph>(
    'epigraphs',
    {
      filter: { status: { _eq: 'published' } },
      fields: ['id', 'quote', 'author']
    },
    token
  );
  
  // Если эпиграфов нет, возвращаем дефолтный
  if (!epigraphs.length) {
    return {
      id: 0,
      quote: "Хороший код пишется для людей, а не только для компьютеров",
      author: "Дмитрий Мишанин",
      status: 'published'
    };
  }
  
  // Выбираем случайный эпиграф
  const randomIndex = Math.floor(Math.random() * epigraphs.length);
  return epigraphs[randomIndex];
}; 