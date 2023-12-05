import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductosService } from './../../core/service/productos.service';
import { Producto } from './../../core/models/productos.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  productos: Producto[] = [];

  constructor(
    private productosService: ProductosService,
    private route: Router,
    private toastr: ToastrService,
    private change: ChangeDetectorRef,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {

    if (localStorage.getItem('profile')!= 'ADMIN') {
       this.route.navigate(['/ingresar']).then(() => false);
    }
    this.productosService.traerProductos().subscribe((datos) => {
      this.change.detectChanges();
      this.productos = datos;
      console.log('productos:', this.productos);
    });
  }

  eliminar(id: string) {
    this.productosService.eliminarProducto(id).subscribe((data) => {
      const index = this.productos.findIndex((producto) => producto._id === id);

      if (index !== -1) {
        this.productos.splice(index, 1);
        this.toastr.success(data.mensaje);
      }
      this.change.detectChanges();
    });
  }

  editar(producto: Producto) {
    this.productosService.añadirProductoEditar(producto);
    this.route.navigate(['/crear-producto']);
  }
}
