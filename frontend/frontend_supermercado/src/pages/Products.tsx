import { useEffect, useState } from "react";
import "./Products.css"; // si preferís separar los estilos
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
      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td>
                  <img src={prod.imagen_url} alt={prod.nombre} className="product-img" />
                </td>
                <td>{prod.nombre}</td>
                <td>{prod.descripcion}</td>
                <td>${parseFloat(prod.precio).toFixed(2)}</td>
                <td>{prod.stock}</td>
                <td>{prod.id_categoria}</td>
                <td>{prod.activo ? "✅" : "❌"}</td>
                <td>
  {isAdmin && (
    <>
      <button onClick={() => navigate(`/edit/${prod.id}`)}>Editar</button>
      <button onClick={() => eliminarProducto(prod.id)}>Eliminar</button>
    </>
  )}
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
