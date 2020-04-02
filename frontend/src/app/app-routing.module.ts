import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// para asegurar las rutas
import { AdminGuard } from './auth/admin.guard';
import { UserGuard } from './auth/user.guard';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AppComponent } from './app.component';
import { FormularioBusquedaComponent } from './components/formulario-busqueda/formulario-busqueda.component';
import { PublicarVehiculoComponent } from './components/publicar-vehiculo/publicar-vehiculo.component';
import { MarcoInicialComponent } from './components/marco-inicial/marco-inicial.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MarcoClienteComponent } from './components/marco-cliente/marco-cliente.component';
import { ResultadosBusquedaComponent } from './components/resultados-busqueda/resultados-busqueda.component';
import { MisPublicacionesComponent } from './components/mis-publicaciones/mis-publicaciones.component';
import { DetalleVehiculoComponent } from './components/detalle-vehiculo/detalle-vehiculo.component';
// import { reservaGuard } from './auth/reservar.guard';

const routes: Routes = [
  //  =================================================================================
  //  HOME
  //  =================================================================================
  {
    path: 'home',
    component: MarcoInicialComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'formularioBusqueda',
        component: FormularioBusquedaComponent,
      },
      {
        path: 'publicarVehiculo',
        component: PublicarVehiculoComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'registro',
        component: RegisterComponent,
      },
    ],
  },
  //  =================================================================================
  //  CLIENTE
  //  =================================================================================
  {
    path: 'cliente',
    component: MarcoClienteComponent,
    children: [
      {
        path: 'resultadosBusqueda',
        component: ResultadosBusquedaComponent,
      },
      {
        path: 'publicaciones',
        component: MisPublicacionesComponent,
      },

      {
        path: 'detalleVehiculo/:id',
        component: DetalleVehiculoComponent,
      },
    ],
    // canActivate: [AdminGuard],
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [];
