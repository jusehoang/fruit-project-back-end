import { User } from 'src/@core/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'products', nullable: false })
  products: string;

  @Column({ name: 'totalItem', nullable: false })
  totalItem: number;

  @Column({ name: 'totalCost', nullable: false })
  totalCost: number;

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}