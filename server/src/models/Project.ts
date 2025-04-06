import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';
import User from './User';

// Определение интерфейса для модели Project
interface ProjectAttributes {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  links: string[];
  tags?: string[];
  authorId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Определение интерфейса для создания нового проекта
export interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id' | 'createdAt' | 'updatedAt' | 'imageUrl' | 'tags'> {}

// Определение класса модели Project
class Project extends Model<ProjectAttributes, ProjectCreationAttributes> {
  public id!: number;
  public title!: string;
  public description!: string;
  public imageUrl!: string;
  public links!: string[];
  public tags!: string[];
  public authorId!: number;
  
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
      type: DataTypes.STRING(200),
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
    links: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: []
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
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