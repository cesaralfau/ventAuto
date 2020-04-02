import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuscquedaVehiculoService } from 'src/app/services/buscqueda-vehiculo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultados-busqueda',
  templateUrl: './resultados-busqueda.component.html',
  styleUrls: ['./resultados-busqueda.component.css']
})
export class ResultadosBusquedaComponent implements OnInit, OnDestroy {
  sub: Subscription
  resultados_busqueda=[]
  constructor(private BVserv: BuscquedaVehiculoService, private router:Router) { }

  ngOnInit() {
    this.sub = this.BVserv.BUSQUEDAVEHICULO.subscribe(res => {
      if (res) {
        this.resultados_busqueda = res
        console.log(res);
      }

    })
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  navegarADetalle(vehiculo){

    this.router.navigate([`/cliente/detalleVehiculo/${vehiculo.id_catal}`])
  }
}
