import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { baseModel } from "../../constants";
import { Role } from "./role.entity";
import { Notification } from "./notification.entity";
@Entity()
export class User extends baseModel{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({length:20})
    username: string;
    @Column({ type: 'varchar' })
    password: string;
    @Column({ type: 'varchar' })
    email: string;
    @Column()
    isActive: boolean;
    @ManyToOne(() => Role, (role) => role.id)
    role: Role; 
    @OneToMany(() => Notification, notification => notification.user)
    notifications: Notification[];   
}