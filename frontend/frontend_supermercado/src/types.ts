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
  