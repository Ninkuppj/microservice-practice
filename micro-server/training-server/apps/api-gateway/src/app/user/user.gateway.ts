import {
  Controller,
  Post,
  Get,
  Body,
  Inject,
  HttpStatus,
  HttpException,
  Param,
  Res,
  Put,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import {} from '@config';
import {
  CreateUserResponseDto,
  IServiceUserCreateResponse,
  createUserDTO,
  GetUserByIdResponse,
  IServiceUserGetByIdResponse,
  GetUserAllResponse,
  IServiceUserGetAllResponse,
  LoginDTO,
  LoginUserResponseDTO,
  IServiceUserSearchResponse,
  IServiveTokenCreateResponse,
  NotificationDTO,
  udpateUserDTO,
  UpdateUserResponseDto,
  IServiceUserUpdateResponse,
  createNotificationDTO,
} from '@shared';
import { Authorization } from '@config';
import { Permission } from '@config';
import { CONSTANTS } from '@config';
import { CookieEmptyPipe, Cookies } from '@config';
@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
    ) {}

  @Post()
  @Authorization(true)
  @Permission([CONSTANTS.ROLE.ADMIN], [CONSTANTS.PERMISSION.CREATE])
  public async createUser(
    @Body() userRequest: createUserDTO
  ): Promise<CreateUserResponseDto> {
    const createUserResponse: IServiceUserCreateResponse = await firstValueFrom(
      this.userServiceClient.send({cmd: 'user_create'}, userRequest)
    );
    if (createUserResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: createUserResponse.message,
          data: null,
          errors: createUserResponse.errors,
        },
        createUserResponse.status
      );
    }
    
    return {
      status: createUserResponse.status,
      message: createUserResponse.message,
      data: {
        user: createUserResponse.user,
        token: '',
      },
      errors: null,
    };
  }

  @Put()
  @Authorization(true)
  @Permission([CONSTANTS.ROLE.ADMIN], [CONSTANTS.PERMISSION.UPDATE])
  public async updateUser(
    @Body() userRequest: udpateUserDTO
  ): Promise<UpdateUserResponseDto> {
    
    const createUserResponse: IServiceUserUpdateResponse = await firstValueFrom(
      this.userServiceClient.send({cmd: 'user_update_by_id'}, userRequest)
    );
    if (createUserResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: createUserResponse.message,
          data: null,
          errors: createUserResponse.errors,
        },
        createUserResponse.status
      );
    }
    return {
      status: createUserResponse.status,
      message: createUserResponse.message,
      data: {
        user: createUserResponse.data.user,
      },
      errors: null,
    };
  }

  @Get(':id')
  @Authorization(true)
  @Permission([CONSTANTS.ROLE.ADMIN, CONSTANTS.ROLE.USER], [CONSTANTS.PERMISSION.GET])
  public async getUserById(
    @Param('id') id: number
  ): Promise<GetUserByIdResponse> {
    
    const userResponse: IServiceUserGetByIdResponse = await firstValueFrom(
      this.userServiceClient.send('user_get_by_id', id)
    );
    
    return {
      status: userResponse.status,
      message: userResponse.message,
      data: {
        user: userResponse.user,
      },
      errors: null,
    };
  }
  @Delete(':id')
  @Authorization(true)
  @Permission([CONSTANTS.ROLE.ADMIN], [CONSTANTS.PERMISSION.DELETE])
  public async deleteUserById(
    @Param('id') id: number
  ): Promise<any> {

    const userResponse: any = await firstValueFrom(
      this.userServiceClient.send({cmd:'user_delete_by_id'}, id)
    );

    if (userResponse.status === 'error') {
      throw new HttpException(userResponse.message, userResponse.statusCode);
      }
      
    return {
      status: userResponse.status,
      message: 'Successfully deleted the user!',
      data: null,
    };
  }
  @Get()
  public async getAllUser(): Promise<GetUserAllResponse> {
    
    const userResponse: IServiceUserGetAllResponse = await firstValueFrom(
      this.userServiceClient.send('user_get_all',{})
    );
      
    return {
      status: userResponse.status,
      message: userResponse.message,
      data: {
        users: userResponse.users,
      },
      errors: null,
    };
  }
  @Post('login')
  public async loginUser(
    @Body() loginRequest: LoginDTO,@Res({ passthrough: true }) res: Response
  ): Promise<LoginUserResponseDTO> {
    
    const getUserResponse: IServiceUserSearchResponse = await firstValueFrom(
      this.userServiceClient.send('user_search_by_email', loginRequest),
    );
    if (getUserResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: getUserResponse.message,
          data: null,
          errors: null,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const createTokenResponse: IServiveTokenCreateResponse =
      await firstValueFrom(
        this.authServiceClient.send('token_create', {
          userId: getUserResponse.user.user.id,
          roleId: getUserResponse.user.user.role.id
        }),
      );   
      
      const createRefreshTokenResponse: IServiveTokenCreateResponse =
      await firstValueFrom(
        this.authServiceClient.send('token_create', {
          userId: getUserResponse.user.user.id,
          roleId: getUserResponse.user.user.role.id
        }),
      );         
      // res.cookie('auth_token', createTokenResponse.token) beffore use cookie in respone  run command // npm i cookie-parser   // npm i -D @types/cookie-parser
    return {
      status: HttpStatus.OK,
      message: createTokenResponse.message,
      data: {
        accessToken: createTokenResponse.token,
        refreshToken: createRefreshTokenResponse.token,
        user:  getUserResponse.user
      },
      errors: null,
    };
  }

  @Post('token_referesh')
  public async refreshToken(
    @Res({ passthrough: true }) res: Response,
    @Cookies('refresh_token', CookieEmptyPipe) refreshToken: string,
  ) {
    return await this.userServiceClient.send('token_refresh', {
      refreshToken: refreshToken,
    });
  }

}
  