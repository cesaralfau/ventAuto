import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class DBservice {
  allowedRoles = ['VQ==', 'QQ=='];
  url = 'http://localhost:3000';

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {}
  peticion(ruta: string, metodo: string, json?: string): Observable<any> {
    const xhttp = new XMLHttpRequest();
    if (metodo === 'get' || metodo === 'delete') {
      return this.http[metodo](`${this.url}/${ruta}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.getAuthToken(),
          Accept: 'Application/json',
        },
      });
    } else {
      return this.http[metodo](`${this.url}/${ruta}`, json || '', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.getAuthToken(),
          Accept: 'Application/json',
        },
      });
    }
  }

  deleteUserInfo() {
    localStorage.removeItem('userInfo');
  }
  getAuthToken() {
    return localStorage.getItem('token') || null;
  }
  getUserInfo() {
    return localStorage.getItem('userInfo') || null;
  }

  saveAuthUser(userInfo) {
    // localStorage.setIteADMm('token', token);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }
  
  login(arg) {
    return this.peticion('login', 'post', JSON.stringify(arg));
    }

  async isLoggedIn() {
    const userPayload = this.getUserInfo();
    console.log(`userPayload `, userPayload);
    let res = true;

    if (userPayload) {
      let user;
      try {
        user = JSON.parse(userPayload);
        console.log(`user `, user );
        res = await this.revisarSesionEnDB({"correo_user": user.correo_user? user.correo_user:'', "passw_user":user.passw_user?user.passw_user:''}).toPromise()
      } catch (error) {
        res =false
      }
      console.log(`>>>>>`,res );
      return res;
    } else {
      res = false
      return res;
    }
  }

  // =====================================================================
  // USUARIOS
  // =====================================================================

  createUser(arg) {
    return this.peticion('usuarios', 'post', JSON.stringify(arg));
  }
  revisarSesionEnDB(arg):any {
    return this.peticion('isLogin', 'post', JSON.stringify(arg));
  }
  // =====================================================================
  // CATALOGO
  // =====================================================================

  createCatalogo(arg) {
    return this.peticion('catalogo', 'post', JSON.stringify(arg));
  }

  getCatalogoInfo(){
    return this.peticion('catalogo', 'get');
  }

  getCatalogoById(id){
    
    return this.peticion(`catalogo/${id}`,'get')
  }

  getCatalogoBusqueda(arg){

    const id_marcamodelo=arg.id_marcamodelo
    const desde=arg.desde
    const hasta=arg.hasta
    const estado=arg.estado

    return this.peticion(`catalogo/${id_marcamodelo}/${desde}/${hasta}/${estado}`,'get')
  }

  // =====================================================================
  //  MARCA MODELO
  // =====================================================================
  getMarcaModeloInfo(){
    return this.peticion('marcamodelo', 'get');
  }
  // =====================================================================
  //  ARCHIVOS
  // =====================================================================

  subirFoto(arg) {
    return this.peticion('imagenes', 'post', JSON.stringify(arg));
  }
  getDataFoto(id) {
    return this.peticion(`imagenes/${id}`, 'get');
  }
  getAllFotosForAdmin() {
    return this.peticion(`imagenes/get/all`, 'get');
  }

  updatePhoto(what, arg) {
    return this.peticion(`imagenes/update/${what}/${arg.id}`, 'patch', JSON.stringify(arg));
  }

  // =====================================================================
  // INTERES
  // =====================================================================

  createInteres(arg) {
    return this.peticion('interes', 'post', JSON.stringify(arg));
  }

  // =====================================================================
  // TOASTS
  // =====================================================================
  toastSuccess(msg?, titulo?) {
    this.toastr.success(msg || '', titulo || '');
  }
  toastError(msg?, titulo?) {
    this.toastr.error(msg || '', titulo || '');
  }
  toastWarning(msg?, titulo?) {
    this.toastr.warning(msg || '', titulo || '');
  }
}
