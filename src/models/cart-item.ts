//aula 137. Criando página de carrinho de compras


import { ProdutoDTO } from './produto.dto';

export interface CartItem {
    quantidade: number,
    produto: ProdutoDTO
}