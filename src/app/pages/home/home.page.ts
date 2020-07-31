import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PoemasService } from '../../shared/services/poemas.service';
import { Router } from '@angular/router';
import { Comentario } from '../../Interfaces/Comentario';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public comentario: string;
  uidpoesia: string;
  uidpersona: string;
  public poemas: any = [];

  constructor(private authService: AuthService, private poemasService: PoemasService, public router: Router) { }

  ngOnInit() {
    this.poemasService.getPoemas().subscribe( poems => {
      this.poemas = poems;
    });
    this.authService.getUserAuth().subscribe(res => {
      this.uidpersona = res.uid;
      console.log(res.uid);
    });
  }

  crearPoesia(){
    this.router.navigate(['/crearpoesia']);
  }

  crearComentario(uidPoema: string, comentari: string){
   
    console.log(comentari);
    this.poemasService.sendMsgToFirebase(comentari, uidPoema);
    
  }

  onlogout(){
    this.authService.logout();
  }
  
  async loginGoogle2(){
    let conexion = await this.authService.googleLogin();
    if (conexion === undefined){
      this.router.navigate(['/home']);
    }else{
      alert("Algo salio mal!" + JSON.stringify(conexion));

    }
  }
  


}
