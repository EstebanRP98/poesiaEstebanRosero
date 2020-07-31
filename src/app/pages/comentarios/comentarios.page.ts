import { Component, OnInit } from '@angular/core';
import { Comentario } from '../../Interfaces/Comentario';
import { PoemasService } from '../../shared/services/poemas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {
  public comentario: Comentario = new Comentario();

  constructor(private poemasService: PoemasService, public router: Router) { }

  ngOnInit() {
  }

  crearComentario(uidPoema: string, comentario: Comentario){
    this.poemasService.sendMsgToFirebase(comentario, uidPoema);
 }

}
