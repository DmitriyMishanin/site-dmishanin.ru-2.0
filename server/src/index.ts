import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import * as path from 'path';
import { connectDB } from './config/db';

// Загрузка переменных окружения
dotenv.config();

// Инициализация приложения
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Импорт моделей для инициализации
import './models/User';
import './models/Article';
import './models/Project';

// Роуты будут добавлены позже
// app.use('/api/auth', authRoutes);
// app.use('/api/articles', articleRoutes);
// app.use('/api/projects', projectRoutes);

// Базовый маршрут для проверки API
app.get('/api', (req, res) => {
  res.json({
    message: 'API DMishanin.ru v2.0 работает',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Обработка ошибок
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Что-то пошло не так!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// Подключение к базе данных и запуск сервера
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
  });
}).catch(err => {
  console.error('Не удалось подключиться к базе данных:', err);
}); 