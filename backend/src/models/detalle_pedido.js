// models/detalle_pedido.js
module.exports = (sequelize, DataTypes) => {
    const DetallePedido = sequelize.define('DetallePedido', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cantidad: DataTypes.INTEGER,
      precio_unitario: DataTypes.DECIMAL(10, 2),
    }, {
        tableName:'detalles_pedido',
        timestamps: false 
    });
  
    DetallePedido.associate = function(models) {
      DetallePedido.belongsTo(models.Pedido, { foreignKey: 'id_pedido' });
      DetallePedido.belongsTo(models.Producto, { foreignKey: 'id_producto' });
    };
  
    return DetallePedido;
  };
  