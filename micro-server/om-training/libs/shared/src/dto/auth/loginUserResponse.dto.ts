import { IUser } from "../../interface";

export class LoginUserResponseDTO {
    status: number;
    message: string;
    data: {
        accessToken: string | null;
        refreshToken: string | null;
        user?: IUser|null;
      };
    errors: { [key: string]: any }|null;
  }