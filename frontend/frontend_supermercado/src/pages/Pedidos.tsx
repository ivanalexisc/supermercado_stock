// src/pages/Pedidos.tsx
import { useEffect, useState } from "react";
import { Pedido, PedidoAPI } from "../types";
import "./Pedidos.css";



const Pedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<string>("todos");

  useEffect(() => {
    fetch("http://localhost:3001/api/pedidos")
      .then((res) => res.json())
      .then((data: PedidoAPI[]) => {
        const pedidosFormateados: Pedido[] = data.map((p) => ({
          id: p.id,
          fecha_pedido: p.fecha_pedido,
          total: parseFloat(p.total),
          usuario: p.Usuario?.nombre || "Desconocido",
          estado: p.estado,
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
      <div style={{ marginBottom: 20, display: 'flex', gap: 12 }}>
        <button
          className={filtroEstado === "todos" ? "filtro-btn activo" : "filtro-btn"}
          onClick={() => setFiltroEstado("todos")}
        >Todos</button>
        <button
          className={filtroEstado === "pendiente" ? "filtro-btn activo" : "filtro-btn"}
          onClick={() => setFiltroEstado("pendiente")}
        >Pendiente</button>
        <button
          className={filtroEstado === "enviado" ? "filtro-btn activo" : "filtro-btn"}
          onClick={() => setFiltroEstado("enviado")}
        >Enviado</button>
        <button
          className={filtroEstado === "entregado" ? "filtro-btn activo" : "filtro-btn"}
          onClick={() => setFiltroEstado("entregado")}
        >Entregado</button>
        <button
          className={filtroEstado === "cancelado" ? "filtro-btn activo" : "filtro-btn"}
          onClick={() => setFiltroEstado("cancelado")}
        >Cancelado</button>
      </div>
      {pedidos.filter(p => filtroEstado === "todos" || p.estado === filtroEstado).length === 0 ? (
        <p>No hay pedidos aún.</p>
      ) : (
        <div className="table-container">
          {pedidos.filter(p => filtroEstado === "todos" || p.estado === filtroEstado).map((pedido) => (
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
              <p><strong>Estado:</strong> 
                <select
                  className="estado-select"
                  value={pedido.estado}
                  disabled={pedido.estado === "entregado"}
                  onChange={async (e) => {
                    const nuevoEstado = e.target.value;
                    // Actualiza en backend
                    await fetch(`http://localhost:3001/api/pedidos/${pedido.id}/estado`, {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ estado: nuevoEstado })
                    });
                    // Actualiza en frontend
                    setPedidos((prev) => prev.map((p) =>
                      p.id === pedido.id ? { ...p, estado: nuevoEstado } : p
                    ));
                  }}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="enviado">Enviado</option>
                  <option value="entregado">Entregado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pedidos;
