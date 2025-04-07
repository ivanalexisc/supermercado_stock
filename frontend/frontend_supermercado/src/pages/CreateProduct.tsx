import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateProduct.css"; // para estilos si querés

type Producto = {
  nombre: string;
  descripcion: string;
  precio: string;
  stock: number;
  id_categoria: number;
  imagen_url: string;
  activo: boolean;
};

const CreateProduct = () => {
  const [producto, setProducto] = useState<Producto>({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: 0,
    id_categoria: 1,
    imagen_url: "",
    activo: true,
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setProducto({
      ...producto,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    })
      .then((res) => res.json())
      .then(() => navigate("/products"))
      .catch((err) => console.error("Error al crear producto:", err));
  };

  return (
    <div className="create-form">
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" value={producto.nombre} onChange={handleChange} />
        <input name="descripcion" placeholder="Descripción" value={producto.descripcion} onChange={handleChange} />
        <input name="precio" placeholder="Precio" value={producto.precio} onChange={handleChange} />
        <input name="stock" type="number" placeholder="Stock" value={producto.stock} onChange={handleChange} />
        <input name="id_categoria" type="number" placeholder="ID Categoría" value={producto.id_categoria} onChange={handleChange} />
        <input name="imagen_url" placeholder="URL Imagen" value={producto.imagen_url} onChange={handleChange} />
        <label>
          Activo:
          <input type="checkbox" name="activo" checked={producto.activo} onChange={handleChange} />
        </label>
        <button type="submit">Guardar Producto</button>
      </form>
    </div>
  );
};

export default CreateProduct;