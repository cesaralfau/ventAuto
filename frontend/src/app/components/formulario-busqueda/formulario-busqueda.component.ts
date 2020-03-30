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
  listaMarcaModelo
  listaMarcaModeloFiltrado=[]
  modelosFiltrados: any;
  aniosVehiculo=[]
  constructor(private fb:FormBuilder, private dbServ:DBservice, private router:Router) { }

  ngOnInit() {
    this.formBuscar = this.fb.group({
      marca: ['-1'],
      modelo: ['-1'],
      anio_hasta: ['-1'],
      anio_desde: ['-1'],
      color_catal: ['-1'],
      estado_catal: ['-1']
    });

    this.MarcaModeloInfo();
    this.LlenarArregloAnios()
  }

  LlenarArregloAnios(){
    let anio = new Date().getFullYear()
    for (let i = 0; i < 30; i++) {
      this.aniosVehiculo.push(anio)
      anio -=1
    }
    this.aniosVehiculo.sort((a, b) => {
      return a > b ? 1 : -1;
    });    
  }

  async buscarVehiculo(){
    try {
      console.log(this.formBuscar.value);
    } catch (error) {
      console.log('NO SE ENVIO NADA');
    }
  }

  selectMarca(value){
    this.formBuscar.controls.modelo.setValue('-1')
    console.log(this.formBuscar)
    this.modelosFiltrados= this.listaMarcaModelo.filter(lista=> lista.marca===value)
  }

  async MarcaModeloInfo(){
    try {
      this.listaMarcaModelo = await this.dbServ.getMarcaModeloInfo().toPromise()

      for (let i = 0; i < this.listaMarcaModelo.length; i++) {
        const element = this.listaMarcaModelo[i];
        if(!this.listaMarcaModeloFiltrado.includes(element.marca)){
          this.listaMarcaModeloFiltrado.push(element.marca)
        }
      }

      // this.listaMarcaModeloFiltrado

      console.log(this.listaMarcaModelo)
      console.log(this.listaMarcaModeloFiltrado)
    } catch (error) {
      console.error('ERROR BUSCANDO LA INFO MARCA MODELO');
    }
  }
  
}

