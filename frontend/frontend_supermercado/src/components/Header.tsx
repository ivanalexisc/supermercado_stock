import { Bell, User, ChevronDown } from "lucide-react";
import { useState } from "react";
import "./Header.css";

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [usuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "/login";
  };

  return (
    <header className="main-header">
      <div className="header-left">
        <h1>Sistema De Gestión</h1>
      </div>
      <div className="header-right">
        <button className="icon-button">
          <Bell size={20} />
        </button>
        <div className="user-menu-container">
          <button 
            className="user-button" 
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <User size={20} />
            {usuario?.nombre}
            <ChevronDown size={16} />
          </button>
          {isUserMenuOpen && (
            <div className="user-menu">
              <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;