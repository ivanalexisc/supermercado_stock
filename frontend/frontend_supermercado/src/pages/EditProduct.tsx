import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditProduct.css";
import { Producto } from '../types'


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
      .then((res) => res.json())
      .then(() => navigate("/productos"))
      .catch((err) => console.error("Error al editar el producto:", err));
  };

  if (!producto) return <p>Cargando producto...</p>;
  console.log(producto);
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f1f5f9",
      padding: "20px"
    }}>
      <form onSubmit={handleSubmit} style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "40px 30px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "500px",
      }}>
        <h2 style={{
          textAlign: "center",
          color: "#0d6efd",
          marginBottom: "30px",
          fontSize: "24px",
          fontWeight: "600"
        }}>
          Editar Producto
        </h2>
        <input
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          placeholder="Nombre del producto"
          required
          style={{
            padding: "12px 16px",
            border: "none",
            borderRadius: "10px",
            marginBottom: "15px",
            background: "#f2f2f2",
            fontSize: "14px",
          }}
        />
        <textarea
          name="descripcion"
          value={producto.descripcion}
          onChange={handleChangeTextarea}
          placeholder="Descripción del producto"
          required
          style={{
            padding: "12px 16px",
            border: "none",
            borderRadius: "10px",
            marginBottom: "15px",
            background: "#f2f2f2",
            fontSize: "14px",
            minHeight: "100px",
            resize: "vertical",
            fontFamily: "inherit"
          }}
        />
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
          marginBottom: "15px"
        }}>
          <input
            name="precio"
            type="number"
            step="0.01"
            value={producto.precio}
            onChange={handleChange}
            placeholder="Precio"
            required
            style={{
              padding: "12px 16px",
              border: "none",
              borderRadius: "10px",
              background: "#f2f2f2",
              fontSize: "14px",
            }}
          />
          <input
            name="stock"
            type="number"
            value={producto.stock}
            onChange={handleChange}
            placeholder="Stock"
            required
            style={{
              padding: "12px 16px",
              border: "none",
              borderRadius: "10px",
              background: "#f2f2f2",
              fontSize: "14px",
            }}
          />
        </div>
        <input
          name="imagen_url"
          value={producto.imagen_url}
          onChange={handleChange}
          placeholder="URL de la imagen"
          required
          style={{
            padding: "12px 16px",
            border: "none",
            borderRadius: "10px",
            marginBottom: "15px",
            background: "#f2f2f2",
            fontSize: "14px",
          }}
        />
        <input
          name="id_categoria"
          type="number"
          value={producto.id_categoria}
          onChange={handleChange}
          placeholder="Categoría ID"
          required
          style={{
            padding: "12px 16px",
            border: "none",
            borderRadius: "10px",
            marginBottom: "15px",
            background: "#f2f2f2",
            fontSize: "14px",
          }}
        />
        <label style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "25px",
          fontSize: "15px",
          color: "#0d6efd",
          fontWeight: 500
        }}>
          <input
            name="activo"
            type="checkbox"
            checked={producto.activo}
            onChange={handleChange}
            style={{
              width: "18px",
              height: "18px",
              accentColor: "#0d6efd"
            }}
          />
          Activo
        </label>
        <div style={{ display: "flex", gap: "15px" }}>
          <button
            type="button"
            onClick={() => navigate("/productos")}
            style={{
              padding: "12px",
              border: "1px solid #0d6efd",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "15px",
              flex: 1,
              background: "#fff",
              color: "#0d6efd",
              transition: "all 0.3s ease"
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            style={{
              background: "linear-gradient(to right, #0d6efd, #0dcaf0)",
              color: "#fff",
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "15px",
              flex: 1,
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease"
            }}
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
