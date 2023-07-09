import { Sequelize } from 'sequelize';
import config from '../config';
import dotenv from 'dotenv';

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_DIALECT,
    }
);

export default sequelize;
