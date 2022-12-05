import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Brand } from "./brand.entity";

@Entity('product')

export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Index({ unique: true })
  id: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'price', nullable: false })
  price: number;

  @Column({ name: 'isSale' })
  isSale: boolean;

  @Column({ name: 'salePrice' })
  salePrice: number;

  @Column({ name: 'saleNumber', nullable: false })
  saleNumber: number;

  @OneToOne(() => Brand)
  @JoinColumn()
  brand: Brand;

  @Column({ name: 'image'})
  image: string;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;
}