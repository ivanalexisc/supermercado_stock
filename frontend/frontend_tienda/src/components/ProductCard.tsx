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
    onAddToCart: (product: Product) => void;
  };
  
  const ProductCard = ({ product, onAddToCart }: Props) => {
    return (
      <div className="card h-100 shadow-sm">
      <img
        src={product.imagen_url}
        alt={product.nombre}
        className="card-img-top"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.nombre}</h5>
        <p className="card-text text-truncate">{product.descripcion}</p>
        <p className="text-success fw-semibold">${Number(product.precio).toFixed(2)}</p>
        <button
          className="btn btn-success mt-auto"
          onClick={() => onAddToCart(product)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
    );
  };
  
  export default ProductCard;