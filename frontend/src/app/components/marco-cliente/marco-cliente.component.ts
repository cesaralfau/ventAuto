import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { DBservice } from 'src/app/services/bdservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-marco-cliente',
  templateUrl: './marco-cliente.component.html',
  styleUrls: ['./marco-cliente.component.css'],
})
export class MarcoClienteComponent implements OnInit {
  cuenta
  isLogin: any;
  constructor(private dbServ:DBservice, private router:Router) { }

  async ngOnInit() {
    try {
      this.isLogin=await this.dbServ.isLoggedIn()
      this.cuenta= JSON.parse(this.dbServ.getUserInfo())
    } catch (error) {}
    console.log('isLogin ', this.isLogin)
  }

cerrarSesion(){
  this.dbServ.deleteUserInfo()
  setTimeout(() => {
    this.router.navigate(['/'])
  }, 10);
}

  esconderMenu(e) {
    e.preventDefault();
    $('#wrapper').toggleClass('toggled');
  }
}
