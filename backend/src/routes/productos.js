const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const auth = require('../middleware/auth');

router.get('/', productoController.getAll);
router.get('/:id', productoController.getById);
router.post('/', auth,  productoController.create);
router.put('/:id', productoController.update);
router.delete('/:id', productoController.destroy);


module.exports = router;
