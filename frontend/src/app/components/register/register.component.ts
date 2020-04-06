import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DBservice } from 'src/app/services/bdservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegistro
  constructor(private fb:FormBuilder, private dbServ:DBservice, private router: Router) { }

  ngOnInit() {

    this.formRegistro = this.fb.group({
        nom_user: [''],
        telef_user: [''],
        resid_user: [''],
        correo_user: ['',Validators.email],
        passw_user: ['', Validators.minLength(4)]
      });   
  }
  async crearUsuario(){
    console.log(this.formRegistro.value);
    try {
    const res = await this.dbServ.createUser(this.formRegistro.value).toPromise()
    console.log(`res`, res);
    this.dbServ.toastSuccess( res.nom_user+", te has registrado correctamente!","CORRECTO")
    this.dbServ.saveAuthUser(res);
    this.router.navigate(['/cliente/publicaciones']);
    } catch (error) {
      
    }
  }

}
