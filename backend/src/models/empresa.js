module.exports = (sequelize, DataTypes) => {
  const Empresa = sequelize.define('Empresa', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cuit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'empresas',
    timestamps: false
  });

  Empresa.associate = function(models) {
    Empresa.hasMany(models.Usuario, {
      foreignKey: 'id_empresa',
      as: 'usuarios'
    });
    Empresa.hasMany(models.Producto, {
      foreignKey: 'id_empresa',
      as: 'productos'
    });
  };

  return Empresa;
};
