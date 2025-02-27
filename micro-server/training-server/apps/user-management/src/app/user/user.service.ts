import { CONSTANTS } from '@config';
import { HttpStatus, Injectable } from '@nestjs/common';
import {
  GetUserDetailResponse,
  LoginDTO,
  User,
  createUserDTO,
  udpateUserDTO
} from '@shared';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: createUserDTO): Promise<any> {
    return this.userRepository.createUser(user);
  }

  async findOne(id: number): Promise<any> {
    return this.userRepository.findUserById(id);
  }
  async findUserByEmail(
    email:string
  ): Promise<GetUserDetailResponse> {
    let result: any;
    const user: User | null = await this.userRepository.findUserByEmail(
      email
    );
    if (user) {
        result = {
          status: HttpStatus.OK,
          message: CONSTANTS.MASSAGE.USER_LOG.GET_USER_SUCCESS,
          user: user,
        };
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
  
  async updateUser(user: udpateUserDTO): Promise<any> {
    return this.userRepository.updateUser(user);
  }

  async deleteUser(id: number): Promise<any> {
    return await this.userRepository.deleteUserById(id);
  }
}
