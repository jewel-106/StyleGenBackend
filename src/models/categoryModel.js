import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import User from "./userModel.js";

const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
}, {
  timestamps: true,
});

// Define associations if needed
User.hasMany(Category, { foreignKey: 'userId' });
Category.belongsTo(User, { foreignKey: 'userId' });

export default Category;
