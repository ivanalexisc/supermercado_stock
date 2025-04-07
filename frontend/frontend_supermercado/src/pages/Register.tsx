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
      const res = await fetch("http://localhost:3001/auth/register", {
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
    <form onSubmit={handleRegister}>
      <h2>Registrarse</h2>
      <input
        name="nombre"
        type="text"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Correo"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        name="direccion"
        type="text"
        placeholder="Dirección"
        value={formData.direccion}
        onChange={handleChange}
      />
      <input
        name="telefono"
        type="text"
        placeholder="Teléfono"
        value={formData.telefono}
        onChange={handleChange}
      />
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Register;
