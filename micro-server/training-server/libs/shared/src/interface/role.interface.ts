import { Permission } from "../database";

export interface IGetPermissionByroleIdResponse {
    status: number;
    message: string;
    role: IRole|null;
  }

export interface IRole {
    id: number;
    name: string;
    permissions: Permission[]|null;
}