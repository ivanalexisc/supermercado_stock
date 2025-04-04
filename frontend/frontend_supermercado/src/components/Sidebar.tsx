import { NavLink } from "react-router-dom";
import {
  Home,
  Boxes,
  Settings,
  Menu,
} from "lucide-react";
import { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
        <Menu size={28} />
      </button>

      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <h2>Mi Panel</h2>
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
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
