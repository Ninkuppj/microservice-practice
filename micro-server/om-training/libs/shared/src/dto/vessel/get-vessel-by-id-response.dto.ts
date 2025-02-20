import { IVessel } from "../../interface";
import { IUser } from "../../interface/user.interface";

export class GetVesselByIdResponse {
    status: number;
    message: string;
    data: {
      vessel: IVessel|null;
    };
    errors?: { [key: string]: any }|null;
  }