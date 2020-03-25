import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

/* End Custom hammer configuration */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

// mantener las rutas seguras
import { AdminGuard } from './auth/admin.guard';
import { UserGuard } from './auth/user.guard';

// servicios

// modulos propios
import { AngularModule } from './modulos/angular/angular.module';
import { NgxBootstrapModule } from './modulos/ngx-bootstrap/ngx-bootstrap.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FormularioBusquedaComponent } from './components/formulario-busqueda/formulario-busqueda.component';
import { PublicarVehiculoComponent } from './components/publicar-vehiculo/publicar-vehiculo.component';
import { MarcoInicialComponent } from './components/marco-inicial/marco-inicial.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResultadosBusquedaComponent } from './components/resultados-busqueda/resultados-busqueda.component';
import { MarcoClienteComponent } from './components/marco-cliente/marco-cliente.component';
import { MisPublicacionesComponent } from './components/mis-publicaciones/mis-publicaciones.component';

@NgModule({
  declarations: [AppComponent, routingComponents, HomePageComponent, FormularioBusquedaComponent, PublicarVehiculoComponent, MarcoInicialComponent, LoginComponent, RegisterComponent, ResultadosBusquedaComponent, MarcoClienteComponent, MisPublicacionesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    RouterModule.forRoot([]),
    LayoutModule,
    HttpClientModule,

    // modulos propios
    AngularModule,
    NgxBootstrapModule,
  ],
  providers: [AdminGuard, UserGuard],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
