import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DBservice } from '../services/bdservice.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate, CanActivateChild, CanLoad {
  tipo: any = null;
  constructor(private dbServ: DBservice, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.dbServ.isLoggedIn()) {
      const userPayload = JSON.parse(this.dbServ.getUserInfo());

      if (userPayload.role === 'U') {
        this.router.navigateByUrl('/usuario');
        return false;
      } else if (userPayload.role === 'A') {
        return true;
      } else {
        this.router.navigateByUrl('/');
        return false;
      }
    } else {
      this.router.navigateByUrl('/');
      // this.usServ.deleteToken();
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
