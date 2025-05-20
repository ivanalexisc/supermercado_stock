const { Producto, DetallePedido, Pedido } = require('../models');
const { Op, Sequelize } = require('sequelize');

module.exports = {
  async getStats(req, res) {
    try {
      // Total productos activos
      const totalProductos = await Producto.count({ where: { activo: true } });

      // Stock total de productos activos
      const stockTotal = await Producto.sum('stock', { where: { activo: true } });

      // Total ventas (suma de cantidad * precio_unitario)
      const totalVentas = await DetallePedido.findAll({
        attributes: [
          [Sequelize.fn('SUM', Sequelize.literal('cantidad * precio_unitario')), 'total']
        ],
        raw: true
      });

      // Ventas de hoy
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      const ventasHoy = await DetallePedido.findAll({
        include: [{
          model: Pedido,
          where: {
            fecha_pedido: {
              [Op.gte]: hoy
            }
          },
          attributes: []
        }],
        attributes: [
          [Sequelize.fn('SUM', Sequelize.literal('cantidad * precio_unitario')), 'total']
        ],
        raw: true
      });

      res.json({
        productos: totalProductos,
        stock: stockTotal,
        ventas: parseFloat(totalVentas[0].total) || 0,
        ventasHoy: parseFloat(ventasHoy[0].total) || 0,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener estadísticas' });
    }
  },
};
