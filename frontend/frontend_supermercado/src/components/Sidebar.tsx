import { NavLink } from "react-router-dom";
import { Home, Boxes, Settings, Menu, User } from "lucide-react";
import { useState, useEffect } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [usuario, setUsuario] = useState<{ nombre: string } | null>(null);
  

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="desktop-only">
        <h2 className="titulo-sidebar">Mi Panel</h2>
        {usuario && (
          <div className="usuario-info">
            <User size={20} />
            <span>Bienvenido {usuario.nombre}</span>
          </div>
        )}
      </div>

      <nav>
        <ul>
          <li>
            <NavLink to="/" end>
              <Home size={24} />
              <span>Inicio</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/productos">
              <Boxes size={24} />
              <span>Productos</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/configuracion">
              <Settings size={24} />
              <span>Configuración</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/ventas/cargar">
              <Boxes size={24} />
              <span>Ventas</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/pedidos">
              <Boxes size={24} />
              <span>Pedidos</span>
            </NavLink>
          </li>
          
          <li className="desktop-only">
            <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
              <Menu size={28} />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
