import { Test } from '@nestjs/testing';

import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { DataSource, Repository } from 'typeorm';
import {
  CreateUserResponseDto,
  UpdateUserResponseDto,
  User,
  createUserDTO,
  deleteUserDTO,
  udpateUserDTO,
} from '@shared';
import { CONSTANTS } from '@config';
import { HttpStatus } from '@nestjs/common';
const mockUser: any = {
  createBy: 'admin',
  updateBy: 'admin',
  createDate: '2024-02-19T06:27:28.610Z',
  updateDate: '2024-02-19T06:27:28.610Z',
  id: 107,
  username: 'nin',
  password: '$2b$10$zgVA93OzUw0iqUwZvCor1eWWsZWX2s74MTUH7HUAadbeW/J66dQr6',
  email: 'ninn@gmail.com',
  isActive: true,
};
describe('AppService', () => {
  let service: UserService;
  let repository: UserRepository;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useClass: Repository,
        },
        {
          provide: UserRepository,
          useFactory: () => ({
            createUser: jest.fn((data) => Promise.resolve(mockUser)),
            comparePassword: jest.fn<Promise<boolean>, [string, string]>(() =>
              Promise.resolve(true)
            ),
            findAllUser: jest.fn((id) => Promise.resolve([mockUser])),
            findUserById: jest.fn((id) => Promise.resolve(mockUser)),
            findUserByEmail: jest.fn((email) => Promise.resolve(mockUser)),
            updateUser: jest.fn<any, [udpateUserDTO]>((data) =>
              Promise.resolve({ ...mockUser, username: 'NYK HAWK' })
            ),
            deleteUserById: jest.fn((id) => Promise.resolve(true)),
          }),
        },
      ],
    }).compile();

    service = app.get<UserService>(UserService);
    repository = app.get<UserRepository>(UserRepository);
  });

  describe('findAllUser', () => {
    it('should return "All User in Service"', () => {
      service.findAllUser().then((data) => expect(data).toEqual([mockUser]));
    });
  });
  describe('findOne', () => {
    it('should return "a User in Service"', () => {
      service
        .findOne(mockUser.id)
        .then((data) => expect(data).toEqual(mockUser));
    });
    it('should return "a User in Service"', () => {
      service.findOne(999).catch((error) => {
        expect(error).toMatchObject({
          status: HttpStatus.NOT_FOUND,
          message: CONSTANTS.MASSAGE.USER_LOG.NOT_FOUND,
          user: null,
        });
      });
    });
  });
  describe('createUser', () => {
    it('should return "User just Create in Service"', async () => {
      // Mocking the createUser method\
      // jest.spyOn(repository, 'createUser').mockResolvedValue(mockUser);
      jest.spyOn(repository, 'save').mockResolvedValue(mockUser);
      const createdUser = await service.createUser(mockUser);
      // Verify that the method was called with the correct arguments
      expect(createdUser).toStrictEqual(mockUser);
      expect(repository.createUser).toHaveBeenCalledWith(mockUser);
      // expect(repository.save).toHaveBeenCalledWith(mockUser);
    });
    it('should do not Create User in Service"', async () => {
      // Mocking the createUser method\
      jest.spyOn(repository, 'save').mockResolvedValue(mockUser);
      service.createUser = jest.fn();
      const createdUser = await service.createUser(mockUser);
      expect(createdUser).toEqual(undefined);
      // Verify that the method was called with the correct arguments
      expect(service.createUser).toHaveBeenCalledWith(mockUser);
    });
  });
  describe('findUserByEmail', () => {
    it('should return "user by email of User in service"', () => {
      // Mocking the getUserById method
      service
        .findUserByEmail({ email: mockUser.email, password: 'nin@123' })
        .then((data) => {
          expect(data).toEqual({
            status: 200,
            message: CONSTANTS.MASSAGE.USER_LOG.LOGIN_SUCCESS,
            user: mockUser,
          });
        });
    });
    it('should can not search by password wrong', async () => {
      try {
        await service.findUserByEmail({
          email: 'ninn@gmail.com',
          password: '',
        });
      } catch (error) {
        expect(error).toMatchObject({
          status: HttpStatus.NOT_FOUND,
          message: CONSTANTS.MASSAGE.USER_LOG.WRONG_CREDENTIALS,
          user: null,
        });
      }
    });
    it('should can not search by email unknown', async () => {
      try {
        service.findUserByEmail = jest.fn().mockReturnValue(() =>
          Promise.resolve({
            status: HttpStatus.NOT_FOUND,
            message: CONSTANTS.MASSAGE.USER_LOG.NOT_FOUND,
            user: null,
          })
        );
        await service.findUserByEmail({ email: '@gmail.com', password: '' });
      } catch (error) {
        expect(error).toEqual({
          status: HttpStatus.NOT_FOUND,
          message: CONSTANTS.MASSAGE.USER_LOG.NOT_FOUND,
          user: null,
        });
      }
    });
  });
  describe('updateUser', () => {
    it('should return "user just updated"', () => {
      service
        .updateUser({ ...mockUser, username: 'NYK HAWK' })
        .then((result) => {
          expect(result).toStrictEqual({ ...mockUser, username: 'NYK HAWK' });
        });
    });
  });
  describe('removeUser', () => {
    it('should delete User', async () => {
      const isDeleted = await service.deleteUser(mockUser.id);
      expect(isDeleted).toEqual(true);
      // Verify that the method was called with the correct argument
    });
  });
});
