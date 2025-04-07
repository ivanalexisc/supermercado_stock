import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Boxes,
  Settings,
  Menu,
  LogOut,
  User
} from "lucide-react";
import { useState, useEffect} from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [usuario, setUsuario] = useState<{ nombre: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <>
      <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
        <Menu size={28} />
      </button>

      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <h2>Mi Panel</h2>

        {/* Info del usuario */}
        {usuario && (
          <div className="usuario-info">
            <User size={18} />
            <span>{usuario.nombre}</span>
          </div>
        )}

        <nav>
          <ul>
            <li>
              <NavLink to="/" end>
                <Home size={20} />
                <span>Inicio</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/productos">
                <Boxes size={20} />
                <span>Productos</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/configuracion">
                <Settings size={20} />
                <span>Configuración</span>
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                <LogOut size={20} />
                <span>Cerrar sesión</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
