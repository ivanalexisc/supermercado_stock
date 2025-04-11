import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

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
  const { addToCart } = useCart();

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

  if (loading) return <p className="loading">Cargando productos...</p>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">🛍️ Productos disponibles</h1>
      <div className="row g-4">
        {productos.map((prod) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={prod.id}>
            <ProductCard product={prod} onAddToCart={addToCart} />
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default Products;
