import { Component, OnInit } from '@angular/core';
import { DBservice } from 'src/app/services/bdservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-vehiculo',
  templateUrl: './detalle-vehiculo.component.html',
  styleUrls: ['./detalle-vehiculo.component.css']
})
export class DetalleVehiculoComponent implements OnInit {
  vehiculoSeleccionado
  constructor(private dbServ:DBservice,private ActRoute: ActivatedRoute) { }


  ngOnInit() {
    const id = this.ActRoute.snapshot.params['id']
    this.findVehiculo(id)
  }

  async findVehiculo(id){
    try {
      this.vehiculoSeleccionado = await this.dbServ.getCatalogoById(id).toPromise()
    } catch (error) {
      console.log('ERROR NO SE RECUPERO NADA');
      
    }
    
    
  }

}
