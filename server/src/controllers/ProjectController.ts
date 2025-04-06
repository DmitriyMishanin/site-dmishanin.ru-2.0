import { Request, Response } from 'express';
import Project from '../models/Project';
import User from '../models/User';

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.findAll({
      where: { visibility: 'public' },
      include: [{
        model: User,
        attributes: ['id', 'name', 'role'],
        as: 'author'
      }],
      order: [['createdAt', 'DESC']]
    });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: ['id', 'name', 'role'],
        as: 'author'
      }]
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 