import { StorageService } from './storage.service';
import { LocalUser } from './../models/local_user';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';

//117. Começando a implementar a autenticação

import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper(); //aula 119
    
    constructor(public http: HttpClient, public storage: StorageService) {
    }
    authenticate(creds: CredenciaisDTO) { 
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, //endpoint rest
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    refreshToken() { //metodo para reaproveitar o token disponel 
        return this.http.post( //aula 125
            `${API_CONFIG.baseUrl}/auth/refresh_token`, //endpoint rest
            {},
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(authorizationValue: string) {
        let tok = authorizationValue.substring(7);
        let user: LocalUser = {
            token: tok,
            email:  this.jwtHelper.decodeToken(tok).sub //aula 119
        };
        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
    }



}