const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  customerId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'customer_id',
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.items.length > 0) {
        return this.items.reduce(
          (total, item) => total + item.price * item.OrderProduct.amount,
          0
        );
      }
      return 0;
    },
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class Order extends Model {
  static associate(models) {
    // define association here
    this.belongsTo(models.Customer, {
      as: 'customer',
    });
    this.belongsToMany(models.Product, {
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId',
      as: 'items',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Order',
      tableName: ORDER_TABLE,
      timestamps: false,
    };
  }
}

module.exports = { ORDER_TABLE, OrderSchema, Order };
