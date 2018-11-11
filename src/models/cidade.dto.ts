import { EstadoDTO } from './estado.dto';
//aula 129

export interface CidadeDTO{
    id : string;
    nome: string;

    //Aula Tela escolha de endereco
    estado?: EstadoDTO; //? vira um campo opcional
}