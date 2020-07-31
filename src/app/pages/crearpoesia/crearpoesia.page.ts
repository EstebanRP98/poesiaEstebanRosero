import { Component, OnInit } from '@angular/core';
import { PoemasService } from '../../shared/services/poemas.service';
import { Poema } from '../../Interfaces/poema';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearpoesia',
  templateUrl: './crearpoesia.page.html',
  styleUrls: ['./crearpoesia.page.scss'],
})
export class CrearpoesiaPage implements OnInit {
  poesia: Poema = new Poema();
  constructor(private poemasService: PoemasService, public router: Router) { }

  ngOnInit() {
  }

  crearPoesia(){
    this.poemasService.insertPoemas(this.poesia);
    this.router.navigate(['home']);
  }

  actualizarFotoIcono(data){
    this.poesia.imagen = data.url;
  }
  cancelar(){
    this.router.navigate(['home']);
  }

}
