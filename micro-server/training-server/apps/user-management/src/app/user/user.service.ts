import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IServiceUserSearchResponse,
  IUser,
  LoginDTO,
  User,
  UserDTO,
  createUserDTO,
  udpateUserDTO,
} from '@shared';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { CONSTANTS } from '@config';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: createUserDTO): Promise<any> {
    return this.userRepository.createUser(user);
  }

  async findOne(id: number): Promise<any> {
    return this.userRepository.findUserById(id);
  }
  async searchUserByEmail(
    loginRequest: LoginDTO
  ): Promise<IServiceUserSearchResponse> {
    let result: any;
    const user: User | null = await this.userRepository.searchUserByEmail(
      loginRequest.email
    );
    if (user) {
      if (await this.comparePassword(loginRequest.password, user!.password)) {
        result = {
          status: HttpStatus.OK,
          message: CONSTANTS.MASSAGE.USER_LOG.LOGIN_SUCCESS,
          user: user,
        };
      } else {
        result = {
          status: HttpStatus.NOT_FOUND,
          message: CONSTANTS.MASSAGE.USER_LOG.WRONG_CREDENTIALS,
          user: null,
        };
      }
    } else {
      result = {
        status: HttpStatus.NOT_FOUND,
        message: CONSTANTS.MASSAGE.USER_LOG.NOT_FOUND,
        user: null,
      };
    }
    return result;
  }
  async findAllUser(): Promise<User[]> {
    return this.userRepository.findAllUser();
  }
  async comparePassword(
    enteredPassword: string,
    dbPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, dbPassword);
  }

  async updateUser(user: udpateUserDTO): Promise<any> {
    return this.userRepository.updateUser(user);
  }

  async removeUser(id: number): Promise<any> {
    return await this.userRepository.removeUserById(id);
  }
}
