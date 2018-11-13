import { HomePage } from './../home/home';
import { API_CONFIG } from './../../config/api.config';
import { ClienteService } from './../../services/domain/cliente.service';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO; //aula 121

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService) {
  }



  ionViewDidLoad() {

    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email) //faz a busca por email
        .subscribe(response => { //retorna para o controlador a resposta cliente e invoca o metodo para procurar imagem do cliente
          this.cliente = response as ClienteDTO //conforme aula 143 - Onde removemos a tipagem da busca por email;
          this.getImageIfExists();
        },
          error => {
            if (error.status == 403) { //se for um error 403 invoca a pagina home
              this.navCtrl.setRoot('HomePage'); //aula 123
            }
          });
    }
    else {
      this.navCtrl.setRoot('HomePage'); //caso occora algum erro na condição do if, retorna para homepage
    }
  }

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response => {
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
      },
        error => { });
  }
}

