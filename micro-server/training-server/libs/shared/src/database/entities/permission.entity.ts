import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { baseModel } from "../../constants";
import { Role } from "./role.entity";
@Entity()
export class Permission extends baseModel {
    @PrimaryColumn('char',{length:10})
    id: number;
  
    @Column()
    action: string;

    @ManyToMany(() => Role, (role) => role.permissions)
    roles: Role[];
}