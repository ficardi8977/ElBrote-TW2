  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { AuthenticationService } from 'src/app/core/service/authentication.service';
  import { ComunicacionService } from '../../../core/comunications/communication.service'

  @Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
  })
  export class NavbarComponent implements OnInit {
    cantidadEnCarrito: number = 0; // Inicializamos en 0
    user: string;
    rol: string;

    constructor(protected router: Router, 
      public authenticationService: AuthenticationService,
      private comunicacionService: ComunicacionService) {
        
      authenticationService.updateStatusSesion();
      this.user = authenticationService.getUsuario();

      this.comunicacionService.cantidadEnCarrito$.subscribe(
        (cantidad) => (this.cantidadEnCarrito = cantidad)
      );
    }

    ngOnInit() {
    }
    cerrarSesion() {
      this.authenticationService.cerrarSesion();
      this.router.navigate(['']);
    }

    mostrarCarrito() {
      this.router.navigate(['/cart']);
    }
  }
