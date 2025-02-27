import callAPI from "@/app/lib/api-helper";

export default class AuthService {
  private static controller = 'auth';
  static async login(credentials:any) {
    const response = await callAPI(`${AuthService.controller}/login`, {
        method: "POST",
        body: credentials
    });    
    console.log('credential',response);
    
    const data = await response;
    return data as any;
}
  static async refreshToken(data: FormData){
    return callAPI(`${AuthService.controller}`, {method:"PUT",body:data});
  }
  static async createToken(data: FormData){
    return callAPI(`${AuthService.controller}`, {method:"POST",body:data});
  }
}