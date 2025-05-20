const express = require('express');
const router = express.Router();
const { register, login, crearAdmin } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
// ruta para crear admin 
// router.post('/crear-admin', crearAdmin);



module.exports = router;
