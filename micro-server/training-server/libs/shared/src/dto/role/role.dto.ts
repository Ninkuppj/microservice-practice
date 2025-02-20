import { Permission } from "../../database";
export class RoleDTO {
 id: number;
 name: string;
 permissions: Permission[];
}