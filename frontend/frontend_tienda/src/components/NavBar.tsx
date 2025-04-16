import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./NavBar.css";
function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img
          src="/logo.png"
          alt="Logo"
          width="40"
          height="40"
          className="me-2"
        />
        <strong>MiTienda</strong>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarContent">
        {/* Links principales */}
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
          <li className="nav-item mx-2">
            <Link className="nav-link" to="/Home">
              Inicio
            </Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link" to="/products">
              Productos
            </Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link" to="/ofertas">
              Ofertas
            </Link>
          </li>
        </ul>

        {/* Barra de búsqueda */}
        <form className="d-flex mx-lg-3 my-3 my-lg-0" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Buscar"
            aria-label="Buscar"
          />
          <button className="btn btn-outline-light" type="submit">
            Buscar
          </button>
        </form>

        {/* Carrito y perfil */}
        <ul className="navbar-nav mb-2 mb-lg-0 align-items-lg-center">
          <li className="nav-item mx-2">
            <button
              className="btn nav-link position-relative"
              data-bs-toggle="offcanvas"
              data-bs-target="#cartSidebar"
              type="button"
            >
              🛒 Carrito
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                </span>
              )}
            </button>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link" to="/perfil">
              👤 Perfil
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
