module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define('Categoria', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: DataTypes.STRING
  }, {
    tableName: 'categorias',
    timestamps: false
  });

  Categoria.associate = (models) => {
    // Si quieres asociar productos a categorías
    Categoria.hasMany(models.Producto, { foreignKey: 'id_categoria' });
  };

  return Categoria;
};
