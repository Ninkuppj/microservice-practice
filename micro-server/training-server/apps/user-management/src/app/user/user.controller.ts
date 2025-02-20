import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  AuthGuard,
  Authorization,
  CONSTANTS,
  Permission,
  decodeToken,
} from '@config';
import {
  ClientKafka,
  ClientProxy,
  MessagePattern,
} from '@nestjs/microservices';
import {
  CreateUserResponseDto,
  CustomExceptionFilter,
  GetUserByIdResponse,
  IServiceUserGetAllResponse,
  IServiceUserGetByIdResponse,
  IServiceUserSearchResponse,
  IServiveTokenCreateResponse,
  ITokenDataResponse,
  IUser,
  LoginDTO,
  StringValidationPipe,
  User,
  UserDTO,
  ValidationInterceptor,
  createNotificationDTO,
  createUserDTO,
  udpateUserDTO,
} from '@shared';
import { UserService } from './user.service';
import { firstValueFrom } from 'rxjs';
// import { Authorization, CONSTANTS, Permission } from '@config';

@Controller()
@UseGuards(AuthGuard)
@UseFilters(CustomExceptionFilter)
export class UserController {
  constructor(
    @Inject('NOTIFICATIONS_SERVICE')
    private readonly notificationServiceClient: ClientKafka,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    private readonly userService: UserService
  ) {}

  // @MessagePattern({cmd: 'user_create'})
  @Post()
  @UseInterceptors(new ValidationInterceptor(createUserDTO))
  @Authorization(true)
  @Permission([CONSTANTS.ROLE.ADMIN], [CONSTANTS.PERMISSION.CREATE])
  async createUser(
    @Body() user: createUserDTO
  ): Promise<CreateUserResponseDto> {
    const userDTO: IUser = await this.userService.createUser(user);
    if (userDTO) {
      const notice: createNotificationDTO = {
        title: `Your's profile just created`,
        desc: `${user.username}'s profile has been created by Admin`,
        // url:`/users/profile?id=${createUserResponse.user._id}` ,
        // type:'info'
        isSeen: true,
        email: userDTO.email,
        user: userDTO.id,
        updateBy: user.updateBy,
        createBy: user.updateBy,
      };

      await this.notificationServiceClient.emit('Create_Message', notice);
      return {
        status: HttpStatus.OK,
        message: CONSTANTS.LOG_MESSAGE_REQUEST.SUCCESS,
        data: {
          user: userDTO,
        },
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: CONSTANTS.LOG_MESSAGE_REQUEST.BAD_REQUEST,
      };
    }
  }
  @MessagePattern('user_search_by_email')
  @Get('user_search_by_email')
  async findByEmail(searchParams: {
    email: string;
    password: string;
  }): Promise<GetUserByIdResponse>{
    let result : any;

    if (searchParams.email && searchParams.password) {
      const user= await this.userService.searchUserByEmail(searchParams);
      
    if (user) {
      if (await this.userService.comparePassword(searchParams.password, user.user.password) ) {
        result = {
          status: HttpStatus.OK,
          message: 'user_search_by_credentials_success',
          user: user,
        };
      } else {
        result = {
          status: HttpStatus.NOT_FOUND,
          message: 'user_search_by_credentials_not_match',
          user: null,
        };
      }
    } else {
      result = {
        status: HttpStatus.NOT_FOUND,
        message: 'user_search_by_credentials_not_found',
        user: null,
      };
    }
  } else {
    result = {
      status: HttpStatus.NOT_FOUND,
      message: 'user_search_by_credentials_not_found',
      user: null,
    };
  }
    return result;
  }

  @Get()
  @Authorization(true)
  // @Permission([CONSTANTS.ROLE.ADMIN], [CONSTANTS.PERMISSION.GET])
  async findAllUser(): Promise<IServiceUserGetAllResponse> {
    const users: IUser[] = await this.userService.findAllUser();
    if (users) {
      return {
        status: HttpStatus.OK,
        message: CONSTANTS.LOG_MESSAGE_REQUEST.SUCCESS,
        users: users,
      };
    } else {
      return {
        status: HttpStatus.FORBIDDEN,
        message: CONSTANTS.LOG_MESSAGE_REQUEST.FORBIDDEN,
      };
    }
  }

  @MessagePattern('user_get_by_id')
  @Get(':id')
  @Permission([CONSTANTS.ROLE.ADMIN], [CONSTANTS.PERMISSION.GET])
  async findOne(@Param('id') id: number): Promise<IServiceUserGetByIdResponse> {
    const user: IUser = await this.userService.findOne(id);

    if (user) {
      return {
        status: HttpStatus.OK,
        message: CONSTANTS.LOG_MESSAGE_REQUEST.SUCCESS,
        user: user,
      };
    } else {
      return {
        status: HttpStatus.NOT_FOUND,
        message: CONSTANTS.LOG_MESSAGE_REQUEST.NOT_FOUND,
        user: null,
      };
    }
  }

  @MessagePattern({cmd: 'user_update_by_id'})
  @Put()
  @UseInterceptors(new ValidationInterceptor(udpateUserDTO))
  @Authorization(true)
  @Permission([CONSTANTS.ROLE.ADMIN], [CONSTANTS.PERMISSION.UPDATE])
  async updateUser(
    @Body() user: udpateUserDTO
  ): Promise<CreateUserResponseDto> {
    const userUpdate: any = await this.userService.updateUser(user);

    if (userUpdate) {
      const notice: createNotificationDTO = {
        title: `Your's profile just updated`,
        desc: `${user.username}'s profile has been updated by Admin`,
        // url:`/users/profile?id=${createUserResponse.user._id}` ,
        // type:'info'
        isSeen: true,
        email: userUpdate.email,
        user: userUpdate.id,
        updateBy: user.updateBy,
        createBy: user.updateBy,
      };

      await this.notificationServiceClient.emit('Create_Message', notice);
      return {
        status: HttpStatus.OK,
        message: CONSTANTS.MASSAGE.USER_LOG.CREATE_USER_SUCCESSFULL,
        data: {
          user: userUpdate,
        },
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: CONSTANTS.LOG_MESSAGE_REQUEST.FAILED,
      };
    }
  }

  @MessagePattern({cmd: 'user_delete_by_id'})
  @Delete(':id')
  @Authorization(true)
  @Permission([CONSTANTS.ROLE.ADMIN], [CONSTANTS.PERMISSION.DELETE])
  async removeUser(@Param('id') id: number): Promise<any> {
    try {
      await this.notificationServiceClient.emit('Delete_Message_By_userId', id);
      await this.userService.removeUser(id);
      return {
        status: HttpStatus.OK,
        message: 'delete User successfull',
      };
    } catch {
      return {
        status: HttpStatus.NOT_FOUND,
        message: CONSTANTS.LOG_MESSAGE_REQUEST.NOT_FOUND,
        user: null,
      };
    }
  }
  @Post('login')
  public async loginUser(@Body() loginRequest: LoginDTO): Promise<any> {
    const getUserResponse: IServiceUserSearchResponse =
      await this.userService.searchUserByEmail(loginRequest);
    if (getUserResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: getUserResponse.message,
          data: null,
          errors: null,
        },
        HttpStatus.UNAUTHORIZED
      );
    }
    const createTokenResponse: IServiveTokenCreateResponse =
      await firstValueFrom(
        this.authService.send('token_create', {
          userId: getUserResponse.user.id,
          roleId: getUserResponse.user.role.id,
        })
      );

    const createRefreshTokenResponse: IServiveTokenCreateResponse =
      await firstValueFrom(
        this.authService.send('token_create', {
          userId: getUserResponse.user.id,
          roleId: getUserResponse.user.role.id,
        })
      );
    // res.cookie('auth_token', createTokenResponse.token) beffore use cookie in respone  run command // npm i cookie-parser   // npm i -D @types/cookie-parser
    return {
      status: HttpStatus.OK,
      message: createTokenResponse.message,
      data: {
        accessToken: createTokenResponse.token,
        refreshToken: createRefreshTokenResponse.token,
        user: getUserResponse.user,
      },
      errors: null,
    };
  }
}
