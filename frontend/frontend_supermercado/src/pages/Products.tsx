import { useEffect, useState } from "react";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import {Producto} from '../types'



const Products = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const eliminarProducto = async (id: number) => {
    const confirmar = window.confirm("¿Estás seguro de que querés desactivar este producto?");
    if (!confirmar) return;
  
    try {
      const response = await fetch(`http://localhost:3001/api/productos/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        // Filtramos el producto eliminado del estado
        setProductos(productos.filter((prod) => prod.id !== id));
      } else {
        const errorData = await response.json();
        console.error("Error al desactivar:", errorData);
        alert("Error al desactivar el producto");
      }
    } catch (error) {
      console.error("Error en la solicitud DELETE:", error);
      alert("Ocurrió un error al desactivar el producto");
    }
  };
  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (user) {
      const parsedUser = JSON.parse(user);
      setIsAdmin(parsedUser.es_admin === true);
    }

    fetch("http://localhost:3001/api/productos")
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
  
  
  if (loading) return <p className="loading">Cargando productos...</p>;
  
  return (
    <div className="container">
      <h1>Listado de Productos</h1>
  
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
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td><img src={prod.imagen_url} alt={prod.nombre} style={{ width: "50px", height: "50px", objectFit: "cover" }} /></td>
                <td>{prod.nombre}</td>
                <td>{prod.descripcion}</td>
                <td>${parseFloat(prod.precio).toFixed(2)}</td>
                <td>{prod.stock}</td>
                <td>{prod.id_categoria}</td>
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
        {productos.map((prod) => (
          <div key={prod.id} className="card">
            <img src={prod.imagen_url} alt={prod.nombre} />
            <div className="card-content">
              <h3>{prod.nombre}</h3>
              <p>{prod.descripcion}</p>
              <p><strong>Precio:</strong> ${parseFloat(prod.precio).toFixed(2)}</p>
              <p><strong>Stock:</strong> {prod.stock}</p>
              <p><strong>Categoría:</strong> {prod.id_categoria}</p>
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
    </div>
  );
  
  
};

export default Products;
