'use strict';

import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import initModels from './init-models.js';

// Sequelize 인스턴스화
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: '3306',
    dialect: 'mysql',
    directory: './src/models',
    lang: 'esm',
    logging: false,
  }
);

const db = initModels(sequelize);

export { db, sequelize };
