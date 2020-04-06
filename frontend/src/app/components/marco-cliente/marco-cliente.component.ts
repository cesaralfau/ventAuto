import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DBservice } from 'src/app/services/bdservice.service';
import { Router } from '@angular/router';
import { BuscquedaVehiculoService } from 'src/app/services/buscqueda-vehiculo.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-marco-cliente',
  templateUrl: './marco-cliente.component.html',
  styleUrls: ['./marco-cliente.component.css'],
})
export class MarcoClienteComponent implements OnInit {
  cuenta;
  isLogin: any;
  formBuscar;
  listaMarcaModelo;
  listaMarcaModeloFiltrado = [];
  modelosFiltrados: any;
  aniosVehiculo = [];
  constructor(private fb: FormBuilder, private dbServ: DBservice, private router: Router, private BVserv: BuscquedaVehiculoService) {}

  async ngOnInit() {
    this.formBuscar = this.fb.group({
      marca: ['-1'],
      modelo: ['-1'],
      anio_hasta: ['-1'],
      anio_desde: ['-1'],
      estado_catal: ['-1'],
    });

    this.MarcaModeloInfo();
    this.LlenarArregloAnios();
    try {
      this.isLogin = await this.dbServ.isLoggedIn();
      this.cuenta = JSON.parse(this.dbServ.getUserInfo());
    } catch (error) {}
    console.log('isLogin >>>', this.isLogin);
  }

  LlenarArregloAnios() {
    let anio = new Date().getFullYear();
    for (let i = 0; i < 30; i++) {
      this.aniosVehiculo.push(anio);
      anio -= 1;
    }

    this.aniosVehiculo.sort((a, b) => {
      return a > b ? 1 : -1;
    });
  }

  async buscarVehiculo() {
    try {
      const obj = {
        id_marcamodelo: this.formBuscar.value.modelo,
        desde: this.formBuscar.value.anio_desde,
        hasta: this.formBuscar.value.anio_hasta,
        estado: this.formBuscar.value.estado_catal,
      };
      let res = await this.dbServ.getCatalogoBusqueda(obj).toPromise();

      if (res.length > 0) {
        this.BVserv.siguienteBusquedaVehiculo(res);
        this.router.navigate(['/cliente/resultadosBusqueda']);
      } else {
        this.dbServ.toastWarning('Busqueda sin resultados!!', 'AVISO');
      }
    } catch (error) {
      console.log('NO SE ENVIO NADA');
    }
  }

  selectMarca(value) {
    this.formBuscar.controls.modelo.setValue('-1');
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

  logOut() {
    this.dbServ.deleteUserInfo();
    this.router.navigateByUrl('/');
  }

  esconderMenu(e) {
    e.preventDefault();
    $('#wrapper').toggleClass('toggled');
  }
}
