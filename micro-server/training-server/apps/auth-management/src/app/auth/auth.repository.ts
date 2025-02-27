import { HttpException, HttpStatus, Inject, Injectable, Logger, RequestTimeoutException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@shared';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AuthRepository extends Repository<Role>{
    constructor(
        private dataSource: DataSource,
        private readonly jwtService: JwtService
        )
    {
        super(Role, dataSource.createEntityManager());
    }

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
      return await this.findOne({
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

  public async createToken(email: string,roleId: number): Promise<any> {
    const token = this.jwtService.sign(
      {
        email,
        roleId
      },
      {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: 30 * 24 * 60 * 60,
      },
    );

    return token;
  }

  public async refreshToken(refreshToken: string){
    try{
      let data = this.jwtService.verify(refreshToken, {ignoreExpiration: true});
      const newAccessToken=this.createToken(data['email'],data['roleId']);
      return newAccessToken;
    }catch(err){
      throw new HttpException('Invalid Token',HttpStatus.UNAUTHORIZED);
    }
}
  validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }

  public async decodeToken(token: string) {

    let result = null;
      try {
        const tokenData = this.jwtService.decode(token) as {
          exp: number;
          userId: any;
          roleId: any;
        };
        if (!tokenData || tokenData.exp <= Math.floor(+new Date() / 1000)) {
          result = null;
        } else {
          result = {
            userId: tokenData.userId,
            roleId: tokenData.roleId,
          };
        }
      } catch (e) {
        result = null;
      }
      return result;
    }
}