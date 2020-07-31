import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, public router: Router,  private navCtrl: NavController) { }

  ngOnInit() {
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
