module.exports = (sequelize, DataTypes) => {
  const HistorialMovimiento = sequelize.define("HistorialMovimiento", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: true, // Si todavía no tenés usuarios funcionando, podés dejarlo null
    },
    tipo_movimiento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cantidad_afectada: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'historial_movimientos',
  });

  HistorialMovimiento.associate = function(models) {
    // Asociación con Producto (si tenés el modelo Producto)
    HistorialMovimiento.belongsTo(models.Producto, {
      foreignKey: 'id_producto',
      as: 'producto',
    });

    // Asociación con Usuario (si tenés el modelo Usuario)
    HistorialMovimiento.belongsTo(models.Usuario, {
      foreignKey: 'id_usuario',
      as: 'usuario',
    });
  };

  return HistorialMovimiento;
};
