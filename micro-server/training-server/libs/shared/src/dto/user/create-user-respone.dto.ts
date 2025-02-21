import { IUser } from "../../interface";

export class CreateUserResponseDto {
    status: number;
    message: string;
    user?: IUser|null;
    token?: string;
    errors?: { [key: string]: any }|null;
  }