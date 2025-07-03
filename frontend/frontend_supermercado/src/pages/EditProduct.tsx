import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../pages/ProductsModern.css";
import { Producto } from '../types'


const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [notif, setNotif] = useState<{msg: string, type: "success"|"error"} | null>(null);

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

  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!producto) return;

    const { name, value } = e.target;

    setProducto({
      ...producto,
      [name]: value,
    });
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
      .then((res) => {
        if (res.ok) {
          setNotif({msg: "Producto editado con éxito", type: "success"});
          setTimeout(() => navigate("/productos"), 1500);
        } else {
          setNotif({msg: "Error al editar el producto", type: "error"});
        }
        setTimeout(() => setNotif(null), 2500);
        return res.json();
      })
      .catch(() => {
        setNotif({msg: "Error al editar el producto", type: "error"});
        setTimeout(() => setNotif(null), 2500);
      });
  };

  if (!producto) return <p>Cargando producto...</p>;
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-card">
        <h2>Editar Producto</h2>
        <input
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          placeholder="Nombre del producto"
          required
        />
        <textarea
          name="descripcion"
          value={producto.descripcion}
          onChange={handleChangeTextarea}
          placeholder="Descripción del producto"
          required
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
          <input
            name="precio"
            type="number"
            step="0.01"
            value={producto.precio}
            onChange={handleChange}
            placeholder="Precio"
            required
          />
          <input
            name="stock"
            type="number"
            value={producto.stock}
            onChange={handleChange}
            placeholder="Stock"
            required
          />
        </div>
        <input
          name="imagen_url"
          value={producto.imagen_url}
          onChange={handleChange}
          placeholder="URL de la imagen"
          required
        />
        <input
          name="id_categoria"
          type="number"
          value={producto.id_categoria}
          onChange={handleChange}
          placeholder="Categoría ID"
          required
        />
        <label className="label-checkbox">
          <input
            name="activo"
            type="checkbox"
            checked={producto.activo}
            onChange={handleChange}
          />
          Activo
        </label>
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
            Guardar Cambios
          </button>
        </div>
      </form>
      {notif && (
        <div className={`notif ${notif.type}`}>{notif.msg}</div>
      )}
    </div>
  );
};

export default EditProduct;
