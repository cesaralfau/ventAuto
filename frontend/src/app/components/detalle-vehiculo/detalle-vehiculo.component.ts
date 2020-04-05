import { Component, OnInit } from '@angular/core';
import { DBservice } from 'src/app/services/bdservice.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-detalle-vehiculo',
  templateUrl: './detalle-vehiculo.component.html',
  styleUrls: ['./detalle-vehiculo.component.css']
})
export class DetalleVehiculoComponent implements OnInit {
  vehiculoSeleccionado
  formInteres
  slides = [];
  activeSlideIndex = 0;
  constructor(private fb:FormBuilder, private dbServ:DBservice,private ActRoute: ActivatedRoute) { }


  ngOnInit() {
    const id = this.ActRoute.snapshot.params['id']
    this.findVehiculo(id)

    this.formInteres = this.fb.group({
      nombreinteres: [''],
      telefonointeres: [''],
      correointeres: [''], 
    }); 
  }

  async findVehiculo(id){
    try {
      this.vehiculoSeleccionado = await this.dbServ.getCatalogoById(id).toPromise()
    } catch (error) {
      console.log('ERROR NO SE RECUPERO NADA');
    }
  }

  async enviarCorreo(){

    console.log(this.formInteres.value);
    try {
      const res = await this.dbServ.createInteres(this.formInteres.values).toPromise()
      console.log(`res`,res);
      
    } catch (error) {
      
    }
    
  }

}
