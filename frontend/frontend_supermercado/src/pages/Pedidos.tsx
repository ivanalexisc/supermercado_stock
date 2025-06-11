// src/pages/Pedidos.tsx
import { useEffect, useState } from "react";
import { Pedido, PedidoAPI } from "../types";



const Pedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/pedidos")
      .then((res) => res.json())
      .then((data: PedidoAPI[]) => {
        const pedidosFormateados: Pedido[] = data.map((p) => ({
          id: p.id,
          fecha_pedido: p.fecha_pedido,
          total: parseFloat(p.total),
          usuario: p.Usuario?.nombre || "Desconocido",
          detalles: p.DetallePedidos.map((d) => ({
            id_producto: d.id_producto,
            nombre: d.Producto?.nombre || "Sin nombre",
            cantidad: d.cantidad,
            precio_unitario: parseFloat(d.precio_unitario),
          })),
        }));
        setPedidos(pedidosFormateados);
      });
  }, []);

  return (
    <div className="container">
      <h2>Lista de Pedidos</h2>
      {pedidos.length === 0 ? (
        <p>No hay pedidos aún.</p>
      ) : (
        <div className="table-container">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="pedido-card">
              <h4>Pedido #{pedido.id} - {new Date(pedido.fecha_pedido).toLocaleDateString()}</h4>
              <table className="productos-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio unitario</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(pedido.detalles) && pedido.detalles.map((d, idx) => (
                    <tr key={idx}>
                      <td>{d.nombre}</td>
                      <td>{d.cantidad}</td>
                      <td>${d.precio_unitario.toFixed(2)}</td>
                      <td>${(d.cantidad * d.precio_unitario).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="total"><strong>Total:</strong> ${Number(pedido.total).toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pedidos;
