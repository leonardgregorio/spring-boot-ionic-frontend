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

    findByEmail(email: string): Observable<ClienteDTO> {

        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({ 'authorization': 'Bearer ' + token });

        return this.http.get<ClienteDTO>(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
            { 'headers': authHeader });
    }

    //aula 121
    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, { responseType: 'blob' });

    }

}

/*getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
    return this.http.get(url, { responseType: 'blob' });

}*/