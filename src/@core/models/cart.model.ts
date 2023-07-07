import { Product } from "../entities/product.entity";
import { Item } from "./item.model";

export class Cart {
  id: string;
  items: Item[]; 
  total: number;
}