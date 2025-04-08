const express = require("express");
const router = express.Router();
const ventasController = require("../controllers/ventasController");

router.post("/", ventasController.crearVenta);

module.exports = router;
