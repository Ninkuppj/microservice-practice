import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./permission.entity";
@Entity()
export class Role {
 @PrimaryGeneratedColumn()
 id: number;

 @Column()
 name: string;

 @ManyToMany(() => Permission, (permission) => permission.roles)
 @JoinTable()
 permissions: Permission[];
}