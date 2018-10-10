import { StorageService } from './../../services/storage.service';
import { STORAGE_KEYS } from './../../config/storage_keys.config';
import { LocalUser } from './../../models/local_user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  email: string; //aula 120


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService) {
  }



  ionViewDidLoad() {

    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email){
      this.email = localUser.email;
    }
  }

}
