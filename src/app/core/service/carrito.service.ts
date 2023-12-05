import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: "root",
})
export class CarritoService {
  private apiUrl = `${environment.apiUrl}/producto`;


  constructor(private http: HttpClient) {}

  comprar(productosEnCarrito: any[], total: number): Observable<any> {
    const compraData = {
      nombre: localStorage.getItem('name'),
      email: localStorage.getItem('user'),
      listado: productosEnCarrito.map((producto) => ({
        imageUrl: producto.imageUrl,
        descripcion: producto.descripcion,
        cantidad: producto.selectedQuantity,
        precioUnitario: producto.precio,
      })),
      precioTotal: total,
    };

    return this.http.post(`${this.apiUrl}/compras`, compraData).pipe(
      catchError((error) => {
        console.error("Error al realizar la compra", error);
        throw error;
      })
    );
  }
}
