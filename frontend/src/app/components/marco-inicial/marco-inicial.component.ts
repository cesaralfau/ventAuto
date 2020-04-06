import { Component, OnInit } from '@angular/core';
import { DBservice } from 'src/app/services/bdservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marco-inicial',
  templateUrl: './marco-inicial.component.html',
  styleUrls: ['./marco-inicial.component.css'],
})
export class MarcoInicialComponent implements OnInit {
  cuenta;
  isLogin: any;
  constructor(private dbServ: DBservice, private router: Router) {}

  async ngOnInit() {
    try {
      this.isLogin = await this.dbServ.isLoggedIn();
      this.cuenta = JSON.parse(this.dbServ.getUserInfo());
    } catch (error) {}
  }

  logOut() {
    this.dbServ.deleteUserInfo();
    this.router.navigateByUrl('/');
  }
}
