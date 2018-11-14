// aula 144. Armazenamento dos dados do pedido
//

import { RefDTO } from './ref.dto';
export interface ItemPedidoDTO {
    quantidade: number;
    produto: RefDTO
}