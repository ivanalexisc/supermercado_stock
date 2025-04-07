import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditProduct.css";
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

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState<Producto | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/productos/${id}`)
      .then((res) => res.json())
      .then((data) => setProducto(data))
      .catch((err) => console.error("Error al obtener el producto:", err));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!producto) return;

    const { name, value, type } = e.target;

    if (type === "checkbox" && "checked" in e.target) {
      const checked = (e.target as HTMLInputElement).checked;
      setProducto({
        ...producto,
        [name]: checked,
      });
    } else {
      setProducto({
        ...producto,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!producto) return;

    fetch(`http://localhost:3001/api/productos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    })
      .then((res) => res.json())
      .then(() => navigate("/products"))
      .catch((err) => console.error("Error al editar el producto:", err));
  };

  if (!producto) return <p>Cargando producto...</p>;
  console.log(producto);
  return (
    
    <div className="edit-form">
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" value={producto.nombre} onChange={handleChange} placeholder="Nombre" />
        <input name="descripcion" value={producto.descripcion} onChange={handleChange} placeholder="Descripción" />
        <input name="precio" value={producto.precio} onChange={handleChange} placeholder="Precio" />
        <input name="stock" type="number" value={producto.stock} onChange={handleChange} placeholder="Stock" />
        <input name="imagen_url" value={producto.imagen_url} onChange={handleChange} placeholder="URL de imagen" />
        <input name="id_categoria" type="number" value={producto.id_categoria} onChange={handleChange} placeholder="Categoría ID" />
        <label>
          Activo:
          <input name="activo" type="checkbox" checked={producto.activo} onChange={handleChange} />
        </label>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
    
  );
};

export default EditProduct;
