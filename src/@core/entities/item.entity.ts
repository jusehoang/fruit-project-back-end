import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { Product } from "./product.entity";

@Entity('item')
export class Item extends Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quantity', nullable: false})
  quantity: number;

  @Column({ name: 'total', nullable: false })
  total: number;

  @ManyToOne(() => Cart, cart => cart.items)
  cart: Cart;
}