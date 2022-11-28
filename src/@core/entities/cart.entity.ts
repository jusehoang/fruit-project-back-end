import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'items'})
  items: string;
}