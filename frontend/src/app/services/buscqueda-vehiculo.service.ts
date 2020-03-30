import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscquedaVehiculoService {


  private busquedaVehiculo = new BehaviorSubject<any>([]);

  BUSQUEDAVEHICULO = this.busquedaVehiculo.asObservable();

  constructor() { }

  siguienteBusquedaVehiculo(nextValue) {
    this.busquedaVehiculo.next(nextValue);
  }
}
