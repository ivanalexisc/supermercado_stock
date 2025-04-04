module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define('Producto', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    precio: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    id_categoria: DataTypes.INTEGER,
    imagen_url: DataTypes.STRING,
    activo: DataTypes.BOOLEAN,
  }, {
    tableName: 'productos',
    timestamps: false,
  });

  return Producto;
};
