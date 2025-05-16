import { NavLink, useNavigate } from "react-router-dom";
import { Home, Boxes, Settings, Menu, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
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
      

      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <h2 className="titulo-sidebar">Mi Panel</h2>
      

        {/* Info del usuario */}
      

        <nav>
          <ul>
          <li>
              {/* Info del usuario */}
        {usuario && (
          <div className="usuario-info">
            <User size={20} />
            <span>Bienvenido {usuario.nombre}</span>
          </div>
        )}
            </li>
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
              <NavLink to="/ventas/cargar">
                <Boxes size={20} />
                <span>Cargar Venta</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/pedidos">
                <Boxes size={20} />
                <span>Pedidos</span>
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                <LogOut size={20} />
                <span>Cerrar sesión</span>
              </button>
            </li>
            <li>
            <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
        <Menu size={28} />
      </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
