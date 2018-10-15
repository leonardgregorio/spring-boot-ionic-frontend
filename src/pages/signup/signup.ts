import { ClienteService } from './../../services/domain/cliente.service';
import { EstadoService } from './../../services/domain/estado.service';
import { CidadeService } from './../../services/domain/cidade.service';
//aula 127 
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[]; //aula 129
  cidades: CidadeDTO[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController) {

    /* Faz a instanciação do form group da pagina
    de cadastro, entre os [] estão as validações
    sintaticas que são definidas no bakend */
    this.formGroup = this.formBuilder.group({
      nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      tipo: ['1', [Validators.required]],
      cpfOuCnpj: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['123', [Validators.required]],
      logradouro: ['Rua Via', [Validators.required]],
      numero: ['25', [Validators.required]],
      complemento: ['Apto 3', []],
      bairro: ['Copacabana', []],
      cep: ['10828333', [Validators.required]],
      telefone1: ['977261827', [Validators.required]],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]]
    });
  }

  ionViewDidLoad() {
    this.estadoService.findAll() //Se ocorrer tudo bem, chama a linha subscribe...
      .subscribe(response => {
        this.estados = response; //e a resposta entra no vetor
        this.formGroup.controls.estadoId.setValue(this.estados[0].id); //seta o primeiro valor do vetor para o item estado do form
        this.updateCidades();
      },
        error => { }
      );

  }

  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
      },
        error => { }
      );
  }


  signupUser() {
    this.clienteService.insert(this.formGroup.value)
      .subscribe(Response => {
        this.showInsertOk(); // se sucesso, chama uma msg de sucesso
      },
        error => { }
      );
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({ // cria o alert com o conteudo abaixo
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso.',
      enableBackdropDismiss: false,
      buttons: [ //com o botão ok
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop(); //funcao para desempilhar a pagina
          }
        }
      ]
    });
    alert.present(); //Exibe o alerta
  }
}
