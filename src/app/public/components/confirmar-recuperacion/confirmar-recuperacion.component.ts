import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/core/service/usuario.services';
import { CuentaRecuperacion } from 'src/app/core/models/cuentaRecuperacion.model';
import { CompartidoService } from 'src/app/core/service/compartido.service';

@Component({
  selector: 'app-confirmar-recuperacion',
  templateUrl: './confirmar-recuperacion.component.html',
  styleUrls: ['./confirmar-recuperacion.component.css']
})
export class ConfirmarRecuperacionComponent implements OnInit{
  cuenta: CuentaRecuperacion = new CuentaRecuperacion();
  formConfirmarRecuperar: FormGroup;
  email: string;

  constructor(
    private usuarioService: UsuarioService,
    private route: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private compartidoService: CompartidoService
  ) {}

  ngOnInit(): void {

    this.compartidoService.currentEmail.subscribe((email) => {
      console.log(email);
      this.email = email;
    });

    this.formConfirmarRecuperar = this.formBuilder.group({
      codigoVerificador: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required,           
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)]),
       });
  }

  ConfirmarRecuperacion() {
    if (this.formConfirmarRecuperar.valid) {
      this.cuenta.email = this.email;
      this.usuarioService.confirmarRecuperacion(this.cuenta).subscribe(  
        (response: any) => {
          this.toastr.success(response.message);
          this.route.navigate(['/recuperacion-exitosa']);
        },
        (error: any) => {
          console.error("mi error" + error.error.error);
          this.toastr.error(error.error.error);
        });
    }
  }
}
