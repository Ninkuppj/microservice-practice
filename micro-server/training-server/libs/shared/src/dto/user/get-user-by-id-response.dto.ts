import { IUser } from "../../interface/user.interface";

export class GetUserDetailResponse {
    status: number;
    message: string;
    data: {
      user: IUser|null;
    };
    errors?: { [key: string]: any }|null;
  }