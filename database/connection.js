import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import seed from "../seeders/20230709150000-all-seeders.js";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    operatorsAliases: false,
  }
);

const queryInterface = sequelize.getQueryInterface();
seed.up(queryInterface, Sequelize);


export default sequelize;
