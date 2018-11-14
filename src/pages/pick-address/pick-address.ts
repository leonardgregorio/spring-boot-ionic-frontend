import { StorageService } from './../../services/storage.service';
import { PedidoDTO } from './../../models/pedido.dto';
import { ClienteService } from './../../services/domain/cliente.service';
import { EnderecoDTO } from './../../models/endereco.dto';
//Aula Tela escolha de endereco


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[]; //[] vira uma colecao

  pedido: PedidoDTO; //aula 144 - armazenando dados do pedido

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email) //faz a busca por email
        .subscribe(response => { //retorna para o controlador a resposta e faz o carregamento na variavel items
          this.items = response['enderecos']; //busca apenas o campo enderecos da resposta

          let cart = this.cartService.getCart();

          this.pedido = {  //aula 144 - armazenando dados do pedido
            cliente: { id: response['id'] },
            enderecoDeEntrega: null,
            pagamento: null,
            itens: cart.items.map(x => { return { quantidade: x.quantidade, produto: { id: x.produto.id } } }),
          }
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

  nextPage(item: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = {id: item.id};
    console.log(this.pedido);
  }
}



/* { VALORES MOCKADOS
  id: "1",
  logradouro: "Rua Quinze de Novembro",
  numero: "300",
  complemento: "Apto 200",
  bairro: "Santa Mônica",
  cep: "48293822",
  cidade: {
    id: "1",
    nome: "Uberlândia",
    estado: {
      id: "1",
      nome: "Minas Gerais"
    }
  }
},
{
  id: "2",
  logradouro: "Rua Alexandre Toledo da Silva",
  numero: "405",
  complemento: null,
  bairro: "Centro",
  cep: "88933822",
  cidade: {
    id: "3",
    nome: "São Paulo",
    estado: {
      id: "2",
      nome: "São Paulo"
    }
  }
} */