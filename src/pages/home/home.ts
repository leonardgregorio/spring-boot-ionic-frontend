import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = { //Aula 116. Obtendo os dados do formulário de login

    email: "",
    senha: ""
  };

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {//para atualizar o token com refresh token
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization')); //se ok chama o successful com o novo token
        this.navCtrl.setRoot('CategoriasPage');
      },
        error => { });
  }


  login() { //Aula 111 Navegação
    this.auth.authenticate(this.creds)
      .subscribe(response => {//
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
        error => { });
  }


  signup(){
    this.navCtrl.push('SignupPage'); //aula 127 - Push "empilha as paginas"
  }
}
