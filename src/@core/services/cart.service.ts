import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cart } from "../entities/cart.entity";
import { Product } from "../entities/product.entity";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>
  ) {}
  async create() {
    const cart = this.cartRepository.create({
      items: ''
    });

    return await this.cartRepository.save(cart);
  }

  async addItem(item: Product, idCart: string) {
    const cart = await this.cartRepository.findOne(idCart);

    if (!cart) {
      throw new HttpException('Cart not Found!', HttpStatus.NOT_FOUND);
    }

    const items = JSON.parse(cart.items) as Product[];
    items.push(item);
    cart.items = JSON.stringify(items);

    return await this.cartRepository.update(idCart, cart);
  }

  async removeItem(items: Product[], idCart: string) {
    const cart = await this.cartRepository.findOne(idCart);

    if (!cart) {
      throw new HttpException('Cart not found!', HttpStatus.NOT_FOUND);
    }

    let itemsCart = JSON.parse(cart.items) as Product[];
    for (let item of items) {
      itemsCart = itemsCart.filter(itemCart => itemCart.id !== item.id);
    }
    cart.items = JSON.stringify(itemsCart);
    return await this.cartRepository.update(idCart, cart);
  }

  async getCartById(id: string) {
    const cart = await this.cartRepository.findOne(id);

    if (!cart) {
      throw new HttpException('Cart not found!', HttpStatus.NOT_FOUND);
    }

    return cart;
  }
}