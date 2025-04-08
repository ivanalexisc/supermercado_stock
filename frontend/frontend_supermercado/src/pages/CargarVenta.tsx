import { useEffect, useState } from "react";

type Producto = {
  id: number;
  nombre: string;
  stock: number;
  precio:number;
};

type ItemVenta = {
  id_producto: number;
  nombre: string;
  cantidad: number;
  precio:number;
};

const CargarVenta = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [itemSeleccionado, setItemSeleccionado] = useState<number>(0);
  const [cantidad, setCantidad] = useState<number>(1);
  const [itemsVenta, setItemsVenta] = useState<ItemVenta[]>([]);

  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  useEffect(() => {
    fetch("http://localhost:3001/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error cargando productos:", error));
  }, []);

  const agregarItem = () => {
    const producto = productos.find(p => p.id === itemSeleccionado);
    if (!producto || cantidad <= 0 || cantidad > producto.stock) {
      return alert("Cantidad inválida o producto no seleccionado");
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
  };

  const enviarVenta = async () => {
    const payload = {
      id_usuario: usuario.id,
      productos: itemsVenta.map(({ id_producto, cantidad }) => ({
        id_producto,
        cantidad,
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

      alert("Venta registrada con éxito");
      setItemsVenta([]);
    } catch (error) {
      console.error(error);
      alert("Error al registrar la venta");
    }
  };

  return (
    <div className="venta-container">
      <h2>Registrar nueva venta</h2>

      <div>
        <select
          value={itemSeleccionado}
          onChange={(e) => setItemSeleccionado(Number(e.target.value))}
        >
          <option value={0}>Seleccionar producto</option>
          {productos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} (Stock: {p.stock})
            </option>
          ))}
        </select>

        <input
          type="number"
          min={1}
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
        />

        <button onClick={agregarItem}>Agregar</button>
      </div>

      <h3>Productos en la venta</h3>
      <table>
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
        <button onClick={enviarVenta}>Confirmar venta</button>
      )}
    </div>
  );
};

export default CargarVenta;
