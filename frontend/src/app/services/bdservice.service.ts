import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { showModalHome } from './GLOBAL';
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

  login(arg, params): Observable<any> {
    return this.peticion('auth/sign_in', 'post', arg).pipe(
      map(val => {
        console.log(val);
        if (params === 'logueo') {
          const data = val;
          if (data.role === 'A') {
            this.router.navigateByUrl('/admin');
          } else if (data.role === 'U') {
            this.router.navigateByUrl('/usuario');
          } else {
            this.router.navigateByUrl('/');
          }
        } else {
          showModalHome.next(false);

          this.router.navigate(['detalleOferta', params]);
          // this.router.navigate(['detalleOferta', window.location.pathname.split('/')[2], 'confirmar']);
        }

        if (val.data) {
          this.saveAuthUser(val.data);
          this.router.navigate(['/admin']);
        }
        return val;
      }),
    );
  }

  isLoggedIn() {
    const userPayload = this.getUserInfo();
    if (userPayload) {
      let res = true;
      const user = JSON.parse(userPayload);
      const parsed = btoa(user.role);
      if (!this.allowedRoles.includes(parsed)) {
        res = false;
      }
      return res;
    } else {
      return false;
    }
  }

  // =====================================================================
  // USUARIOS
  // =====================================================================

  createUser(arg) {
    return this.peticion('auth', 'post', JSON.stringify(arg));
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
