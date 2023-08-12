import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Brand } from "./brand.entity";
import { Category } from "./category.entity";

@Entity('product')

export class Product {
  @PrimaryGeneratedColumn('increment')
  @Index({ unique: true })
  id: number;

  @Column({ name: 'code'})
  code: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'description'})
  description: string;

  @Column({ name: 'price', nullable: false })
  price: number;

  @Column({ name: 'isSale' })
  isSale: boolean;

  @Column({ name: 'priceSale' })
  priceSale: number;

  @Column({ name: 'year', nullable: false})

  @Column({ name: 'discountPercentage', nullable: true })
  discountPercentage: number;

  @OneToOne(() => Brand)
  @JoinColumn()
  brand: Brand;

  @ManyToMany(() => Category)
  categorys: Category[];

  @Column({ name: 'image', nullable: true})
  image: string;

  @Column({ name: 'stock', nullable: true})
  stock: number;

  @Column({ name: 'amountSold', nullable: true})
  amountSold: number;

  @Column({ name: 'quantity', nullable: true})
  quantity: number;

  @Column({ name: 'total', nullable: true })
  total: number;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;
}