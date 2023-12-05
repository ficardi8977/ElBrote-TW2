// comunicacion.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from '../models/productos.model';

@Injectable({
  providedIn: 'root',
})
export class ComunicacionService {
  private carritoSubject: BehaviorSubject<Producto[]> = new BehaviorSubject<
    Producto[]
  >([]);
  carrito$: Observable<Producto[]> = this.carritoSubject.asObservable();
  private cantidadEnCarritoSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  cantidadEnCarrito$: Observable<number> =
    this.cantidadEnCarritoSubject.asObservable();
  constructor() {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    this.carritoSubject.next(storedCart);
    this.actualizarCantidadEnCarrito(storedCart);
  }

  agregarAlCarrito(producto: Producto, quantity: number) {
    const carritoActual = this.carritoSubject.value;
    console.log(carritoActual);
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
      console.log('producto nuevo al carrito');
      // Actualizar localStorage
      localStorage.setItem('cart', JSON.stringify(carritoActual));
    }
    this.actualizarCantidadEnCarrito(carritoActual);
    this.carritoSubject.next([...carritoActual]);
  }

  eliminarDelCarrito(index: number): void {
    const carritoActual = this.carritoSubject.value.slice(); // Clona el array
    console.log(index);
    if (index !== -1 && index < carritoActual.length) {
      console.log('que onda');
      carritoActual.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(carritoActual));
      this.actualizarCantidadEnCarrito(carritoActual);
      this.carritoSubject.next([...carritoActual]);
    }
  }

  vaciarCarrito(): void {
    const carritoActual = this.carritoSubject.value;

    // Limpia el array del carrito
    carritoActual.length = 0;

    // Actualiza el localStorage y la cantidad en el carrito
    localStorage.setItem('cart', JSON.stringify(carritoActual));
    this.actualizarCantidadEnCarrito(carritoActual);
    this.carritoSubject.next([...carritoActual]);
    this.limpiarContador();
  }

  private actualizarCantidadEnCarrito(carrito: Producto[]): void {
    const cantidadTotal = carrito.length;
    this.cantidadEnCarritoSubject.next(cantidadTotal);
    console.log('cantidad total', cantidadTotal);
  }

  limpiarContador(): void {
    // Limpia el contador y actualiza el BehaviorSubject
    this.cantidadEnCarritoSubject.next(0);
  }

  actualizarProductoEnCarrito(producto: Producto) {
    const carritoActual = this.carritoSubject.value;
    console.log(producto._id);
    console.log(carritoActual);
    const productoExistenteIndex = carritoActual.findIndex(
      (p) => p._id === producto._id
    );

    console.log('esta afuera del metodo');
    console.log(productoExistenteIndex);
    if (productoExistenteIndex !== -1) {
      // Actualizar el producto existente en el carrito
      console.log('no entro al metodo');
      carritoActual[productoExistenteIndex] = {
        ...carritoActual[productoExistenteIndex],
        selectedQuantity: producto.selectedQuantity,
        totalForSelectedQuantity: producto.totalForSelectedQuantity,
      };

      // Actualizar localStorage
      localStorage.setItem('cart', JSON.stringify(carritoActual));

      // Actualizar el BehaviorSubject
      this.carritoSubject.next([...carritoActual]);

      // Actualizar la cantidad en el carrito
      this.actualizarCantidadEnCarrito(carritoActual);
    }
  }
}
