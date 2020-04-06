import { Component, OnInit } from '@angular/core';
import { DBservice } from 'src/app/services/bdservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password: any;
  correo: any;

  constructor(private dbServ:DBservice, private router: Router) { }

  ngOnInit() {
  }

  async onlogin(){
    try {
      
      const obj={
        passw_user:this.password,
        correo_user:this.correo,
      }
      const res = await this.dbServ.login(obj).toPromise()
      console.log(res);
      this.dbServ.toastSuccess('Bienvenido ' +res.nom_user,'CORRECTO')
        this.dbServ.saveAuthUser(res);
        this.router.navigate(['/cliente/publicaciones']);
        
    } catch (error) {
      this.dbServ.toastError('Usuario o contraseña incorrectos','ERROR')
      
    }
  }

}
