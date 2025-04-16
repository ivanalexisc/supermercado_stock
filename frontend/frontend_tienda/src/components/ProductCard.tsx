import { Link } from "react-router-dom";
type Product = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen_url: string;
};

type Props = {
  product: Product;
  onAddToCart: (producto: Product) => void;
};

const ProductCard = ({ product, onAddToCart }: Props) => {
  return (
    <div className="card h-100">
      <Link to={`/producto/${product.id}`} className="text-decoration-none text-dark">
      <img
        src={product.imagen_url}
        className="card-img-top"
        alt={product.nombre}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.nombre}</h5>
        <p className="card-text">{product.descripcion}</p>
        <p className="card-text fw-bold text-success">
          ${Number(product.precio).toFixed(2)}
        </p>
        </div>
        </Link>
        <button
          className="btn btn-primary mt-auto"
          onClick={() => onAddToCart(product)}
        >
          Agregar al carrito
        </button>
      </div>
  );
};

export default ProductCard;
