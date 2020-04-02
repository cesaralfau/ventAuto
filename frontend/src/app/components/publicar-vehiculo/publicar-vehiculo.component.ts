import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DBservice } from 'src/app/services/bdservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicar-vehiculo',
  templateUrl: './publicar-vehiculo.component.html',
  styleUrls: ['./publicar-vehiculo.component.css']
})
export class PublicarVehiculoComponent implements OnInit {
  formPublicar
  listaMarcaModelo
  listaMarcaModeloFiltrado = []
  modelosFiltrados: any;
  constructor(private fb:FormBuilder, private dbServ: DBservice, private router: Router) { }

  ngOnInit() {

    this.formPublicar = this.fb.group({
      marca: ['-1'],
      modelo: ['-1'],
      id_user: JSON.parse(this.dbServ.getUserInfo()).id_user,
      anio_catal: ['-1'],
      trans_catal: ['-1'],
      cilind_catal: ['-1'],
      color_catal: ['-1'],
      inter_catal: ['-1'],
      estado_catal: ['-1'],
      precio_catal: ['']
      
    });
    this.MarcaModeloInfo()
    
  }
  async crearCatalogo(){
    console.log(this.formPublicar.value)
    try {
      const res = await this.dbServ.createCatalogo(this.formPublicar.value).toPromise()     
      console.log(`res`,res);
      this.dbServ.toastSuccess("Vehiculo publicado exitosamente!","CORRECTO" )
      this.router.navigate(['/cliente/publicaciones']);
    } catch (error) {
      console.log('NO SE ENVIO NADA');
      console.error();
      
    }

}

selectMarca(value) {
  this.formPublicar.controls.modelo.setValue('-1')
  this.modelosFiltrados = this.listaMarcaModelo.filter(lista => lista.marca === value)
}

async MarcaModeloInfo() {
  try {
    this.listaMarcaModelo = await this.dbServ.getMarcaModeloInfo().toPromise()

    for (let i = 0; i < this.listaMarcaModelo.length; i++) {
      const element = this.listaMarcaModelo[i];
      if (!this.listaMarcaModeloFiltrado.includes(element.marca)) {
        this.listaMarcaModeloFiltrado.push(element.marca)
      }
    }

  } catch (error) {
    console.error('ERROR BUSCANDO LA INFO MARCA MODELO');
  }
}

}
