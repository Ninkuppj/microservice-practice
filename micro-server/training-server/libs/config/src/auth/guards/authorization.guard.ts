import {
    Injectable,
    Inject,
    CanActivate,
    ExecutionContext,
    HttpException,
  } from '@nestjs/common';
  import { firstValueFrom } from 'rxjs';
  import { Reflector } from '@nestjs/core';
  import { ClientProxy } from '@nestjs/microservices';
import { decodeToken } from '../../components';
import { JwtService } from '@nestjs/jwt';
import { CONSTANTS } from '../../constants';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private readonly reflector: Reflector,
      @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
      @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
      
    ) {}
  
    public async canActivate(context: ExecutionContext): Promise<boolean> {
      //check token api in request
      const secured = this.reflector.get<string[]>(
        'secured',
        context.getHandler(),
      );
        
      // check permission of user when request
      const routePermissions = this.reflector.get<{roles:number[]; permissions: string[]}>(
        'authorization',
        context.getHandler(),
      );
      if (!routePermissions) {
        return true; // No authorization metadata is specified, allow access by default
      }
      if (!secured) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      
      if (!request.headers.authorization) {
        return false;
      }
      // Bearer <token-string>
      // const userTokenInfo = await this.jwtService.decode()
      const userTokenInfo:any = decodeToken(request.headers.authorization.split(' ')[1]);
 
      
      const userInfo:any = await firstValueFrom(
        this.userServiceClient.send('get_user_by_id', userTokenInfo!.userId as number),
      )
      const roleInfo:any = await firstValueFrom(
        this.authServiceClient.send('get_permission_by_roleId', userTokenInfo!.roleId),
      );
      if(userTokenInfo!.roleId===CONSTANTS.ROLE.SUPER_ADMIN){
        return true;
      }else{
        if (
          !validatePermission(roleInfo.role.permissions || [], routePermissions.permissions) &&
          !validateRole(userTokenInfo?.roleId || [], routePermissions.roles)
        ) {
          console.log(1);
          
          throw new HttpException(
            'You do not have enough privileges to perform this action!',
            403,
          );
      }}

      // const hasRequiredRole = routePermissions.roles.includes(userInfo!.user.role.id);

      // if (!hasRequiredRole) {
      //   return false; // User does not have the required role
      // }
      // Check if the user has all the required permissions
      // const hasRequiredPermission = compareMethod( roleInfo.role.permissions,routePermissions.permissions)
  
      // if (!hasRequiredPermission) {
        
      //   return false; // User does not have the required role
      // }
      
      request.user = userInfo.user;
      return true;
    }
  }
  const validatePermission =(permissionsUser: string[], routePermissions: string[]): boolean =>{
     let isValid=true;
     for (const permission of routePermissions) {
       if(!permissionsUser.some((value)=> value === permission)) {isValid=false;}
     }
     return isValid;
  };
  const validateRole=(userRoles:number, roles: number[])=>{
    return roles.includes(userRoles);
  }
  const compareMethod = (permissionUser:any,permission:any)=>{
    const arrayPermission: string[] =permissionUser.map((el: { action: any; })=> el.action) 
    return arrayPermission.some((pmssn)=> permission.includes(pmssn.trim()))
     
  }