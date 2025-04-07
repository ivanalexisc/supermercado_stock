import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: 0,
    id_categoria: 1,
    imagen_url: "",
    activo: true
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });

      if (res.ok) {
        alert("Producto creado con éxito");
        navigate("/productos");
      } else {
        const errorData = await res.json();
        alert("Error: " + errorData.message);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error al crear el producto");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Producto</h2>
      <input name="nombre" placeholder="Nombre" onChange={handleChange} />
      <input name="descripcion" placeholder="Descripción" onChange={handleChange} />
      <input name="precio" placeholder="Precio" onChange={handleChange} />
      <input name="stock" type="number" placeholder="Stock" onChange={handleChange} />
      <input name="imagen_url" placeholder="URL de imagen" onChange={handleChange} />
      <button type="submit">Crear</button>
    </form>
  );
};

export default CreateProduct;
