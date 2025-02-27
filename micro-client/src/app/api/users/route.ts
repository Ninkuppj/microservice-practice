import callAPI from "@/app/lib/api-helper";

export default class UserService {
  private static controller = 'user';
  static async getById(userId: number) {
    const { status , data } = await callAPI(`${UserService.controller}/${userId}`)
    return {status:status , user: data.user};
  }
  static async getByEmail(email: string) {
    const { status , data } = await callAPI(`${UserService.controller}/get-user-by-email`,{method:'POST',
      body:{
        email
      }
    })
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