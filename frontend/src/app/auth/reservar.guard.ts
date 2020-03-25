import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';
import { UsuariosI } from '../models/usuario.model';
import { Logearse, showModalHome } from '../services/GLOBAL';
import { DBservice } from '../services/bdservice.service';

@Injectable({
  providedIn: 'root',
})
// tslint:disable-next-line: class-name
export class reservaGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private dbServ: DBservice, private usuariosServices: UsuariosService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const islogin = this.dbServ.isLoggedIn();

    if (islogin) {
      return true;
    } else {
      Logearse.next('oferta');
      showModalHome.next(true);
      return false;
    }
  }
  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
