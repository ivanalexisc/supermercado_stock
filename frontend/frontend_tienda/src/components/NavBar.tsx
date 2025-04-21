import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./NavBar.css";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const searchRef = useRef<HTMLFormElement | null>(null);

  const navigate = useNavigate();
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim() !== "") {
      navigate(`/buscar?query=${encodeURIComponent(searchText.trim())}`);
    }
    setShowSearch(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showSearch &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearch]);

  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <nav className="navbar navbar-expand-lg px-4">
      <div className="container d-flex flex-column align-items-center">
        <Link className="navbar-brand text-center mb-2" to="/Home">
          <strong>
            Mi<span>Tienda</span>
          </strong>
        </Link>

        <div className="d-flex justify-content-center align-items-center flex-wrap">
          <ul className="navbar-nav d-flex flex-row align-items-center">
            <li className="nav-item mx-3">
              <Link className="nav-link" to="/Home">
                Inicio
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link" to="/products">
                Productos
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link" to="/ofertas">
                Ofertas
              </Link>
            </li>
            <li className="nav-item mx-2">
              <button className="btn nav-link" onClick={toggleSearch}>
                <FaSearch size={18} />
              </button>
            </li>
            <li className="nav-item mx-2 position-relative">
              <button
                className="btn nav-link position-relative"
                data-bs-toggle="offcanvas"
                data-bs-target="#cartSidebar"
                type="button"
              >
                <FaShoppingCart size={18} />
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItems}
                  </span>
                )}
              </button>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/perfil">
                <FaUser />
              </Link>
            </li>
          </ul>
        </div>

        {showSearch && (
          <form
            onSubmit={handleSearchSubmit}
            className="floating-search-box"
            ref={searchRef}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Buscar productos..."
              autoFocus
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
