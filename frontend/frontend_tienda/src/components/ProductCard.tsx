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
        <button
          className="btn btn-primary mt-auto"
          onClick={() => onAddToCart(product)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
