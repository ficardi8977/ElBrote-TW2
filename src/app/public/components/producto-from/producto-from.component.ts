import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/core/models/productos.model';
import { ProductosService } from './../../../core/service/productos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-producto-from',
  templateUrl: './producto-from.component.html',
  styleUrls: ['./producto-from.component.css'],
})
export class ProductoFromComponent implements OnInit {
  productoForm: FormGroup = new FormGroup({});
  titulo = 'Crear Producto';
  id: string | undefined;
  selectedImage: File;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private productosService: ProductosService,
    private toastr: ToastrService
  ) {
    this.FormBuiler();
  }
  ngOnInit(): void {
    this.getProducto();
  }

  private FormBuiler() {
    this.productoForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      descripcion: ['', [Validators.required, Validators.minLength(7)]],
      clasificacion: [0],
      precio: ['', [Validators.required]],
      imageUrl: [null, [Validators.required]],
    });
  }

  crearProducto() {
    if (this.id === undefined) {
      this.guardarProducto();
      this.productosService.restablecerProducto();
    } else {
      this.editarProducto(this.id);
      this.productosService.restablecerProducto();
    }
  }
  editarProducto(id: string) {
    if (this.productoForm.valid) {
      if (this.selectedImage) {
        // Si hay una nueva imagen, primero la subimos
        this.productosService
          .uploadImage(this.selectedImage)
          .subscribe((response: any) => {
            if (response.success) {
              const imageUrl = response.data.url;
              const producto: Producto = {
                ...this.productoForm.value,
                imageUrl,
              };

              // Luego, actualizamos el producto en el servidor
              this.productosService
                .editarProducto(id, producto)
                .subscribe((data) => {
                  this.productoForm.reset();
                  this.titulo = 'Crear Producto';
                  this.id = undefined;
                  this.toastr.info(data.mensaje);
                  this.route.navigate(['/admin']);
                });
            } else {
              this.toastr.error('Error', 'Error al subir la nueva imagen:');
            }
          });
      } else {
        // Si no hay nueva imagen, simplemente actualizamos el producto en el servidor
        this.productosService
          .editarProducto(id, this.productoForm.value)
          .subscribe((data) => {
            this.productoForm.reset();
            this.titulo = 'Crear Producto';
            this.id = undefined;
            this.toastr.info(data.mensaje);
            this.route.navigate(['/admin']);
          });
      }
    }
  }

  onFileSelected(event) {
    this.selectedImage = event.target.files[0];
  }

  guardarProducto() {
    if (this.productoForm.valid && this.id === undefined) {
      if (this.selectedImage) {
        this.productosService
          .uploadImage(this.selectedImage)
          .subscribe((response: any) => {
            if (response.success) {
              const imageUrl = response.data.url;
              // No establezcas el valor de 'imageUrl' aquí
              const producto: Producto = {
                ...this.productoForm.value,
                imageUrl,
              };

              this.productosService
                .guardarProducto(producto)
                .subscribe((data) => {
                  this.toastr.success(data.mensaje);
                  this.route.navigate(['/admin']);
                });
            } else {
              this.toastr.error('Error', 'Error al subir la imagen:');
            }
          });
      }
    }
  }

  private getProducto() {
    this.productosService.getProducto().subscribe((dato) => {
      if (dato) {
        this.titulo = 'Editar Producto';
        this.id = dato._id;
        this.productoForm.patchValue({
          nombre: dato.nombre,
          descripcion: dato.descripcion,
          precio: dato.precio,
        });
        this.productoForm.controls['imageUrl'].setValue(dato.imageUrl);
      }
    });
  }

  get nombreField() {
    return this.productoForm.get('nombre');
  }
  get descripcionField() {
    return this.productoForm.get('descripcion');
  }
  get precioField() {
    return this.productoForm.get('precio');
  }
  get imagenField() {
    return this.productoForm.get('imageUrl');
  }
}
