import callAPI from "@/app/lib/api-helper";
import { authConfig } from "@/app/lib/auth";
import { getServerSession } from "next-auth";

export default class UserService {
  private static controller = 'user';
  static async login(credentials:any) {
    const response = await callAPI(`${UserService.controller}/login`, {
        method: "POST",
        body: credentials
    });    
    const data = await response;
    return data as any;
}
  static async getById(userId: number) {
    const { status , data } = await callAPI(`${UserService.controller}/${userId}`)
    return {status:status , user: data.user};
  }
  static async deleteUserById(userId: number) {
    return callAPI(`${UserService.controller}/${userId}`,{method:"DELETE"});
  }
  static async getAllUser() {
    return callAPI(`${UserService.controller}`);
  }
  static async update(data: FormData){
    return callAPI(`${UserService.controller}`, {method:"PUT",body:data});
  }
  static async createUser(data: FormData){
    return callAPI(`${UserService.controller}`, {method:"POST",body:data});
  }
}