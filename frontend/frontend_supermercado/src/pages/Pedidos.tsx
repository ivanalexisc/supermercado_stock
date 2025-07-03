// src/pages/Pedidos.tsx
import { useEffect, useState } from "react";
import { Pedido, PedidoAPI } from "../types";
import "./Pedidos.css";
import "./PedidosExtra.css";



const estadoLabels: Record<string, string> = {
  pendiente: "Pendiente",
  enviado: "Enviado",
  entregado: "Entregado",
  cancelado: "Cancelado"
};

const estadoBadgeClass: Record<string, string> = {
  pendiente: "badge-estado badge-pendiente",
  enviado: "badge-estado badge-enviado",
  entregado: "badge-estado badge-entregado",
  cancelado: "badge-estado badge-cancelado"
};

const Pedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<string>("todos");
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState<null | (() => void)>(null);
  const [notif, setNotif] = useState<{msg: string, type: "success"|"error"} | null>(null);

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

  // Función para cambiar estado con notificación y recarga
  const handleEstadoChange = async (id: number, nuevoEstado: string) => {
    try {
      await fetch(`http://localhost:3001/api/pedidos/${id}/estado`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado })
      });
      setNotif({msg: `Estado actualizado a "${estadoLabels[nuevoEstado] || nuevoEstado}"`, type: "success"});
      // Refresca la lista desde la base de datos
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
    } catch (err) {
      setNotif({msg: "Error al actualizar el estado", type: "error"});
    }
    setTimeout(() => setNotif(null), 2500);
  };

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
                <span className={estadoBadgeClass[pedido.estado] || "badge-estado"}>
                  {estadoLabels[pedido.estado] || pedido.estado}
                </span>
                {!(pedido.estado === "entregado" || pedido.estado === "cancelado") && (
                  <select
                    className="estado-select"
                    value={pedido.estado}
                    onChange={async (e) => {
                      const nuevoEstado = e.target.value;
                      // Confirmación para entregado/cancelado
                      if (["entregado", "cancelado"].includes(nuevoEstado)) {
                        setShowConfirm(true);
                        setConfirmAction(() => async () => {
                          setShowConfirm(false);
                          await handleEstadoChange(pedido.id, nuevoEstado);
                        });
                        return;
                      }
                      await handleEstadoChange(pedido.id, nuevoEstado);
                    }}
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="enviado">Enviado</option>
                    <option value="entregado">Entregado</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                )}
              </p>
            </div>
          ))}
        </div>
      )}
      {/* Modal de confirmación para entregado/cancelado */}
      {showConfirm && (
        <div className="confirm-modal-bg">
          <div className="confirm-modal">
            <p>¿Estás seguro que deseas cambiar el estado?<br />Esta acción no se puede deshacer.</p>
            <button className="btn-confirm" onClick={() => { confirmAction && confirmAction(); }}>Confirmar</button>
            <button className="btn-cancel" onClick={() => setShowConfirm(false)}>Cancelar</button>
          </div>
        </div>
      )}
      {/* Notificación */}
      {notif && (
        <div className={`notif ${notif.type}`}>{notif.msg}</div>
      )}
    </div>
  );
};

export default Pedidos;
