import { Controller, HttpStatus, Post } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { AuthService } from "./auth.service";
import { IGetPermissionByroleIdResponse, IRole, ITokenDataResponse } from '@shared';
import { CONSTANTS, decodeToken } from "@config";
@Controller()
export class AuthController {
  constructor(private readonly tokenService: AuthService) {}

  @MessagePattern('token_create')
  // @Post()
  public async createToken(data: { userId: number; roleId: number }): Promise<ITokenDataResponse> {
    let result: ITokenDataResponse;
    
    if (data && data.userId) {
      try {
        const createResult = await this.tokenService.createToken(data.userId, data.roleId);
        result = {
          status: HttpStatus.CREATED,
          message: CONSTANTS.MASSAGE.AUTH_LOG.CREATE_SUCCESSFULLY,
          token: createResult,
        };
      } catch (e) {
        result = {
          status: HttpStatus.BAD_REQUEST,
          message: CONSTANTS.LOG_MESSAGE_REQUEST.BAD_REQUEST,
          token: null,
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: CONSTANTS.MASSAGE.AUTH_LOG.CREATE_TOKEN_FAIL,
        token: null,
      };
    }

    return result;
  }
  @MessagePattern('token_refresh')
  public async refreshToken(data:{
    refreshToken: string
  } ): Promise<ITokenDataResponse>{
      const tokenData = await this.tokenService.refreshToken(data.refreshToken);
      return {
        status: tokenData ? HttpStatus.OK : HttpStatus.UNAUTHORIZED,
        message: tokenData ? CONSTANTS.MASSAGE.AUTH_LOG.CREATE_SUCCESSFULLY : CONSTANTS.LOG_MESSAGE_REQUEST.UNAUTHORIZED,
        token: tokenData,
      }
  }

  @MessagePattern('token_decode')
  public async decodeToken(data: {
    token: string;
  }): Promise<ITokenDataResponse> {
    
    const tokenData = decodeToken(data.token);
    return {
      status: tokenData ? HttpStatus.OK : HttpStatus.UNAUTHORIZED,
      message: tokenData ? CONSTANTS.MASSAGE.AUTH_LOG.DECODE_TOKEN_SUCCESSFULL : CONSTANTS.LOG_MESSAGE_REQUEST.UNAUTHORIZED,
      token: tokenData,
    };
  }

  @MessagePattern('get_permission_by_roleId')
  public async getPermissionByRoleId (roleId: number): Promise<IGetPermissionByroleIdResponse> {
    
    if (!!roleId) {
      try {
      const  role:IRole = await this.tokenService.getPermissionByroleId(roleId);
      
      return {
        status: HttpStatus.OK,
        message: CONSTANTS.LOG_MESSAGE_REQUEST.SUCCESS,
        role : role,
        };
        
  }
  catch (err) {
    return {
      message: err.message,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      role: null
      };
      }
      } else {
        return {
          message: CONSTANTS.LOG_MESSAGE_REQUEST.NOT_FOUND,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          role: null
          };
    }
  }
}