import { useEffect, useState } from "react";
import "./cargarVenta.css";
import Alert from '@mui/material/Alert';

type Producto = {
  id: number;
  nombre: string;
  stock: number;
  precio: number;
};

type ItemVenta = {
  id_producto: number;
  nombre: string;
  cantidad: number;
  precio: number;
};

const CargarVenta = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [itemSeleccionado, setItemSeleccionado] = useState<number>(0);
  const [cantidad, setCantidad] = useState<number>(1);
  const [itemsVenta, setItemsVenta] = useState<ItemVenta[]>([]);
  const [stockDisponible, setStockDisponible] = useState<number>(0);
  const [alerta, setAlerta] = useState<null | "success" | "error">(null);

  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  useEffect(() => {
    fetch("http://localhost:3001/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error cargando productos:", error));
  }, []);

  useEffect(() => {
    const prod = productos.find((p) => p.id === itemSeleccionado);
    if (prod) {
      setStockDisponible(prod.stock);
      if (cantidad > prod.stock) {
        setCantidad(prod.stock); // Limita automáticamente si ya se pasó
      }
    }
  }, [itemSeleccionado, productos, cantidad]);

  const agregarItem = () => {
    const producto = productos.find((p) => p.id === itemSeleccionado);
    if (!producto || cantidad <= 0 || cantidad > producto.stock) {
      return alert("Cantidad inválida o producto no seleccionado");
    }

    const yaExiste = itemsVenta.find((item) => item.id_producto === producto.id);
    if (yaExiste) {
      return alert("Este producto ya fue agregado a la venta");
    }

    setItemsVenta((prev) => [
      ...prev,
      {
        id_producto: producto.id,
        nombre: producto.nombre,
        cantidad,
        precio: parseFloat(producto.precio as unknown as string)
      },
    ]);
    setCantidad(1);
    setItemSeleccionado(0);
  };

  const enviarVenta = async () => {
    const payload = {
      id_usuario: usuario.id,
      productos: itemsVenta.map(({ id_producto, cantidad, precio }) => ({
        id_producto,
        cantidad,
        precio_unitario: precio,
      })),
    };

    try {
      const res = await fetch("http://localhost:3001/api/ventas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    
      if (!res.ok) throw new Error("Error al enviar la venta");
    
      setAlerta("success");
      setItemsVenta([]);
    } catch (error) {
      console.error(error);
      setAlerta("error");
    }
  };

  return (
    <div className="venta-container">
      <h2>Registrar nueva venta</h2>
      {alerta === "success" && (
  <Alert
    severity="success"
    onClose={() => setAlerta(null)}
    style={{ marginBottom: "1rem" }}
  >
    Venta registrada con éxito
  </Alert>
)}

{alerta === "error" && (
  <Alert
    severity="error"
    onClose={() => setAlerta(null)}
    style={{ marginBottom: "1rem" }}
  >
    Error al registrar la venta
  </Alert>
)}
  
      <div className="select-row">
        <select
          value={itemSeleccionado}
          onChange={(e) => setItemSeleccionado(Number(e.target.value))}
        >
          <option value={0}>Seleccionar producto</option>
          {productos
            .filter((p) => p.stock > 0)
            .map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre} (Stock: {p.stock})
              </option>
            ))}
        </select>
  
        <input
          type="number"
          min={1}
          max={stockDisponible}
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
          disabled={itemSeleccionado === 0}
        />
  
        <button onClick={agregarItem}>Agregar</button>
      </div>
  
      <h3>Productos en la venta</h3>
  
      <table className="venta-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio unitario</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {itemsVenta.map((item, index) => (
            <tr key={index}>
              <td>{item.nombre}</td>
              <td>{item.cantidad}</td>
              <td>${item.precio.toFixed(2)}</td>
              <td>${(item.cantidad * item.precio).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
  
      {itemsVenta.length > 0 && (
        <button className="confirm-button" onClick={enviarVenta}>
          Confirmar venta
        </button>
      )}
    </div>
  );
};

export default CargarVenta;
