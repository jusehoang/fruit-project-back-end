import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index({ unique: true })
    @Column({ name: 'username', nullable: false })
    username: string;

    @Column({ name: 'password', nullable: false })
    password: string;

    @Column({ name: 'phone', nullable: false })
    phone: string;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'address', nullable: false })
    address: string

    @Column({ name: 'email', nullable: false })
    email: string;

    @Column({ name: 'role', nullable: false })
    role: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdDate!: Date;

    @UpdateDateColumn()
    updatedDate!: Date;
}