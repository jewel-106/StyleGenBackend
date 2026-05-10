import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import User from "./userModel.js";

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  orderItems: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  shippingAddress: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
  },
  status: {
    type: DataTypes.ENUM("pending", "shipped", "delivered", "cancelled"),
    defaultValue: "pending",
  },
}, {
  timestamps: true,
});

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

export default Order;
