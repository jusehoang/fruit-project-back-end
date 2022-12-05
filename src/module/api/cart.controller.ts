import { Controller, Injectable, Post } from "@nestjs/common";
import { CartService } from "src/@core/services/cart.service";

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  addItemToCart() {}
}