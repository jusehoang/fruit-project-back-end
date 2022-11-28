import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('product')

export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Index({ unique: true })
  id: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'price', nullable: false })
  price: number;

  @Column({ name: 'isSale', nullable: false })
  isSale: boolean;

  @Column({ name: 'salePrice', nullable: false })
  salePrice: number;

  @Column({ name: 'saleNumber', nullable: false })
  saleNumber: number;

  @Column({ name: 'isNew', nullable: false })
  isNew: boolean;

  @Column({ name: 'type', nullable: false })
  type: string;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;
}