import { Brand } from "../entities/brand.entity";

export interface ProductRequest {
  name: string;
  price: number;
  isNew: boolean;
  saleNumber: number;
  category: Brand;
}