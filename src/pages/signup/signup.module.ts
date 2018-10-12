import { EstadoService } from './../../services/domain/estado.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { CidadeService } from '../../services/domain/cidade.service';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],

  /*Diferente de outros servicos, estado e cidade 
    são instanciados apenas no escopo do signup, 
    enquanto outros servicos foram regisrados no
    applicationCache.module.ts */
  providers: [
    CidadeService,
    EstadoService
  ]
})
export class SignupPageModule { }
