const { Producto } = require('../models');



module.exports = {
  async getAll(req, res) {
    try {
      const productos = await Producto.findAll({ where: { activo: true } });
      res.json(productos);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  },

  async getById(req, res) {
    try {
      const producto = await Producto.findByPk(req.params.id);
      if (!producto) return res.status(404).json({ error: 'No encontrado' });
      res.json(producto);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
  },

  async create(req, res) {
    try {
      const nuevoProducto = await Producto.create({ ...req.body, activo: true });
      res.status(201).json(nuevoProducto);
    } catch (err) {
      res.status(500).json({ error: 'Error al crear el producto' });
    }
  },

  async update(req, res) {
    try {
      await Producto.update(req.body, { where: { id: req.params.id } });
      res.json({ message: 'Producto actualizado' });
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  },

  async destroy(req, res) {
    try {
      await Producto.update({ activo: false }, { where: { id: req.params.id } });
      res.json({ message: 'Producto desactivado' });
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  },
 

};
