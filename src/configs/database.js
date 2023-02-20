const { Sequelize } = require('sequelize');

const { configs } = require('./configs');

const USER = encodeURIComponent(configs.dbUser);
const PASSWORD = encodeURIComponent(configs.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${configs.dbHost}:${configs.dbPort}/${configs.dbName}`;

const sequelize = new Sequelize(URI, {
  logging: configs.env !== 'production' && configs.env !== 'test'
});

module.exports = sequelize;
