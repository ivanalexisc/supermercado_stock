import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/ProductsModern.css";

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
  const [notif, setNotif] = useState<{msg: string, type: "success"|"error"} | null>(null);
  const [categorias, setCategorias] = useState<{id: number, nombre: string}[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/api/categorias")
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(() => setCategorias([]));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };
const token = localStorage.getItem('token');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/productos", {
        method: "POST",
        headers: {
           "Content-Type": "application/json",
           "Authorization": `Bearer ${token}` 
          },
        body: JSON.stringify(producto),
      });

      if (res.ok) {
        setNotif({msg: "Producto creado con éxito", type: "success"});
        setTimeout(() => navigate("/productos"), 1500);
      } else {
        const errorData = await res.json();
        setNotif({msg: "Error: " + (errorData.message || "No se pudo crear el producto"), type: "error"});
      }
    } catch (err) {
      setNotif({msg: "Error al crear el producto", type: "error"});
    }
    setTimeout(() => setNotif(null), 2500);
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-card">
        <h2>Crear Nuevo Producto</h2>
        <input
          name="nombre"
          placeholder="Nombre del producto"
          onChange={handleChange}
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción del producto"
          onChange={handleChangeTextarea}
          required
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
          <input
            name="precio"
            type="number"
            step="0.01"
            placeholder="Precio"
            onChange={handleChange}
            required
          />
          <input
            name="stock"
            type="number"
            placeholder="Stock"
            onChange={handleChange}
            required
          />
        </div>
        <input
          name="imagen_url"
          placeholder="URL de la imagen"
          onChange={handleChange}
          required
        />
        <select
          name="id_categoria"
          value={producto.id_categoria}
          onChange={handleChange}
          required
        >
          {categorias.length === 0 && <option value="">Cargando categorías...</option>}
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
          ))}
        </select>
        <div style={{ display: "flex", gap: "15px" }}>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate("/productos")}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            Crear Producto
          </button>
        </div>
      </form>
      {notif && (
        <div className={`notif ${notif.type}`}>{notif.msg}</div>
      )}
    </div>
  );
};

export default CreateProduct;
