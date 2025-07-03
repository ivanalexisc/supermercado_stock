const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

// GET /api/pedidos
router.get('/', pedidosController.getAll);

// PUT /api/pedidos/:id/estado
router.put('/:id/estado', pedidosController.updateEstado);

module.exports = router;
