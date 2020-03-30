import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-publicar-vehiculo',
  templateUrl: './publicar-vehiculo.component.html',
  styleUrls: ['./publicar-vehiculo.component.css']
})
export class PublicarVehiculoComponent implements OnInit {
  formPublicar
  constructor(private fb:FormBuilder) { }

  ngOnInit() {

    this.formPublicar = this.fb.group({
      marca: [''],
      modelo: [''],
      anio_catal: [''],
      trans_catal: [''],
      cilind_catal: [''],
      color_catal: [''],
      inter_catal: [''],
      estado_catal: [''],
      precio_catal: ['']
    });
    
  }
  async crearCatalogo(){
    try {
      console.log(this.formPublicar.value);
    } catch (error) {
      console.log('NO SE ENVIO NADA');
    }

}

}
