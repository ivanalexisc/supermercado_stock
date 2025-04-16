
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
export type Product = {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    imagen_url: string;
  };
  

const Producto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:3001/api/productos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.activo) {
          setProducto(data);
        } else {
          setProducto(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar producto:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading">Cargando producto...</p>;

  return (
    <div className="container mt-4">
      {producto ? (
        <div className="d-flex justify-content-center">
          <div style={{ maxWidth: '400px', width: '100%' }}>
            <ProductCard product={producto} onAddToCart={addToCart} />
          </div>
        </div>
      ) : (
        <p>No se encontró el producto.</p>
      )}
    </div>
  );
};

export default Producto;
