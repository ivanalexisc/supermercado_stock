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
  updateEstado: async (req, res) => {
    try {
      const { id } = req.params;
      const { estado } = req.body;
      const pedido = await Pedido.findByPk(id);
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }
      pedido.estado = estado;
      await pedido.save();
      res.json({ message: 'Estado actualizado', pedido });
    } catch (error) {
      console.error('Error al actualizar estado del pedido:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
};

module.exports = pedidosController;
