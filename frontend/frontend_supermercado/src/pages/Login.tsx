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
          Sign In
        </h2>

        <input
          type="email"
          placeholder="E-mail"
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
          placeholder="Password"
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

        <a href="#" style={{
          fontSize: "12px",
          textAlign: "right",
          marginBottom: "20px",
          color: "#0d6efd",
          textDecoration: "none",
        }}>
          Forgot Password?
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
          Sign In
        </button>

        <p style={{ textAlign: "center", fontSize: "12px", marginBottom: "10px" }}>
          Or Sign in with
        </p>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginBottom: "20px",
        }}>
          <button style={socialButtonStyle}>G</button>
          <button style={socialButtonStyle}></button>
          <button style={socialButtonStyle}>X</button>
        </div>

        <p style={{ fontSize: "10px", textAlign: "center", color: "#0d6efd" }}>
          Learn user licence agreement
        </p>
      </form>
    </div>
  );
};

const socialButtonStyle = {
  background: "#fff",
  border: "none",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  borderRadius: "50%",
  width: "35px",
  height: "35px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};

export default Login;
