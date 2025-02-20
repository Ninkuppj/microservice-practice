import { IUser, IVessel } from "../../interface";

export class UpdateVesselResponseDto {
    status: number;
    message: string;
    data?: {
      vessel: IVessel|null;
    };
    errors?: { [key: string]: any }|null;
  }