import { IVessel } from "../../interface";

export class CreateVesselResponseDto {
    status: number;
    message: string;
    data?: {
      vessel: IVessel|null;
    };
    errors?: { [key: string]: any }|null;
  }