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
          Crear Nuevo Producto
        </h2>

        <input
          name="nombre"
          placeholder="Nombre del producto"
          onChange={handleChange}
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
          placeholder="Descripción del producto"
          onChange={handleChange}
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
            placeholder="Precio"
            onChange={handleChange}
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
            placeholder="Stock"
            onChange={handleChange}
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
          placeholder="URL de la imagen"
          onChange={handleChange}
          required
          style={{
            padding: "12px 16px",
            border: "none",
            borderRadius: "10px",
            marginBottom: "25px",
            background: "#f2f2f2",
            fontSize: "14px",
          }}
        />

        <div style={{
          display: "flex",
          gap: "15px"
        }}>
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
            Crear Producto
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
