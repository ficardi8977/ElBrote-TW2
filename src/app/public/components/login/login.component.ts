import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { EmailValidator, PasswordValidator } from 'src/app/public/components/register/validaciones-custom';
import { UsuarioService } from 'src/app/core/service/usuario.services';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Ingresar';
  formLogIn: FormGroup;
  email: string;

  constructor(protected router: Router, private formBuilder: FormBuilder, protected httpClient: HttpClient, private authenticationService: AuthenticationService, private usuarioService: UsuarioService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.formLogIn = this.formBuilder.group({
      email: new FormControl('', [Validators.required, EmailValidator]),
      password: new FormControl('', [Validators.required]),
    });
  }
  

    ingresarUsuario(){
      if (this.formLogIn.valid) {
        const datos = {
          email: this.formLogIn.get('email').value,
          password: this.formLogIn.get('password').value,
        };

        this.usuarioService.ingresar(datos).subscribe(
        (response) => {
          this.authenticationService.setLocalStorageSesion(datos,response);
          console.log("Inicio de sesión exitoso");
          this.toastr.success("Inicio de sesión exitoso");
          this.router.navigate(['']); 
        },
        (error) => {
          this.toastr.error(error.error.mensaje);
        }
    )  } else {
      console.log("Formulario inválido");
    }

  }
}