import { ProdutoDTO } from './../../models/produto.dto';
import { Cart } from './../../models/cart';
import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";

//aula 137. Criando página de carrinho de compras

@Injectable()
export class CartService {
    constructor(
        public storage: StorageService) {
    }

    //metodo para criar ou limpar o carrinho
    createOrClearCart(): Cart {
        let cart: Cart = { items: [] };
        this.storage.setCart(cart);
        return cart;
    }

    //metodo para obter o carrinho
    getCart(): Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }
        return cart;
    }

    //adicionar um produto ao carrinho
    addProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position == -1) {//-1 não existe ainda
            cart.items.push({ quantidade: 1, produto: produto });
        }
        this.storage.setCart(cart);
        return cart;
    }

    //remover um produto do carrinho
    removeProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {//-1 não existe ainda
            cart.items.splice(position, 1); //splice remove um item da lista
        }
        this.storage.setCart(cart);
        return cart;
    }


    //add 1 item a um produto do carrinho
    increaseQuantity(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {//-1 não existe ainda
            cart.items[position].quantidade++; //add + 1 na quantidade do produto na lista
        }
        this.storage.setCart(cart);
        return cart;
    }

    //remove 1 item a um produto do carrinho
    decreaseQuantity(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {//-1 não existe ainda
            cart.items[position].quantidade--; //remove 1 na quantidade do produto na lista
            if (cart.items[position].quantidade < 1) {
                cart = this.removeProduto(produto);
            }
        }
        this.storage.setCart(cart);
        return cart;
    }

    total(): number {
        let cart = this.getCart();
        let sum = 0;

        for (var i = 0; i < cart.items.length; i++) {
            sum += cart.items[i].produto.preco * cart.items[i].quantidade;
        }
        return sum;
    }
}
