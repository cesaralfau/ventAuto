import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DBservice } from 'src/app/services/bdservice.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
@Component({
  selector: 'app-publicar-vehiculo',
  templateUrl: './publicar-vehiculo.component.html',
  styleUrls: ['./publicar-vehiculo.component.css'],
})
export class PublicarVehiculoComponent implements OnInit {
  formPublicar;
  listaMarcaModelo;
  listaMarcaModeloFiltrado = [];
  modelosFiltrados: any;
  urls = [];
  imagenesAsubir: Array<File>;

  constructor(private fb: FormBuilder, private dbServ: DBservice, private router: Router) {}

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
      precio_catal: [''],
    });
    this.MarcaModeloInfo();
  }
  async crearCatalogo() {
    console.log(this.formPublicar.value);
    const formData = new FormData();
    console.log(`this.imagenesAsubir`, this.imagenesAsubir[1]);

    for (let i = 0; i < this.imagenesAsubir.length; i++) {
      console.log(this.imagenesAsubir[i].name);
      formData.append('uploads[]', this.imagenesAsubir[i], this.imagenesAsubir[i].name);
    }
    formData.append('info', JSON.stringify(this.formPublicar.value));

    try {
      const res = await this.dbServ.createCatalogo(formData).toPromise();
      console.log(`res`, res);
      this.dbServ.toastSuccess('Vehiculo publicado exitosamente!', 'CORRECTO');
      // this.router.navigate(['/cliente/publicaciones']);
    } catch (error) {
      console.log('NO SE ENVIO NADA');
      console.error();
    }
  }

  selectMarca(value) {
    this.formPublicar.controls.modelo.setValue('-1');
    this.modelosFiltrados = this.listaMarcaModelo.filter((lista) => lista.marca === value);
  }

  async MarcaModeloInfo() {
    try {
      this.listaMarcaModelo = await this.dbServ.getMarcaModeloInfo().toPromise();

      for (let i = 0; i < this.listaMarcaModelo.length; i++) {
        const element = this.listaMarcaModelo[i];
        if (!this.listaMarcaModeloFiltrado.includes(element.marca)) {
          this.listaMarcaModeloFiltrado.push(element.marca);
        }
      }
    } catch (error) {
      console.error('ERROR BUSCANDO LA INFO MARCA MODELO');
    }
  }

  // ===============================================================================================================================================
  // IMAGENES
  // ===============================================================================================================================================
  detectFiles(event) {
    const files = event.target.files;
    this.imagenesAsubir = files;
    if (files) {
      for (const file of files) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          const bas64 = reader.result.toString().split(',')[1];
          const obj = {
            fileName: file.name,
            base_64: bas64,
            url: e.target.result,
          };
          this.urls.push(obj);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  quitarImg(i) {
    const temp = JSON.parse(JSON.stringify(this.urls));
    this.urls = [];
    _.pullAt(temp, i);
    this.urls = temp;
  }
}
