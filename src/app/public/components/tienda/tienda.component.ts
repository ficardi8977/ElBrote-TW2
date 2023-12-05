import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/core/models/productos.model';
import { ProductosService  } from 'src/app/core/service/productos.service';
import { ComunicacionService } from '../../../core/comunications/communication.service';
@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
})
export class TiendaComponent implements OnInit {
  products: Producto[] = [];

  constructor(private productosService: ProductosService, private comunicacionService: ComunicacionService) {}
  ngOnInit(): void {
    this.inicializarProductos();
  }

  private inicializarProductos() {
    this.productosService.traerProductos().subscribe((datos) => {
      this.products = datos;
    });
  }

  agregarAlCarrito(producto: Producto, quantity: number): void {
    const productoACarrito = { ...producto };
    this.comunicacionService.agregarAlCarrito(producto, quantity);// enviar quantity al servicio
  }
}
