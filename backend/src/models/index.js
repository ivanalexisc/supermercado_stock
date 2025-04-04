'use strict';
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Producto = require('./producto')(sequelize, DataTypes);
db.Usuario = require('./usuario')(sequelize, DataTypes);

// Asociaciones si hay relaciones entre modelos

module.exports = db;
