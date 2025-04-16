import { useCart } from "../context/CartContext";
const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => {
    const precio = Number(item.precio);
    const cantidad = Number(item.cantidad) || 1;
    return sum + precio * cantidad;
  }, 0);

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex={-1}
      id="cartSidebar"
      aria-labelledby="cartSidebarLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="cartSidebarLabel">
          🛒 Carrito de compras
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body d-flex flex-column">
        {cart.length === 0 ? (
          <div className="alert alert-info">El carrito está vacío.</div>
        ) : (
          <>
            <ul className="list-group mb-3">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h6 className="my-0">{item.nombre}</h6>
                    <small className="text-muted">
                      ${Number(item.precio).toFixed(2)} x {item.cantidad}
                    </small>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>

            <h5 className="mt-auto">
              Total: <span className="text-success">${total.toFixed(2)}</span>
            </h5>

            <div className="mt-3 d-grid gap-2">
              <button className="btn btn-primary">Finalizar compra</button>
              <button className="btn btn-secondary" onClick={clearCart}>
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
