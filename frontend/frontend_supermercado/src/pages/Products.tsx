import { useEffect, useState } from "react";
import "./Products.css"; // si preferís separar los estilos

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

  useEffect(() => {
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
                  <button>Editar</button>
                  <button>Eliminar</button>
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
