import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor( 
  private readonly pmsnRepository: AuthRepository,
  ) {}

  // async validateUser(username: string, password: string): Promise<any> {
    
  //   try {
  //       const user = await this.userService.findOne({role:'user', cmd: 'get'}, {username}).pipe(
  //           timeout(5000),
  //           catchError(err => {
  //               if (err instanceof TimeoutError) {
  //                   return throwError(()=> new RequestTimeoutException());
  //               }
  //               return throwError(()=> err);
  //           }),).toPromise();

  //           if(compareSync(password, user?.password)){
  //             return user;
  //           }
  //           return null;
  //   } catch (error) {
  //       Logger.log(error);
  //       throw error;
  //   }
  // }

  public async getPermissionByroleId (roleId: number): Promise<any>{
    try {
      return await this.pmsnRepository.findOne({
      relations: {
        permissions:true
      },
      where: {
        id: roleId
      }})
      // .pipe(
      //   timeout(5000),
      //   catchError(err => {
      //       if (err instanceof TimeoutError) {
      //           return throwError(()=> new RequestTimeoutException());
      //       }
      //       return throwError(()=> err);
      //   }),).toPromise();
    } catch (error) {
        Logger.log(error);
        throw error;
    };
  }

  public async createToken(userId: number,roleId: number): Promise<any> {
    const token = this.pmsnRepository.createToken(userId, roleId);

    return token;
  }

  public async refreshToken(refreshToken: string){
    try{
      let newAccessToken = this.pmsnRepository.refreshToken(refreshToken);
      return newAccessToken;
    }catch(err){
      throw new HttpException('Invalid Token',HttpStatus.UNAUTHORIZED);
    }
}
  validateToken(jwt: string) {
    return this.pmsnRepository.validateToken(jwt);
  }
}