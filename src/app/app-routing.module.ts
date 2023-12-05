import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './public/components/home/home.component';
import { RegisterComponent } from './public/components/register/register.component';
import { ProductoFromComponent } from './public/components/producto-from/producto-from.component';
import { AdminComponent } from './public/admin/admin.component';
import { LoginComponent } from './public/components/login/login.component';
import { TiendaComponent } from './public/components/tienda/tienda.component';
import { DetalleProductoComponent } from './public/components/producto-detalle/producto-detalle.component';
import { VerificacionComponent } from './public/components/verificacion/verificacion.component';
import { CartComponent } from './public/components/cart/cart.component';
import { RecuperarComponent } from './public/components/recuperar/recuperar.component';
import { ConfirmarRecuperacionComponent } from './public/components/confirmar-recuperacion/confirmar-recuperacion.component';
import { RecuperacionExitosaComponent } from './public/components/recuperacion-exitosa/recuperacion-exitosa.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registrar', component: RegisterComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'crear-producto', component: ProductoFromComponent },
  { path: 'ingresar', component: LoginComponent },
  { path: 'tienda', component: TiendaComponent },
  { path: 'producto-detalle/:id', component: DetalleProductoComponent },
  { path: 'verificar-cuenta', component: VerificacionComponent },
  { path: 'cart', component: CartComponent },
  { path: 'recuperar', component: RecuperarComponent },
  { path: 'confirmar-recuperacion', component: ConfirmarRecuperacionComponent },
  { path: 'recuperacion-exitosa', component: RecuperacionExitosaComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
