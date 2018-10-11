import { StorageService } from './../services/storage.service';
//Aula 115. Criando um interceptor para tratamento de erros

import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService) {

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
                    case 403:
                        this.handle403();
                        break;
                }
                /* Propaga o erro para o controlador */
                return Observable.throw(errorObj);
            }) as any;
    }

    handle403() {
        /* Faz o tratamento do erro 403, limpando o que tiver no localStorage */
        this.storage.setLocalUser(null);
    }
}
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
}