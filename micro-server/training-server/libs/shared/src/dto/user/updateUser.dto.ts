import { Role } from "../../database";
export class udpateUserDTO {
    id: number;
    username: string;
    password: string;
    isActive:boolean;
    email: string;
    role: Role;
    updateBy: string;
    updateDate: Date;
}