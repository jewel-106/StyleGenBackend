import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    dialectOptions: process.env.DB_HOST === "localhost" ? {} : {
      ssl: {
        rejectUnauthorized: false
      },
      connectTimeout: 60000
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000,
      evict: 1000
    },
    logging: false,
  }
);

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();

    // Sync models - in production you might want to use migrations instead
    await sequelize.sync({ alter: true });
    console.log("✅ Database synced successfully");
  } catch (error) {
    console.error("❌ Database Connection Error:", error.message);
    process.exit(1);
  }
};

export { sequelize };
export default connectDatabase;
