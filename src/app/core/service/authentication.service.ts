import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
  isLoggedIn = false; 
  rol: string;

 updateStatusSesion(){
    this.isLoggedIn =  JSON.parse(localStorage.getItem('isLoggedIn'));
  }
  getUsuario(){
    return localStorage.getItem('user');
  }
  setLocalStorageSesion(datos, response){
    localStorage.setItem('user',datos.email);
    localStorage.setItem('name', response.data.name);
    localStorage.setItem('accessToken',response.data.accessToken);
    localStorage.setItem('idToken',response.data.idToken);
    localStorage.setItem('refreshToken',response.data.refreshToken);
    localStorage.setItem('profile',response.data.profile);
    localStorage.setItem('isLoggedIn','true');
    this.rol = localStorage.getItem('profile'); 
    this.updateStatusSesion();
  }

  cerrarSesion(){
    localStorage.setItem('isLoggedIn','false');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('name');
    localStorage.removeItem('profile');
    this.rol = null

    this.updateStatusSesion();
  }
}
