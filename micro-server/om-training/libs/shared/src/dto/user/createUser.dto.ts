import { IsEmail, IsInt, IsString } from "class-validator";
import { baseModel } from "../../constants";
import { Role } from "../../database";
export class createUserDTO extends baseModel{
    @IsString()
    username: string;
    @IsString()
    password: string;
    @IsEmail()
    email: string;
    @IsInt()
    role: Role;  
}