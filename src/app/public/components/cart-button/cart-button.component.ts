import { Component, Input } from '@angular/core';
import { Producto } from 'src/app/core/models/productos.model';
import { ProductosService } from 'src/app/core/service/productos.service';
import { ComunicacionService } from '../../../core/comunications/communication.service'

@Component({
  selector: 'app-cart-button',
  template: `
    <div *ngIf="isVistaDetalle; else botones">
      <!-- Aquí puedes poner la lógica específica para la vista detalle, por ejemplo, un solo botón comprar -->
      <button type="button" class="btn btn-secondary" (click)="comprar(producto, 1)">
        Comprar
      </button>
    </div>
    <ng-template #botones>
      <!-- Aquí va la lógica para otros casos, como mostrar varios botones con cantidades -->
      <div class="btn-group" role="group">
        <button
          type="button"
          class="btn btn-secondary"
          *ngFor="let number of [1, 2, 3, 4, 5]"
          (click)="agregarAlCarrito(producto, number)"
        >
          {{ number }}
        </button>
      </div>
    </ng-template>
  `,
  styles: []
})
export class CartButtonComponent {
  @Input() producto: Producto;
  @Input() isVistaDetalle: boolean;

  constructor(private productosService: ProductosService, 
    private comunicacionService: ComunicacionService) {}

  agregarAlCarrito(producto: Producto, quantity: number): void {
    const productoACarrito = { ...producto };
    this.updateTotal(producto, quantity);
    this.comunicacionService.agregarAlCarrito(producto, quantity);
  }

  comprar(producto: Producto, cantidad: number): void {
    // Lógica específica para la vista detalle
    this.comunicacionService.agregarAlCarrito(producto, cantidad)
  }

  private updateTotal(producto: Producto, quantity: number): void {
    console.log(producto);
    if (producto) {
      console.log("entro");
      producto.selectedQuantity = quantity;
      producto.totalForSelectedQuantity = producto.precio * quantity;
    }
    console.log("no entro");
  }
}
