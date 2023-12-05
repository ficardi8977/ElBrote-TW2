import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/core/models/productos.model';
import { ProductosService } from 'src/app/core/service/productos.service';
import { ComunicacionService } from '../../../core/comunications/communication.service'

@Component({
  selector: 'app-destacados',
  templateUrl: './destacados.component.html',
  styleUrls: ['./destacados.component.css'],
})
export class DestacadosComponent implements OnInit {
  products: Producto[] = [];

  constructor(private productosService: ProductosService, 
    private comunicacionService: ComunicacionService) {}

  ngOnInit(): void {
    this.inicializarProductos();
  }

  private inicializarProductos() {
    this.productosService.traerProductos().subscribe((datos) => {
      datos.forEach((producto) => {
        if (producto.clasificacion >= 4 && this.products.length <= 4) {
          this.products.push(producto);
        }
      });
    });
  }

  agregarAlCarrito(producto: Producto, quantity: number): void {
    const productoACarrito = { ...producto };
    console.log(productoACarrito);
    this.comunicacionService.agregarAlCarrito(producto, quantity); // enviar quantity al servicio
  }
}
