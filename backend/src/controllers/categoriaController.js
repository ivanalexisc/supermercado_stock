const { Categoria } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const categorias = await Categoria.findAll({ attributes: ['id', 'nombre'] });
      res.json(categorias);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener las categorías' });
    }
  },
};
