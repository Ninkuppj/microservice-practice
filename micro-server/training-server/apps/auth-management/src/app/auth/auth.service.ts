import { HttpException, HttpStatus, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { ILoginRespone, IUser, User } from '@shared';
import { firstValueFrom, Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { CONSTANTS } from '@config';

@Injectable()
export class AuthService {
  constructor( 
    @Inject('USER_SERVICE')
    private readonly userService: ClientProxy,
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
  async login(email:string, password:string):Promise<ILoginRespone> {
    try {
      const {user} = await firstValueFrom(this.userService.send('find_user_by_email',email))
      
      if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
      }
      const accessToken = await this.createToken(user.email, user.role.id)
      const refreshToken = await this.createToken(user.email, user.role.id)

    return {
      status: HttpStatus.OK,
      message: CONSTANTS.MASSAGE.AUTH_LOG.LOGIN_SUCCESS,
      data:{
        user:user,
        accessToken,
        refreshToken
      },
      errors:null
    }
    } catch (error) {
      return {
        status:HttpStatus.UNAUTHORIZED,
        message:CONSTANTS.MASSAGE.AUTH_LOG.WRONG_CREDENTIALS,
        data:null,
        errors:error
      }
    }
  }

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
async comparePassword(
    enteredPassword: string,
    dbPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, dbPassword);
  }

  public async createToken(email: string,roleId: number): Promise<any> {
    const token = this.pmsnRepository.createToken(email, roleId);

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