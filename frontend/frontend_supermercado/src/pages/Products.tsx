import { useEffect, useState } from "react";
import "./Products.css";
import { useNavigate } from "react-router-dom";

type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  stock: number;
  id_categoria: number;
  imagen_url: string;
  activo: boolean;
};

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
    <div className="products-container">
      <h1>Listado de Productos</h1>
  
      {isAdmin && (
        <div style={{ marginBottom: "20px" }}>
          <button onClick={() => navigate("/crear-producto")}>
            ➕ Crear nuevo producto
          </button>
        </div>
      )}
  
      {/* Tabla para desktop */}
            <div className="table-wrapper">
            <div className="table-wrapper">
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
      </div>
  
      {/* Tarjetas para mobile */}
      <div className="cards-wrapper">
        {productos.map((prod) => (
  <div key={prod.id} className="product-card">
            <img src={prod.imagen_url} alt={prod.nombre} className="product-img" />
            <div className="card-info">
              <p><strong>Nombre:</strong> {prod.nombre}</p>
              <p><strong>Descripción:</strong> {prod.descripcion}</p>
              <p><strong>Precio:</strong> ${parseFloat(prod.precio).toFixed(2)}</p>
              <p><strong>Stock:</strong> {prod.stock}</p>
              <p><strong>Categoría:</strong> {prod.id_categoria}</p>
              <p><strong>Activo:</strong> {prod.activo ? "✅" : "❌"}</p>
              {isAdmin && (
                <div className="card-actions">
                  <button className="confirm-button" onClick={() => navigate(`/edit/${prod.id}`)}>Editar</button>
                  <button className="eliminar-button" onClick={() => eliminarProducto(prod.id)}>Eliminar</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  
};

export default Products;
