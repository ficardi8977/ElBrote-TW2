import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/core/service/productos.service';
import { Producto } from 'src/app/core/models/productos.model';
import { CartComponent } from 'src/app/public/components/cart/cart.component';
import { ToastrService } from 'ngx-toastr';
import { ComunicacionService } from '../../../core/comunications/communication.service'
@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css'],
})
export class DetalleProductoComponent implements OnInit {
  producto: Producto;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductosService,
    private cartComponent: CartComponent,
    private toastr: ToastrService,
    private comunicacionService: ComunicacionService
  ) {}

  ngOnInit(): void {
    this.getProducto();
  }

  getProducto(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getProductoId(id).subscribe(
      (producto) => {
        this.producto = producto;
      },
      (error) => {
        this.toastr.error('Error', 'Error al obtener el producto');
      }
    );
  }

  agregarAlCarrito(producto: Producto, quantity: number): void {
    console.log(quantity);
    const productoACarrito = { ...producto };
    console.log(productoACarrito);
    this.comunicacionService.agregarAlCarrito(producto, quantity);// enviar quantity al servicio
  }
}
