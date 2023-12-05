import { Injectable } from '@angular/core';
import { Producto, ProductoResponse } from '../models/productos.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private apiUrl = `${environment.apiUrl}/producto`;
  private producto$ = new BehaviorSubject<any>(null);

  private apiKey = 'ee69ec09541f18c13a083290f3265692';
  private apiImgbb = 'https://api.imgbb.com/1/upload';

  private carritoSubject: BehaviorSubject<Producto[]> = new BehaviorSubject<
    Producto[]
  >([]);
  carrito$: Observable<Producto[]> = this.carritoSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.carritoSubject.next(JSON.parse(storedCart));
    }
  }

  traerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  guardarProducto(producto: Producto): Observable<ProductoResponse> {
    return this.http.post<ProductoResponse>(this.apiUrl, producto);
  }

  eliminarProducto(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  añadirProductoEditar(producto: Producto) {
    this.producto$.next(producto);
  }
  getProducto(): Observable<Producto> {
    return this.producto$.asObservable();
  }
  editarProducto(id: string, producto: Producto): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, producto);
  }
  restablecerProducto() {
    this.producto$.next(null);
  }
  getProductoId(id: string): Observable<Producto> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Producto>(url);
  }

  uploadImage(imageFile: File) {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('key', this.apiKey);

    return this.http.post(this.apiImgbb, formData);
  }

  agregarAlCarrito(producto: Producto, quantity: number) {
    const carritoActual = this.carritoSubject.value;
    const productoExistente = carritoActual.find((p) => p._id === producto._id);

    if (productoExistente) {
      productoExistente.selectedQuantity += quantity;
      productoExistente.totalForSelectedQuantity += producto.precio * quantity;
    } else {
      const nuevoProducto = {
        ...producto,
        selectedQuantity: quantity,
        totalForSelectedQuantity: producto.precio * quantity,
      };
      carritoActual.push(nuevoProducto);
      // linea que deje preparada para usar el local storage con el carrito
      localStorage.setItem('cart', JSON.stringify(carritoActual));
      ///
      // Actualizar localStorage
      localStorage.setItem('cart', JSON.stringify(carritoActual));
    }

    this.carritoSubject.next([...carritoActual]);
  }

  calcularProductosEnCarro() {
    return JSON.parse(localStorage.getItem('cart')).length;
  }
}
