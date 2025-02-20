import { IUser } from "../../interface/user.interface";

export class GetUserAllResponse {
    status: number;
    message: string;
    data?: {
      users: IUser[]|null|undefined;
    };
    errors?: { [key: string]: any }|null;
  }