import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Загрузка переменных окружения
dotenv.config();

// Создание экземпляра Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME || 'dmishanin_db',
  process.env.DB_USER || 'dmishanin',
  process.env.DB_PASSWORD || 'password',
  {
    host: process.env.DB_HOST || 'db',
    port: parseInt(process.env.DB_PORT || '3306'),
    dialect: 'mysql',
    logging: process.env.NODE_ENV !== 'production',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Функция для проверки подключения к БД
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Соединение с базой данных установлено.');
    
    // Синхронизация моделей с БД
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      console.log('Модели синхронизированы с базой данных.');
    }
  } catch (error) {
    console.error('Ошибка подключения к базе данных:', error);
    process.exit(1);
  }
};

export default sequelize; 