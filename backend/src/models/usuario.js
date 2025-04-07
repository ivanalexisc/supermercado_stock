// models/Usuario.js
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    direccion: DataTypes.TEXT,
    telefono: DataTypes.STRING,
    es_admin: DataTypes.BOOLEAN,
  }, {
    tableName: 'usuarios',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  return Usuario;
};
