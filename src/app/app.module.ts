import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './public/components/home/home.component';
import {
  NgbModalModule,
  NgbModule,
  NgbTooltip,
} from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './public/admin/admin.component';
import { ProductoFromComponent } from './public/components/producto-from/producto-from.component';
import { RegisterComponent } from './public/components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './public/components/navbar/navbar.component';
import { FooterComponent } from './public/components/footer/footer.component';
import { LoginComponent } from './public/components/login/login.component';
import { AuthenticationService } from './core/service/authentication.service';
import { BannerComponent } from './public/components/banner/banner.component';
import { TiendaComponent } from './public/components/tienda/tienda.component';
import { DetalleProductoComponent} from './public/components/producto-detalle/producto-detalle.component';
import { VerificacionComponent} from './public/components/verificacion/verificacion.component';
import { CartComponent } from './public/components/cart/cart.component';
import { DestacadosComponent } from './public/components/destacados/destacados.component';
import { CartButtonComponent } from './public/components/cart-button/cart-button.component';
import { ProductosService } from './core/service/productos.service';
import { ComunicacionService } from './core/comunications/communication.service';
import { RecuperarComponent } from './public/components/recuperar/recuperar.component';
import { ConfirmarRecuperacionComponent } from './public/components/confirmar-recuperacion/confirmar-recuperacion.component';
import { RecuperacionExitosaComponent } from './public/components/recuperacion-exitosa/recuperacion-exitosa.component';

@NgModule({
  declarations: [
  AppComponent, 
  AdminComponent, 
  ProductoFromComponent, 
  RegisterComponent, 
  HomeComponent, 
  NavbarComponent, 
  FooterComponent,
  LoginComponent, 
  TiendaComponent,
  BannerComponent, 
  TiendaComponent,
  DetalleProductoComponent,
  VerificacionComponent,
  CartComponent,
  DestacadosComponent,
  CartButtonComponent,
  RecuperarComponent,
  ConfirmarRecuperacionComponent,
  RecuperacionExitosaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbTooltip,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],

  providers: [AuthenticationService, CartComponent, ProductosService, ComunicacionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
