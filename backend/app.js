const express = require("express");
const cors = require("cors");
const db = require("./src/models");
const authRoutes = require('./src/routes/auth')
const ventasRoutes = require('./src/routes/ventas');
const pedidosRoutes = require('./src/routes/pedidos');
const dashboardRoutes = require('./src/routes/dashboard');
const productoRoutes = require('./src/routes/productos');


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/productos", productoRoutes);
app.use('/auth', authRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/api/categorias', require('./src/routes/categorias'));

// Probar conexión y sincronizar modelos
db.sequelize.authenticate()
  .then(() => {
    console.log("🟢 Conexión a la base de datos exitosa");
    return db.sequelize.sync(); // opcional: { force: true }
  })
  .then(() => {
    app.listen(8080, () => console.log("✅ Servidor en http://localhost:8080"));
  })
  .catch(err => console.error("🔴 Error en la conexión:", err));
