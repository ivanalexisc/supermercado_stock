const express = require("express");
const cors = require("cors");
const db = require("./src/models");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/productos", require("./src/routes/productos"));

// Probar conexión y sincronizar modelos
db.sequelize.authenticate()
  .then(() => {
    console.log("🟢 Conexión a la base de datos exitosa");
    return db.sequelize.sync(); // opcional: { force: true }
  })
  .then(() => {
    app.listen(3001, () => console.log("✅ Servidor en http://localhost:3001"));
  })
  .catch(err => console.error("🔴 Error en la conexión:", err));
