import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import User from './User';

// Определение интерфейса для модели Project
interface ProjectAttributes {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  authorId: number;
  visibility: 'public' | 'private';
  createdAt?: Date;
  updatedAt?: Date;
}

// Определение класса модели Project
class Project extends Model<ProjectAttributes> {
  public id!: number;
  public title!: string;
  public description!: string;
  public imageUrl!: string | null;
  public demoUrl!: string | null;
  public githubUrl!: string | null;
  public authorId!: number;
  public visibility!: 'public' | 'private';
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Инициализация модели
Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    demoUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    githubUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    visibility: {
      type: DataTypes.ENUM('public', 'private'),
      defaultValue: 'public',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: 'projects',
    timestamps: true
  }
);

// Определение связей
Project.belongsTo(User, {
  foreignKey: 'authorId',
  as: 'author'
});

User.hasMany(Project, {
  foreignKey: 'authorId',
  as: 'projects'
});

export default Project; 