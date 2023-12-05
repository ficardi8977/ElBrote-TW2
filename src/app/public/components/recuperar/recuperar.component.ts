import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { CompartidoService } from 'src/app/core/service/compartido.service';
import { UsuarioService } from 'src/app/core/service/usuario.services';


@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})

export class RecuperarComponent {
  formRecuperar: FormGroup;
  email: string;

  constructor(
    private usuarioService: UsuarioService,
    private route: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private compartidoService: CompartidoService
  ) {}

  ngOnInit(): void {
    this.formRecuperar = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email])
  });
  }
  solicitarRecuperacion() {
    if (this.formRecuperar.valid) {
      const datos = {
        email: this.formRecuperar.get('email').value,
      };

      this.cambiarEmail();
      
      this.usuarioService.solicitarRecuperacion(datos).subscribe(  
        (response: any) => {
          this.toastr.success(response.message);
          this.route.navigate(['/confirmar-recuperacion']);
        },
        (error: any) => {
          console.error(error.message);
          this.toastr.error(error.message);
        });
    }
  }

  cambiarEmail() {
    this.compartidoService.changeEmail(this.email);
  }
  
}
