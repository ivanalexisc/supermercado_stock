// src/pages/Buscar.tsx
import { useLocation,useNavigate  } from 'react-router-dom';
import { useMemo, useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}
export type Product = {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    imagen_url: string;
  };
  
const Buscar = () => {
  const query = useQuery();
  const termino = query.get('query') || '';
  const [productos, setProductos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3001/api/productos")
      .then((res) => res.json())
      .then((data) => {
        const activos = data.filter((prod: any) => prod.activo);
        const filtrados = activos.filter((producto: Product) =>
          producto.nombre.toLowerCase().includes(termino.toLowerCase())
        );
        if (filtrados.length === 1) {
            navigate(`/producto/${filtrados[0].id}`);
            console.log("Filtrados:", filtrados);

          } else {
            setProductos(filtrados);
        };
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al buscar productos:", err);
        setLoading(false);
      });
  },  [termino, navigate]);
  if (loading) return <p className="loading">Buscando productos...</p>;

  return (
    <div className="container mt-4">    
      <h2>Resultados para: <em>{termino}</em></h2>
      {productos.length === 0 ? (
        <p>No se encontraron productos.</p>
      ) : (
        <div className="row g-4 mt-3">
          {productos.map((producto) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={producto.id}>
              <ProductCard product={producto} onAddToCart={addToCart} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Buscar;
