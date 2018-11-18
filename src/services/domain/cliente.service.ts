import { HttpHeaders } from '@angular/common/http';
import { API_CONFIG } from './../../config/api.config';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClienteDTO } from '../../models/cliente.dto';
import { StorageService } from '../storage.service';


//aula 121. Mostrando dados e imagem do cliente para página de profile

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient, public storage: StorageService) {

    }

    findByEmail(email: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    //Aula 146. Tela de confirmação de pedido
    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }

    //aula 121
    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, { responseType: 'blob' });

    }

    //aula 131 Inserindo cliente
    insert(obj: ClienteDTO) { //recebe um obj client dto
        return this.http.post( //faz um post...
            `${API_CONFIG.baseUrl}/clientes`, //no endpoint clientes
            obj, //passando o obj dto
            {
                observe: 'response', //espera uma resposta...
                responseType: 'text' //do tipo texto, que vem como texto para evitar um erro de json
            }
        );
    }
}

/*getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
    return this.http.get(url, { responseType: 'blob' });

}*/

/*  Trocado na aula 143 - Estava diferente do mostrado no video, porem, funcionando
findByEmail(email: string): Observable<ClienteDTO> {

    let token = this.storage.getLocalUser().token;
    let authHeader = new HttpHeaders({ 'authorization': 'Bearer ' + token });

    return this.http.get<ClienteDTO>(
        `${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
        { 'headers': authHeader });
} */