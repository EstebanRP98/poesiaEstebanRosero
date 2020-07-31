import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-poemas-listar',
  templateUrl: './poemas-listar.component.html',
  styleUrls: ['./poemas-listar.component.scss'],
})
export class PoemasListarComponent implements OnInit {
  
  @Input() poema: any = [];

  constructor( private navCtrl: NavController) { }

  ngOnInit() {}

  clickpoemaUID(uid: string, categoria: string, uidServicio: string){
    this.navCtrl.navigateForward(['/poema', uid, categoria, uidServicio]);
  }



}
