import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = `${environment.apiUrl}/usuario`;

  constructor(private http: HttpClient) {}

  registrar(usuario: any) {
    const url = this.apiUrl + '/registrar';
    return this.http.post(url, usuario);
  }

  ingresar(usuario: any) {
    const url = this.apiUrl + '/ingresar';
    return this.http.post(url, usuario);
  }

  solicitarRecuperacion(email: any) {
    const url = this.apiUrl + '/recuperacion/solicitud';
    return this.http.post(url, email);
  }

  confirmarRecuperacion(cuenta: any) {
    const url = this.apiUrl + '/recuperacion/confirmar';
    return this.http.post(url, cuenta);
  }
}
