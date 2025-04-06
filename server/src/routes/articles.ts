import { Router } from 'express';
import ArticleController from '../controllers/ArticleController';

const router = Router();

// Получение списка статей
router.get('/', ArticleController.getArticles);

// Получение статьи по ID
router.get('/:id', ArticleController.getArticleById);

export default router; 