import { Component, OnInit } from '@angular/core';
import { DBservice } from 'src/app/services/bdservice.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-detalle-vehiculo',
  templateUrl: './detalle-vehiculo.component.html',
  styleUrls: ['./detalle-vehiculo.component.css'],
})
export class DetalleVehiculoComponent implements OnInit {
  vehiculoSeleccionado;
  formInteres;
  slides = [];
  activeSlideIndex = 0;
  isLogin: boolean;
  cuenta: any;
  constructor(private fb: FormBuilder, private dbServ: DBservice, private ActRoute: ActivatedRoute) {}

  async ngOnInit() {
    const id = this.ActRoute.snapshot.params['id'];
    this.findVehiculo(id);

    this.formInteres = this.fb.group({
      nombreinteres: [''],
      telefonointeres: [''],
      correointeres: [''],
    });
    try {
      this.isLogin = await this.dbServ.isLoggedIn();
      this.cuenta = JSON.parse(this.dbServ.getUserInfo());
    } catch (error) {}
  }

  async findVehiculo(id) {
    try {
      this.vehiculoSeleccionado = await this.dbServ.getCatalogoById(id).toPromise();
    } catch (error) {
      console.log('ERROR NO SE RECUPERO NADA');
    }
  }

  async enviarCorreo() {
    console.log(this.formInteres.value);
    const obj = {
      id_catal: this.vehiculoSeleccionado.id_catal,
      id_user: this.vehiculoSeleccionado ? this.vehiculoSeleccionado.usuario.id_user : null,
      nombre_no_registrado: this.formInteres.value.nombreinteres,
      correo_no_registrado: this.formInteres.value.correointeres,
      telef_no_registrado: this.formInteres.value.telefonointeres,
    };
    try {
      const res = await this.dbServ.createInteres(obj).toPromise();
      document.getElementById('btnCerrar').click();
      console.log(`res`, res);
    } catch (error) {}
  }
}
