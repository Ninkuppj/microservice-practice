import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class baseModel {
    @Column()
    createBy: string;
    @Column()
    updateBy: string;
    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        select: true,
      })
    createDate: Date;
    @UpdateDateColumn({
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
      select: true,
    })
    updateDate: Date;
}