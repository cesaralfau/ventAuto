import { Component, OnInit } from '@angular/core';
import { DBservice } from 'src/app/services/bdservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private dbServ:DBservice, private router: Router) { }

  ngOnInit() {
  }

  async revisarSesion(){
    const sesionIsValid = await this.dbServ.isLoggedIn()
    
    if(sesionIsValid){
      this.router.navigate(['/home/publicarVehiculo']);
    }else{
      this.router.navigate(['/home/login']);
      this.dbServ.deleteUserInfo()
    }
  }

}
