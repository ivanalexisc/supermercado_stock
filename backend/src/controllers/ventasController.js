const db = require("../models");
const { Pedido, DetallePedido } = db;

const crearVenta = async (req, res) => {
  const { id_usuario, productos } = req.body;

  if (!id_usuario || !Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ mensaje: "Datos incompletos" });
  }

  const t = await db.sequelize.transaction();

  try {
    // Creamos el pedido
    const nuevoPedido = await Pedido.create(
      {
        id_usuario,
        fecha_pedido: new Date(),
      },
      { transaction: t }
    );

    // Creamos los detalles del pedido
    for (const prod of productos) {
      await DetallePedido.create(
        {
          id_pedido: nuevoPedido.id,
          id_producto: prod.id_producto,
          cantidad: prod.cantidad,
          precio_unitario: prod.precio,
        },
        { transaction: t }
      );

      //actualizar el stock
      await db.Producto.decrement("stock", {
        by: prod.cantidad,
        where: { id: prod.id_producto },
        transaction: t,
      });
    }

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
