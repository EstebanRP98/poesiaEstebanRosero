import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Poema } from '../../Interfaces/poema';
import { Comentario } from '../../Interfaces/Comentario';
import { firestore } from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class PoemasService {

  constructor(private afs: AngularFirestore) { }

  getPoemas(): Observable<any[]>{
    return this.afs.collection('poemas').valueChanges();
  }

  insertPoemas(poema: Poema){
    const refPoema = this.afs.collection('poemas');
    poema.uid = this.afs.createId();
    const param = JSON.parse(JSON.stringify(poema));
    refPoema.doc(poema.uid).set(param, {merge: true});
  }

  getPoemaId( poema_id : string){
    return this.afs.collection('poemas').doc(poema_id).valueChanges();
  }

  sendMsgToFirebase( message : string, poema_id : string){

    this.afs.collection('poemas').doc("8oeyUwtPb1qeM5zX1IsK").update({
      messages : firestore.FieldValue.arrayUnion(message),
    });
  }



}
