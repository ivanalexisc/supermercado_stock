const db = require("../models");
const { Pedido, DetallePedido, Producto } = db;

const crearVenta = async (req, res) => {
  const { id_usuario, productos } = req.body;

  if (!id_usuario || !Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ mensaje: "Datos incompletos" });
  }

  const t = await db.sequelize.transaction();

  try {
    // Verificar disponibilidad de stock antes de continuar
    for (const prod of productos) {
      const productoDB = await Producto.findByPk(prod.id_producto, { transaction: t });

      if (!productoDB) {
        throw new Error(`Producto con ID ${prod.id_producto} no encontrado`);
      }

      if (productoDB.stock < prod.cantidad) {
        // Cancelamos todo si hay stock insuficiente
        await t.rollback();
        return res.status(400).json({
          mensaje: `Stock insuficiente para el producto "${productoDB.nombre}" (ID ${prod.id_producto})`,
        });
      }
    }

    // Creamos el pedido
    const nuevoPedido = await Pedido.create(
      {
        id_usuario,
        fecha_pedido: new Date(),
        total: 0,
      },
      { transaction: t }
    );

    let total = 0;

    for (const prod of productos) {
      const productoDB = await Producto.findByPk(prod.id_producto, { transaction: t });

      const precio_unitario = productoDB.precio;
      const subtotal = prod.cantidad * precio_unitario;
      total += subtotal;

      await DetallePedido.create(
        {
          id_pedido: nuevoPedido.id,
          id_producto: prod.id_producto,
          cantidad: prod.cantidad,
          precio_unitario,
        },
        { transaction: t }
      );

      await productoDB.decrement("stock", {
        by: prod.cantidad,
        transaction: t,
      });
    }

    await nuevoPedido.update({ total }, { transaction: t });

    await t.commit();
    res.status(201).json({ mensaje: "Venta registrada con éxito", pedido: nuevoPedido.id });
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ mensaje: "Error al registrar la venta" });
  }
};

module.exports = {
  crearVenta,
};
