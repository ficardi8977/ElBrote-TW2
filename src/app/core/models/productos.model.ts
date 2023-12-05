export interface ProductoResponse {
  data: Producto;
  mensaje: string;
}
export interface Producto {
  _id: string;
  imageUrl: string;
  nombre: string;
  descripcion: string;
  clasificacion: number;
  precio: number;
  selectedQuantity?: number;
  totalForSelectedQuantity?: number;
}
