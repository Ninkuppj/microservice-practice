import { baseModel } from "../../constants";
export class UserDTO extends baseModel{
    username: string;
    password: string;
    email: string;
    role: number;    
}