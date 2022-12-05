import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { Order } from "./order.entity";

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ name: 'username', nullable: false })
  username: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'phone' })
  phone: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'address' })
  address: string

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'role' })
  role: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;

  @OneToOne(() => Cart)
  @JoinColumn()
  cart: Cart;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}