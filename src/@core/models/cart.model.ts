import { Product } from "../entities/product.entity";

export class Cart {
  id: string;
  items: Product[]; 
  total: number;
}