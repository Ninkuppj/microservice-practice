import { IVessel } from "../../interface";
import { IUser } from "../../interface/user.interface";

export class GetVesselAllResponse {
    status: number;
    message: string;
    data?: {
      vessels: IVessel[]|null|undefined;
    };
    errors?: { [key: string]: any }|null;
  }