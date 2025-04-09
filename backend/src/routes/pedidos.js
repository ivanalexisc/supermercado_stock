const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

// GET /api/pedidos
router.get('/', pedidosController.getAll);

module.exports = router;
