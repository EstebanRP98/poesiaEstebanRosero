import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { switchMap, first, take, map } from "rxjs/operators";

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { auth } from 'firebase';

import * as firebase from "firebase/app";
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<any>;


  constructor(private AFauth: AngularFireAuth, private router: Router,private platform: Platform, private google: GooglePlus, private db: AngularFirestore) { 
      this.user = this.AFauth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.db.doc<any>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      );
  }

  async sendVerificationEmail(): Promise<void>{
    return (await this.AFauth.currentUser).sendEmailVerification();
  }

  login(email: string, passwd: string){
    return new Promise((resolve, rejected) => {
      this.AFauth.signInWithEmailAndPassword(email, passwd).then(user => {
        resolve(user);
      }).catch(err => {
        rejected(err);
      });
    });
  }

  logout(){
    this.AFauth.signOut().then(() => {
      this.google.disconnect();
      this.router.navigate(['/home']);
    });
  }

  loginwithgoogle(){
    return this.google.login({}).then(res => {
      // tslint:disable-next-line: variable-name
      const user_data_google = res;
      return this.AFauth.signInWithCredential(auth.GoogleAuthProvider.credential(null, user_data_google.accessToken));
    });
  }

  async googleLogin() {
    if (this.platform.is("cordova")) {
      return await this.nativeGoogleLogin();
    } else {
      return await this.webGoogleLogin();
    }
  }

  async nativeGoogleLogin(): Promise<void> {
    try {
      const gplusUser: any = await this.google.login({
        webClientId: environment.googleWebClientId,
        offline: true
      });
      const googleCredential = firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken);
      const firebaseUser = await firebase.auth().signInWithCredential(googleCredential);
      return await this.updateUserData(firebaseUser, "google");
    } catch (err) {
      console.error("Error Login google - native" + JSON.stringify(err));
      return err;
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.AFauth.signInWithPopup(provider);
      return await this.updateUserData(credential.user, "google");
    } catch (err) {
      console.error("Error Login google - web" + JSON.stringify(err));
      return err;
    } 
  }

  register(email: string, password: string, name: string, rol:number ){
    return new Promise ((resolve, reject) => {
      this.AFauth.createUserWithEmailAndPassword(email, password).then(res => {
        const uid = res.user.uid;
        this.db.collection('users').doc(uid).set({
          name: name,
          rol:rol,
          uid: uid
        });
        resolve(res);
      }).catch(error => reject(error));
    });
  }

  resetpassword(email: string){
    return this.AFauth.sendPasswordResetEmail(email);
  }

  getUserAuth(){
    return this.AFauth.authState;
  }

  userExists(email: string) {
    console.log("userExists",email);
    return this.db
      .collection("users", ref => ref.where("email", "==", email))
      .valueChanges()
      .pipe(first())
      .toPromise();
  }

  async updateUserData(usertemp: any, provider: any) {
    console.log("update", JSON.stringify(usertemp));
    const doc: any = await this.userExists(usertemp.email);
    let data: any;
    let user: any = JSON.parse(JSON.stringify(usertemp));
    console.log("Esto es el doc");
    console.log("doc", JSON.stringify(doc));
    if (doc == null || doc == "") {
      //Crear cuenta
      data = {
        uid: user.uid,
        email: user.email || null,
        displayName: user.displayName || '',
        photoURL: user.photoURL || "https://goo.gl/7kz9qG",
        provider: provider,
        lastLogin: new Date(Number(user.lastLoginAt)) || new Date(),
        createdAt: new Date(Number(user.createdAt)) || new Date(),
        rol: 0
      };
    } else if (doc.active == false) {
      throw { error_code: 999, error_message: "Acceso denegado, servicio deshabilitado, consulte con el administrador." };
    } else {
      //Actualizar cuenta
      data = {
        uid: user.uid,
        email: user.email || null,
        displayName: user.displayName || '',
        photoURL: user.photoURL || "https://goo.gl/7kz9qG",
        provider: provider,
        lastLogin: new Date(Number(user.lastLoginAt)) || new Date()
      };
    }
    console.log("Esto es la data");
    console.log("data", JSON.stringify(data))
    const userRef = this.db.collection<any>('users');

    return userRef.doc(`${user.uid}`).set(data, { merge: true });
  } 


}

 

