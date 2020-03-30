import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import * as _ from 'lodash';

import { DBservice } from './bdservice.service';

// ===========================================================================
// PARA SABER SI ENTRAR AL DASHBOARD O QUEDAMER EN OFERTAS
// ===========================================================================
export const Logearse = new BehaviorSubject<string>('logueo');

// ===========================================================================
// PARA MOSTRAR EL LOADING
// ===========================================================================
export const showLoadin = new BehaviorSubject<boolean>(false);

// ===========================================================================
// PARA MOSTRAR MODAL DE INICIAR SESION
// ===========================================================================
export const showModalHome = new BehaviorSubject<boolean>(false);



export class GLOBAL {
  constructor(private dbServ: DBservice) {}
  static formatearNumero(nStr) {
    if (nStr !== undefined) {
      nStr += '';
      const x = nStr.split('.');
      let x1 = x[0];
      const x2 = x.length > 1 ? '.' + x[1] : '';
      const rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
      }
      return x1 + x2;
    }
  }
  static duplicarJson(json) {
    return JSON.parse(JSON.stringify(json));
  }
  static Capitalice(json) {
    return _.capitalize(json);
  }

  // =========================================================================================================
  
  
  // =========================================================================================================
  static roundDecenaMayor(value) {
    if (0 > value) {
      const decenaMenor = Math.ceil(value / 10) * 10;
      return decenaMenor + 10;
    }
    const decenaMenor = Math.floor(value / 10) * 10;
    return decenaMenor + 10;
  }

  // =========================================================================================================

  // * Método o función para validar una cédula dominicana*
  static ValidaCedula2(cedula) {
    // Declaración de variables a nivel de método o función.
    let verificador = 0;
    let digito = 0;
    const digitoVerificador = cedula.charAt(10); // es el ultimo numero despues del guion
    let suma = 0;
    /*Control de errores en el código*/
    try {
      // verificamos que la longitud del parametro sea igual a 11
      // recorremos en un ciclo for cada dígito de la cédula
      for (let i = 0; i < 10; i++) {
        // se multiplica el numero entre 1 y 2 alternadamente
        digito = _.parseInt(cedula.charAt(i)) * (i % 2 === 0 ? 1 : 2);
        // si la multiplicacion da de dos digitos se suman los numeros individuales
        if (digito > 9) {
          digito = _.parseInt(digito.toString().charAt(0)) + _.parseInt(digito.toString().charAt(1));
        }
        suma += digito;
      }
      /*Obtenemos el verificador restandole la decena mayor a la sumatoria*/
      verificador = this.roundDecenaMayor(suma) - suma;

      // si el verificador da igual a la resta esta correctaß

      if ((verificador === 10 && digitoVerificador === '0') || verificador.toString() === digitoVerificador.toString()) {
        console.log('cedula ', cedula.substring(0, 3) + '-' + cedula.substring(3, 10) + '-' + cedula.substring(10, 11));

        console.log('=====================');
        console.log('|      correcto      |');
        console.log('=====================');

        return true;
      }
    } catch {
      console.log('cedula ', cedula.substring(0, 3) + '-' + cedula.substring(3, 10) + '-' + cedula.substring(10, 11));
      console.log('=====================');
      console.log('|     inorrecto     |');
      console.log('=====================');
      return false;
    }

    console.log('cedula ', cedula.substring(0, 3) + '-' + cedula.substring(3, 10) + '-' + cedula.substring(10, 11));
    console.log('=====================');
    console.log('|     incorrecto     |');
    console.log('=====================');
    return false;
  }
  // =========================================================================================================

  static redondearAdos(num) {
    const string = num + '';
    const splitStr = _.split(string, '.');

    let enteros = splitStr[0];

    const splitEnteros = _.split(enteros, ',');

    enteros = _.join(splitEnteros, '');

    let tempdecimales = splitStr[1];
    if (splitStr.length === 1) {
      tempdecimales = '00';
    }

    const decimales = tempdecimales.substring(0, 2);
    const Arreglo = [enteros, decimales];
    const numStr = _.join(Arreglo, '.');

    return parseFloat(numStr).toFixed(2);
  }

  static desformatear(sTnum) {
    let temp = 0;

    if (sTnum) {
      const x = _.split(sTnum, ',');
      if (x.length === 1) {
        temp += parseFloat(x[0]);
        return temp;
      } else if (x.length >= 2) {
        let joined = '';
        joined = _.join(x, '');
        temp += parseFloat(joined);
        return temp;
      }
    } else {
      return sTnum;
    }
  }
  // static desformatear(sTnum) {
  //   let temp = 0;

  //   if (sTnum) {
  //     if (!isNaN(sTnum)) {
  //       const x = _.split(sTnum, ',');
  //       if (x.length === 1) {
  //         temp += parseFloat(x[0]);
  //         return temp;
  //       } else if (x.length >= 2) {
  //         let joined = '';
  //         joined = _.join(x, '');
  //         temp += parseFloat(joined);
  //         return temp;
  //       }
  //     } else {
  //       return sTnum;
  //     }
  //   } else {
  //     return sTnum;
  //   }
  // }
}
