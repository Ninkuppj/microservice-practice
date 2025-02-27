import { CONSTANTS } from '@config';
import { HttpException, Injectable } from '@nestjs/common';
import { User, createUserDTO, udpateUserDTO } from '@shared';
import * as bcrypt from 'bcrypt';
import { DataSource, Repository } from 'typeorm';
@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async createUser(user: createUserDTO): Promise<any> {
    try {
      return this.save({
        ...user,
        password: await this.hashPassword(user.password),
      });
    } catch (e) {
      throw new HttpException(
        CONSTANTS.LOG_MESSAGE_REQUEST.BAD_REQUEST,
        400 // Bad Request
      );
    }
  }

  async findUserById(id: number): Promise<any> {
    return this.findOne({
      relations: {
        role: true,
      },
      where: { id: id },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    
    return await this.findOne({
      relations: {
        role: true,
      },
      where: { email: email },
    });
  }
  async findAllUser(): Promise<any> {
    return this.find();
  }

  async updateUser(user: udpateUserDTO): Promise<any> {
    return this.update(user.id, user).then(() =>
      this.findOne({ where: { id: user.id } })
    );
  }

  async deleteUserById(id: number): Promise<any> {
    return await this.delete(id);
  }

  async hashPassword(password: string) {
    password = await bcrypt.hash(password, 10).then((data) => {
      return data;
    });
    
    return password;
  }
}
