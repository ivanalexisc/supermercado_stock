module.exports = (sequelize, DataTypes) => {
    const Pedido = sequelize.define(
      'Pedido',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        fecha_pedido: DataTypes.DATE,
        total: DataTypes.DECIMAL(10, 2),
        estado: DataTypes.ENUM('pendiente', 'completado', 'cancelado'),
      },
      {
        timestamps: false 
      }
    );
  
    Pedido.associate = function(models) {
      Pedido.belongsTo(models.Usuario, { foreignKey: 'id_usuario' });
      Pedido.hasMany(models.DetallePedido, { foreignKey: 'id_pedido' });
    };
  
    return Pedido;
  };
  