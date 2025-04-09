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

  Producto.associate = (models) => {
    Producto.hasMany(models.DetallePedido, {
      foreignKey: "id_producto",
    });
  };

  return Producto;
};
