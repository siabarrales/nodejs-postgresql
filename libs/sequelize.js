const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

//?MySQL connection
// const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
// const sequelize = new Sequelize(URI, {
//   logging: true,
//   dialect: 'mysql',
// });

//?Postgres connection
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const sequelize = new Sequelize(URI, {
  logging: true,
  dialect: 'postgres',
});

setupModels(sequelize);

module.exports = sequelize;
