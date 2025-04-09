const { Pedido, Usuario, DetallePedido, Producto } = require('../models');

const pedidosController = {
  getAll: async (req, res) => {
    try {
      const pedidos = await Pedido.findAll({
        include: [
          {
            model: Usuario,
            attributes: ['id', 'nombre'], 
          },
          {
            model: DetallePedido,
            include: [
              {
                model: Producto,
                attributes: ['id', 'nombre', 'precio'],
              },
            ],
          },
        ],
        order: [['id', 'DESC']], // Opcional: para que aparezcan los más recientes primero
      });

      res.json(pedidos);
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
};

module.exports = pedidosController;
