import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../core/models/productos.model';
import { ProductosService } from '../../../core/service/productos.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarritoService } from 'src/app/core/service/carrito.service';
import { ComunicacionService } from '../../../core/comunications/communication.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  productosEnCarrito: Producto[] = [];
  total = 0;
  mensajeExito = '¡Compra realizada con éxito!';
  mensajeCancelacion = 'Compra cancelada';

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private productosService: ProductosService,
    private carritoService: CarritoService,
    private comunicacionService: ComunicacionService
  ) {}

  ngOnInit() {
    this.comunicacionService.carrito$.subscribe((carrito) => {
      this.productosEnCarrito = carrito;
      this.actualizarTotal();
    });
    // para que empiece a usar el localstorage para el carrito
    //this.productosEnCarrito = JSON.parse(localStorage.getItem('cart'));
  }

  actualizarTotal() {
    this.total = this.productosEnCarrito.reduce(
      (total, producto) => total + producto.precio * producto.selectedQuantity,
      0
    );
  }

  decrementQuantity(producto: Producto) {
    if (producto.selectedQuantity > 1) {
      producto.selectedQuantity--;
      producto.totalForSelectedQuantity =
        producto.selectedQuantity * producto.precio;
      
      this.actualizarTotal();
      this.comunicacionService.actualizarProductoEnCarrito(producto);
    }
  }

  incrementQuantity(producto: Producto) {
    producto.selectedQuantity++;
    producto.totalForSelectedQuantity =
      producto.selectedQuantity * producto.precio;
      
    this.actualizarTotal();
    this.comunicacionService.actualizarProductoEnCarrito(producto);
  }

  removeProduct(producto: Producto) {
    const index = this.productosEnCarrito.indexOf(producto);
    if (index !== -1) {
      console.log("cantidad",index);
      this.comunicacionService.eliminarDelCarrito(index);
      
     
      this.actualizarTotal();
    }

  }

  cancelPurchase() {
    console.log("cancelando la compra");
    this.comunicacionService.vaciarCarrito();

    this.router.navigate(['/']);

    this.toastr.error('¡La compra fue cancelada!', 'El Brote');
  }

  comprar() {
    if (this.productosEnCarrito.length === 0) {
      this.toastr.warning(
        'Se deben agregar productos al carrito para realizar la compra',
        'El Brote'
      );
      return;
    }

    this.carritoService.comprar(this.productosEnCarrito, this.total).subscribe(
      (resultado) => {
       this.comunicacionService.vaciarCarrito();
        this.router.navigate(['/']);
        this.toastr.success('¡Compra realizada con éxito!', 'El Brote');
      },
      (error) => {
        this.toastr.error(
          'Se produjo un error al realizar la compra',
          'El Brote'
        );
        console.error('Error al realizar la compra', error);
      }
    );
  }
}
