import { Component, OnInit } from '@angular/core';
import { DBservice } from 'src/app/services/bdservice.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-mis-publicaciones',
  templateUrl: './mis-publicaciones.component.html',
  styleUrls: ['./mis-publicaciones.component.css'],
})
export class MisPublicacionesComponent implements OnInit {
  perfil: any;
  mispublicaciones: any;
  constructor(private dbServ: DBservice) {}

  async ngOnInit() {
    this.perfil = await JSON.parse(this.dbServ.getUserInfo());
    this.getMisPublicacione();
  }

  async getMisPublicacione() {
    try {
      this.mispublicaciones = await this.dbServ.getCatalogoByIdCliente(this.perfil.id_user).toPromise();
    } catch (error) {
      console.error('ERROR BUSCANDO LAS PUBLICACIONES');
    }
  }

  async DeleteItem(vehiculo, i) {
    try {
      const res = await this.dbServ.deleteCatalogo(vehiculo.id_catal).toPromise();
      const temp = JSON.parse(JSON.stringify(this.mispublicaciones));
      this.mispublicaciones = [];
      _.pullAt(temp, i);
      this.mispublicaciones = temp;
      this.dbServ.toastSuccess('Publicacion eliminada', 'CORRECTO');
    } catch (error) {
      console.error('ERROR ELIMINANDO LA PUBLICACION');
    }
  }
}
