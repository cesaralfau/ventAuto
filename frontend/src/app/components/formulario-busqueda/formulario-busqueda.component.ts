import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DBservice } from 'src/app/services/bdservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-formulario-busqueda',
  templateUrl: './formulario-busqueda.component.html',
  styleUrls: ['./formulario-busqueda.component.css']
})
export class FormularioBusquedaComponent implements OnInit {
  formBuscar
  listaCatalogo
  constructor(private fb:FormBuilder, private dbServ:DBservice, private router:Router) { }

  ngOnInit() {
    this.formBuscar = this.fb.group({
      marca: [''],
      modelo: [''],
      anio_catal: [''],
      color_catal: [''],
      estado_catal: ['']
    });

    this.CatalogoInfo();

  }
  async buscarVehiculo(){
    try {
      console.log(this.formBuscar.value);
    } catch (error) {
      console.log('NO SE ENVIO NADA');
    }
  }

  async CatalogoInfo(){
    try {
      this.listaCatalogo = await this.dbServ.getCatalogoInfo().toPromise()
      console.log(this.listaCatalogo)
    } catch (error) {
      console.log('ERROR BUSCANDO LA INFO DEL CATALOGO');
    }
  }
  
}

