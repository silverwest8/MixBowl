'use strict';

require('dotenv').config();
const Sequelize = require('sequelize-auto');

const sequelizeAuto = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: '3306',
    dialect: 'mysql',
    directory: './src/models',
    lang: 'esm',
  }
);

sequelizeAuto.run(err => {
  if (err) throw err;
});
