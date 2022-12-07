const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class Category extends Model {
  static associate(models) {
    // define association here
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'categoryId',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Category',
      tableName: CATEGORY_TABLE,
      timestamps: false,
    };
  }
}

module.exports = { CATEGORY_TABLE, CategorySchema, Category };
