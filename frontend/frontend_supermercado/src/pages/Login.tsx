import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        console.log(data);
        navigate("/home");
      } else {
        alert(data.message || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en login:", error);
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
      <form onSubmit={handleLogin} style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "40px 30px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        width: "320px",
      }}>
        <h2 style={{ textAlign: "center", color: "#0d6efd", marginBottom: "30px" }}>
          Ingresar
        </h2>

        <input
          type="email"
          placeholder="Ingrese su E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          type="password"
          placeholder="Ingrese su Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <span style={{ fontSize: "13px" }}>¿No tienes cuenta? </span>
  <a
    href="/register"
    style={{
      color: "#0d6efd",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "13px",
    }}
  >
    Regístrate
  </a>

        <a href="#" style={{
          fontSize: "12px",
          textAlign: "right",
          marginBottom: "20px",
          color: "#0d6efd",
          textDecoration: "none",
        }}>
          Olvidó su contraseña?
        </a>
        

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
        }}>
          Ingresar
        </button>

        
      </form>
    </div>
  );
};



export default Login;
