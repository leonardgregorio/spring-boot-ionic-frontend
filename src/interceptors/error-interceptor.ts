import { StorageService } from './../services/storage.service';
//Aula 115. Criando um interceptor para tratamento de erros

import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { AlertController, NavController } from 'ionic-angular';
import { FiledMessage } from '../models/filedmessage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        public storage: StorageService,
        public alertCtrl: AlertController) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //console.log("Passou no interceptor");
        return next.handle(req) //manda encaminhar a requisicao
            .catch((error, caught) => { //porem, se tiver algum erro ele faz o processamento abaixo
                let errorObj = error;
                if (errorObj.error) {
                    errorObj = errorObj.error;
                }
                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }

                console.log("Erro detectado pelo interceptor: ");
                console.log(errorObj);

                /* Verifica se o erro é um 403 e invoca um tratamento para ele*/
                switch (errorObj.status) {
                    case 401: //aula 124
                        this.handle401();
                        break;
                    case 403: //aula 123
                        this.handle403();
                        break;
                    /*  case 404:
                       this.handle404();
                         break; */
                    case 422:
                        this.handle422(errorObj);
                        break;
                    default:
                        this.handleDefaultEror(errorObj);
                }
                /* Propaga o erro para o controlador */
                return Observable.throw(errorObj);
            }) as any;
    }


    handle403() {
        /* Faz o tratamento do erro 403, limpando o que tiver no localStorage */
        this.storage.setLocalUser(null);
    }

    /*    handle404() {
           // Faz o tratamento do erro 403, limpando o que tiver no localStorage 
           console.log("Passou nessa bosta");
            this.navCtrl.setRoot('HomePage');
       } */

    handle401() {
        /* Faz o tratamento do erro 401, emitindo um alert*/
        let alert = this.alertCtrl.create({
            title: 'Erro 401: falha de autenticação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    handle422(errorObj) {
        let alert = this.alertCtrl.create({
            title: '422: Erro de validação.',
            message: this.listErrors(errorObj.errors),
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    private listErrors(messages: FiledMessage[]): string {
        let s: string = '';
        for (var i = 0; i < messages.length; i++ ) {
            s = s + '<p> <strong>' + messages[i].filedName + "</strong>: " + messages[i].message +"."+'</p>';
        }
        return s;
    }
    

    handleDefaultEror(errorObj) {
        /* Faz o tratamento dos outros erros que nao 403 e 401 */
        let alert = this.alertCtrl.create({
            title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};