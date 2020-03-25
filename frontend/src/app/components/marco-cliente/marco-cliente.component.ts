import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marco-cliente',
  templateUrl: './marco-cliente.component.html',
  styleUrls: ['./marco-cliente.component.css'],
})
export class MarcoClienteComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  esconderMenu(e) {
    e.preventDefault();
    $('#wrapper').toggleClass('toggled');
  }
}
