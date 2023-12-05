import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/core/models/productos.model';
import { ProductosService } from 'src/app/core/service/productos.service';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { Router } from '@angular/router';
import { ComunicacionService } from '../../../core/comunications/communication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  mostrarMensajeExito = false;
  mostrarMensajeCancelacion = false;
  mensajeExito = '';
  mensajeCancelacion = '';

  products: Producto[];
  constructor(
    private productosService: ProductosService,
    protected router: Router,
    protected authenticationService: AuthenticationService,
    private comunicacionService: ComunicacionService
  ) {}

  ngOnInit(): void {
    // obtener los productos del servidor node
    this.productosService.traerProductos().subscribe((datos) => {
      this.products = datos;
    });
  }

  updateTotal(product: Producto, quantity: number): void {
    product.selectedQuantity = quantity;
    product.totalForSelectedQuantity = product.precio * quantity;
  }

  agregarAlCarrito(producto: Producto, quantity: number): void {
    // Llamar al método del servicio para agregar al carrito
    this.comunicacionService.agregarAlCarrito(producto, quantity);
  }
}
