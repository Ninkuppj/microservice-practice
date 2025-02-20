import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { baseModel } from "../../constants";
import { User } from "./user.entity";
@Entity()
export class Notification extends baseModel{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({length:250})
    desc: string;
    @Column()
    isSeen:boolean;
    @Column()
    title: string;
    @ManyToOne(() => User, user => user.notifications,
    {onDelete: 'CASCADE' }
    )
    @JoinColumn([{ name: "userId", referencedColumnName: "id"}])
    user?: User;
}