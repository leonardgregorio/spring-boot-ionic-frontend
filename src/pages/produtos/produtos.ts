import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';
/* aula 132 criando pagina de produtos
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { subscribeOn } from 'rxjs/operator/subscribeOn';


@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, //a partir desse objeto conseguimos parametros passados na navegacaos
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id'); //usa o navparms para pegar o valor da pagina html associada
    this.produtoService.findByCategoria(categoria_id) //chama a busca por produtos da categoria
      .subscribe(response => {
        this.items = response['content'];
        this.loadImageUrls();
      },
        error => { });
  }

  loadImageUrls() {//chama a funcao para buscar a imagem no produtoService para cada item da pagina
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
          error => { });
    }
  }

  //exibe em datalhes um produto
  showDetail(produto_id: string) { //recebe o parametro do produto
    this.navCtrl.push('ProdutoDetailPage', { produto_id: produto_id }); //passa o parametro para a ProdutoDetailPage
    //push abre  uma pagina por cima
  }
}
