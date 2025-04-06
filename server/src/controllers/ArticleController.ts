import { Request, Response } from 'express';
import Article from '../models/Article';
import { Op } from 'sequelize';

class ArticleController {
  // Получение списка статей
  async getArticles(req: Request, res: Response) {
    try {
      const { visibility = 'public' } = req.query;
      
      const articles = await Article.findAll({
        where: {
          visibility: visibility as string
        },
        include: [{
          association: 'author',
          attributes: ['id', 'name', 'role']
        }],
        order: [['createdAt', 'DESC']]
      });

      res.json(articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Получение статьи по ID
  async getArticleById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const article = await Article.findByPk(id, {
        include: [{
          association: 'author',
          attributes: ['id', 'name', 'role']
        }]
      });

      if (!article) {
        return res.status(404).json({ error: 'Article not found' });
      }

      res.json(article);
    } catch (error) {
      console.error('Error fetching article:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new ArticleController(); 