import { useEffect, useState } from "react";

import "./ProductsModern.css";
import { useNavigate } from "react-router-dom";
import {Producto} from '../types'



interface ProductoConCategoria extends Producto {
  Categorium?: { id: number; nombre: string };
}

const Products = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todas");
  const [filtroActivo, setFiltroActivo] = useState<string>("todos");
  const [notif, setNotif] = useState<{msg: string, type: "success"|"error"} | null>(null);
  const navigate = useNavigate();
  const eliminarProducto = async (id: number) => {
    const confirmar = window.confirm("¿Estás seguro de que querés desactivar este producto?");
    if (!confirmar) return;
  
    try {
      const response = await fetch(`http://localhost:8080/api/productos/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setProductos(productos.filter((prod) => prod.id !== id));
        setNotif({msg: "Producto desactivado correctamente", type: "success"});
      } else {
        const errorData = await response.json();
        console.error("Error al desactivar:", errorData);
        setNotif({msg: "Error al desactivar el producto", type: "error"});
      }
    } catch (error) {
      console.error("Error en la solicitud DELETE:", error);
      setNotif({msg: "Ocurrió un error al desactivar el producto", type: "error"});
    }
    setTimeout(() => setNotif(null), 2500);
  };
  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (user) {
      const parsedUser = JSON.parse(user);
      setIsAdmin(parsedUser.es_admin === true);
    }

    fetch("http://localhost:8080/api/productos")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al traer productos:", err);
        setLoading(false);
      });
  }, []);
  
  
  // Filtrado de productos
  const productosFiltrados = (productos as ProductoConCategoria[]).filter((prod) => {
    const coincideBusqueda = prod.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = filtroCategoria === "todas" || String(prod.Categorium?.id) === filtroCategoria;
    const coincideActivo = filtroActivo === "todos" || (filtroActivo === "activos" ? prod.activo : !prod.activo);
    return coincideBusqueda && coincideCategoria && coincideActivo;
  });
  
  if (loading) return <p className="loading">Cargando productos...</p>;
  
  return (
    <div className="container">
      <h1>Listado de Productos</h1>

      {/* Filtros y búsqueda */}
      <div className="filtros-productos" style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 180 }}
        />
        <select value={filtroCategoria} onChange={e => setFiltroCategoria(e.target.value)} style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }}>
          <option value="todas">Todas las categorías</option>
          {[...new Map((productos as ProductoConCategoria[]).map(p => [p.Categorium?.id, p.Categorium?.nombre])).entries()].map(([id, nombre]) => (
            id && nombre ? <option key={id} value={id}>{nombre}</option> : null
          ))}
        </select>
        <select value={filtroActivo} onChange={e => setFiltroActivo(e.target.value)} style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }}>
          <option value="todos">Todos</option>
          <option value="activos">Solo activos</option>
          <option value="inactivos">Solo inactivos</option>
        </select>
      </div>
  
      {isAdmin && (
        <div style={{ marginBottom: "20px" }}>
          <button onClick={() => navigate("/crear-producto")}>
            ➕ Crear nuevo producto
          </button>
        </div>
      )}
  
      {/* Vista de tabla para desktop */}
      <div className="table-container desktop-only">
        <table className="productos-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Activo</th>
              {isAdmin && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((prod) => (
              <tr key={prod.id}>
                <td><img src={prod.imagen_url} alt={prod.nombre} style={{ width: "50px", height: "50px", objectFit: "cover" }} /></td>
                <td>{prod.nombre}</td>
                <td>{prod.descripcion}</td>
                <td>${parseFloat(prod.precio).toFixed(2)}</td>
                <td>{prod.stock}</td>
                <td>{(prod as ProductoConCategoria).Categorium?.nombre || prod.id_categoria}</td>
                <td>{prod.activo ? "✅" : "❌"}</td>
                {isAdmin && (
                  <td>
                    <button onClick={() => navigate(`/edit/${prod.id}`)}>Editar</button>
                    <button onClick={() => eliminarProducto(prod.id)}>Eliminar</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista de tarjetas para móvil */}
      <div className="card-grid mobile-only">
        {productosFiltrados.map((prod) => (
          <div key={prod.id} className="card">
            <img src={prod.imagen_url} alt={prod.nombre} />
            <div className="card-content">
              <h3>{prod.nombre}</h3>
              <p>{prod.descripcion}</p>
              <p><strong>Precio:</strong> ${parseFloat(prod.precio).toFixed(2)}</p>
              <p><strong>Stock:</strong> {prod.stock}</p>
              <p><strong>Categoría:</strong> {(prod as ProductoConCategoria).Categorium?.nombre || prod.id_categoria}</p>
              <p><strong>Estado:</strong> {prod.activo ? "✅ Activo" : "❌ Inactivo"}</p>
            </div>
            {isAdmin && (
              <div className="card-actions">
                <button onClick={() => navigate(`/edit/${prod.id}`)}>Editar</button>
                <button onClick={() => eliminarProducto(prod.id)}>Eliminar</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Notificación */}
      {notif && (
        <div className={`notif ${notif.type}`}>{notif.msg}</div>
      )}
    </div>
  );
  
  
};

export default Products;
