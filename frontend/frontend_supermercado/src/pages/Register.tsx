import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    direccion: "",
    telefono: ""
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registro exitoso");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error en registro:", error);
    }
  };

  return (
     <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f1f5f9",
    }}>
    <form onSubmit={handleRegister} style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "40px 30px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        width: "320px",
      }}>
      <h2 style={{ textAlign: "center", color: "#0d6efd", marginBottom: "30px" }}>
          Registrarse
        </h2>
      <input
        name="nombre"
        type="text"
        placeholder="Nombre"
        value={formData.nombre}
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
      <input
        name="email"
        type="email"
        placeholder="Correo"
        value={formData.email}
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
      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        value={formData.password}
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
      <input
        name="direccion"
        type="text"
        placeholder="Dirección"
        value={formData.direccion}
        onChange={handleChange}
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
        name="telefono"
        type="text"
        placeholder="Teléfono"
        value={formData.telefono}
        onChange={handleChange}
        style={{
            padding: "12px 16px",
            border: "none",
            borderRadius: "10px",
            marginBottom: "15px",
            background: "#f2f2f2",
            fontSize: "14px",
          }}
      />
      <button type="submit" style={{
          background: "linear-gradient(to right, #0d6efd, #0dcaf0)",
          color: "#fff",
          padding: "12px",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "15px",
          marginBottom: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}>Registrarse</button>
    </form>
    </div>
  );
};

export default Register;
