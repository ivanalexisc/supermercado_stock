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
db.Pedido = require('./pedido')(sequelize, DataTypes);
db.DetallePedido = require('./detalle_pedido')(sequelize, DataTypes);
db.Categoria = require('./categoria')(sequelize, DataTypes);

// Relacion Usuario - Pedido
db.Usuario.hasMany(db.Pedido, { foreignKey: 'id_usuario' });
db.Pedido.belongsTo(db.Usuario, { foreignKey: 'id_usuario' });

// Relacion Pedido - DetallePedido
db.Pedido.hasMany(db.DetallePedido, { foreignKey: 'id_pedido' });
db.DetallePedido.belongsTo(db.Pedido, { foreignKey: 'id_pedido' });

// Relacion Producto - DetallePedido
db.Producto.hasMany(db.DetallePedido, { foreignKey: 'id_producto' });
db.DetallePedido.belongsTo(db.Producto, { foreignKey: 'id_producto' });

// Relacion Producto - Categoria
db.Categoria.hasMany(db.Producto, { foreignKey: 'id_categoria' });
db.Producto.belongsTo(db.Categoria, { foreignKey: 'id_categoria' });

module.exports = db;

