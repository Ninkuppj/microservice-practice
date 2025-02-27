import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common';

import {
  Authorization,
  CONSTANTS
} from '@config';
import {
  ClientProxy,
  MessagePattern
} from '@nestjs/microservices';
import {
  CreateUserResponseDto,
  GetUserDetailResponse,
  IServiceUserGetAllResponse,
  IServiceUserGetByIdResponse,
  IServiceUserSearchResponse,
  IServiveTokenCreateResponse,
  IUser,
  LoginDTO,
  createUserDTO,
  udpateUserDTO
} from '@shared';
import { firstValueFrom } from 'rxjs';
import { UserService } from './user.service';
// import { Authorization, CONSTANTS, Permission } from '@config';

@Controller()
export class UserController {
  constructor(
    // @Inject('NOTIFICATIONS_SERVICE')
    // private readonly notificationServiceClient: ClientKafka,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    private readonly userService: UserService
  ) {}

  @MessagePattern({cmd: 'create_user'})
  async createUser(
    @Body() user: createUserDTO
  ): Promise<CreateUserResponseDto> {

    const userDTO: IUser = await this.userService.createUser(user);
    if (userDTO) {
      // const notice: createNotificationDTO = {
      //   title: `Your's profile just created`,
      //   desc: `${user.username}'s profile has been created by Admin`,
      //   // url:`/users/profile?id=${createUserResponse.user._id}` ,
      //   // type:'info'
      //   isSeen: true,
      //   email: userDTO.email,
      //   user: userDTO.id,
      //   updateBy: user.updateBy,
      //   createBy: user.updateBy,
      // };

      // await this.notificationServiceClient.emit('Create_Message', notice);
      return {
        status: HttpStatus.OK,
        message: CONSTANTS.LOG_MESSAGE_REQUEST.SUCCESS,
        user: userDTO,
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: CONSTANTS.LOG_MESSAGE_REQUEST.BAD_REQUEST,
      };
    }
  }
  @MessagePattern('find_user_by_email')
  @Get('find_user_by_email')
  async findByEmail(email:string): Promise<GetUserDetailResponse>{

      const result= await this.userService.findUserByEmail(email);
    return result;
  }

  @MessagePattern('get_all_user')
  @Get()
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

  @MessagePattern('get_user_by_id')
  @Get(':id')
  @Authorization(true)
  async findOne(@Query('id') id: number): Promise<IServiceUserGetByIdResponse> {
    
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

  @MessagePattern({cmd: 'update_user_by_id'})
  @Put()
  async updateUser(
    @Body() user: udpateUserDTO
  ): Promise<CreateUserResponseDto> {
    const userUpdate: any = await this.userService.updateUser(user);

    if (userUpdate) {
      return {
        status: HttpStatus.OK,
        message: CONSTANTS.MASSAGE.USER_LOG.CREATE_USER_SUCCESSFULL,
        user: userUpdate,
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: CONSTANTS.LOG_MESSAGE_REQUEST.FAILED,
      };
    }
  }

  @MessagePattern({cmd: 'delete_user_by_id'})
  @Delete(':id')
  async removeUser(@Param('id') id: number): Promise<any> {
    try {
      // await this.notificationServiceClient.emit('Delete_Message_By_userId', id);
      await this.userService.deleteUser(id);
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
}
