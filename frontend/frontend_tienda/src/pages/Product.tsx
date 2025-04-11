import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";


type Product = {
  id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    imagen_url: string;
};

const Products = () => {
  const [productos, setProductos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  type CartItem = Product & { cantidad: number };
  const [cart, setCart] = useState<CartItem[]>([]);
 
  useEffect(() => {
    fetch("http://localhost:3001/api/productos")
      .then((res) => res.json())
      .then((data) => {
        // Solo productos activos
        const activos = data.filter((prod: any) => prod.activo);
        setProductos(activos);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al traer productos:", err);
        setLoading(false);
      });
  }, []);
  
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (producto: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === producto.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...producto, cantidad: 1 }];
      }
    });
  };
  

  const handleRemoveFromCart = (id: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };
  

  const handleClearCart = () => {
    setCart([]);
  };
  if (loading) return <p className="loading">Cargando productos...</p>;

  return (
    
    <div className="container mt-4">
    <button
  className="btn btn-outline-dark position-fixed top-0 end-0 m-4 z-3"
  data-bs-toggle="offcanvas"
  data-bs-target="#cartSidebar"
>
🛒 Ver carrito ({cart.reduce((sum, item) => sum + item.cantidad, 0)})
</button>
    <h1 className="mb-4 text-center">🛍️ Productos disponibles</h1>
    <div className="row g-4">
      {productos.map((prod) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={prod.id}>
          <ProductCard product={prod} onAddToCart={handleAddToCart} />
        </div>
      ))}
    </div>
    <hr />
    <Cart
        cartItems={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />
  </div>
  );
};

export default Products;
