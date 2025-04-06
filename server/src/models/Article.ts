import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';
import User from './User';

export enum ArticleVisibility {
  PUBLIC = 'public',
  PREMIUM = 'premium',
  PRIVATE = 'private'
}

// Определение интерфейса для модели Article
interface ArticleAttributes {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  authorId: number;
  imageUrl?: string;
  visibility: ArticleVisibility;
  readTime?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Определение интерфейса для создания новой статьи
export interface ArticleCreationAttributes extends Optional<ArticleAttributes, 'id' | 'createdAt' | 'updatedAt' | 'imageUrl' | 'readTime'> {}

// Определение класса модели Article
class Article extends Model<ArticleAttributes, ArticleCreationAttributes> {
  public id!: number;
  public title!: string;
  public content!: string;
  public excerpt!: string;
  public authorId!: number;
  public imageUrl!: string;
  public visibility!: ArticleVisibility;
  public readTime!: string;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Инициализация модели
Article.init(
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
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    excerpt: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    visibility: {
      type: DataTypes.ENUM(...Object.values(ArticleVisibility)),
      allowNull: false,
      defaultValue: ArticleVisibility.PUBLIC
    },
    readTime: {
      type: DataTypes.STRING,
      allowNull: true
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
    tableName: 'articles',
    timestamps: true
  }
);

// Определение связей
Article.belongsTo(User, {
  foreignKey: 'authorId',
  as: 'author'
});

User.hasMany(Article, {
  foreignKey: 'authorId',
  as: 'articles'
});

export default Article; 