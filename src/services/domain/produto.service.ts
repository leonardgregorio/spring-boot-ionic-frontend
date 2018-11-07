import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { ProdutoDTO } from '../../models/produto.dto';

/* aula 133. Carregando produtos de uma dada categoria */

@Injectable()
export class ProdutoService {
    constructor(public http: HttpClient) {

    }

    findById(produto_id: string) { //procura pelos produtos passando o id dele aula 136
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);

    }

    findByCategoria(categoria_id: string) { //procura pelos produtos de determinada categoria
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
    }


    getSmallImageFromBucket(id: string): Observable<any> {//procura pela imagem pequena do produto para listar na pagina de categorias
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`
        return this.http.get(url, { responseType: 'blob' });

    }

    getImageFromBucket(id: string): Observable<any> {//procura pela imagem grande do produto para exibir na tela de produtodetail
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`
        return this.http.get(url, { responseType: 'blob' });

    }
}