import { Product } from "../entities/product.entity";

export interface Item extends Product {
  quantity?: number;
  total?: number;
}