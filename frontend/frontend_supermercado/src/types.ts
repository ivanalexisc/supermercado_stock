export interface PedidoAPI {
    id: number;
    fecha_pedido: string;
    total: string;
    estado: string;
    id_usuario: number;
    Usuario?: {
      id: number;
      nombre: string;
    };
    DetallePedidos: {
      id_producto: number;
      cantidad: number;
      precio_unitario: string;
      Producto?: {
        nombre: string;
      };
    }[];
  }
  
  export interface Pedido {
    id: number;
    fecha_pedido: string;
    total: number;
    usuario: string;
    detalles: {
      id_producto: number;
      nombre: string;
      cantidad: number;
      precio_unitario: number;
    }[];
  }
  export interface Producto {
    id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  stock: number;
  id_categoria: number;
  imagen_url: string;
  activo: boolean;
  }
  