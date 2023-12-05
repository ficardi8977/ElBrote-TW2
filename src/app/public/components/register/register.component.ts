import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/core/service/usuario.services';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/core/models/Usuario.model';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  usuario: Usuario = new Usuario();
  formRegistrar: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private route: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formRegistrar = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,           
                                     Validators.minLength(8),
                                     Validators.pattern(/^(?=.*[0-9])(?=.*[!@$%^&*()_+|~=`{}\[\]:;'",<>\./?\\])(?=.*[A-Z])(?=.*[a-z]).{8,}$/),]),
                                    });
  }

  registrarUsuario() {
    if (this.formRegistrar.valid) {
      this.usuarioService.registrar(this.usuario).subscribe(  
        (response: any) => {
          this.toastr.success(response.mensaje);
          this.route.navigate(['/verificar-cuenta']);
        },
        (error: any) => {
          console.error(error);
          this.toastr.error(error.error.mensaje);
        });
    }
  }
}
