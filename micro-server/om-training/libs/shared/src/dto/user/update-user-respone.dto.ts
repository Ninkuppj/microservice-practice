import { IUser } from "../../interface";

export class UpdateUserResponseDto {
    status: number;
    message: string;
    data?: {
      user: IUser|null;
    };
    errors?: { [key: string]: any }|null;
  }