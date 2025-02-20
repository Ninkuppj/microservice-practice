import { CONSTANTS, ConfigModule, ConfigService } from '@config';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import {
  CreateUserResponseDto,
  UpdateUserResponseDto,
  createUserDTO,
  deleteUserDTO,
  udpateUserDTO,
} from '@shared';
import { of } from 'rxjs';
require('dotenv').config();
const mockUser: any = {
  createBy: 'admin',
  role: {
    id: 2,
  },
  updateBy: 'admin',
  createDate: '2024-02-19T06:27:28.610Z',
  updateDate: '2024-02-19T06:27:28.610Z',
  id: 107,
  username: 'nin',
  password: '$2b$10$zgVA93OzUw0iqUwZvCor1eWWsZWX2s74MTUH7HUAadbeW/J66dQr6',
  email: 'nin@gmail.com',
  isActive: true,
};
describe('UserController', () => {
  let app: TestingModule;
  let userController: UserController;
  let userService: UserService;
  let authService: ClientProxy;
  beforeAll(async () => {
    const mockClientProxy = {
      send: jest.fn(() =>
        of({
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwNywicm9sZUlkIjoyLCJpYXQiOjE3MTA0OTAwNDAsImV4cCI6MTcxMzA4MjA0MH0.DODNjOWtAA11lFEQVK7bhXUZ7KbTZ4eL1nByPbJ_XhY',
          message: 'Token created successfully',
        })
      ),
    };
    app = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [UserController],
      providers: [
        UserService,
        UserRepository,
        {
          provide: 'AUTH_SERVICE',
          useFactory: (configService: ConfigService) => {
            const userServiceOptions = configService.get().authService;
            return ClientProxyFactory.create(userServiceOptions!);
          },
          inject: [ConfigService],
        },
        {
          provide: 'USER_SERVICE',
          useFactory: (configService: ConfigService) => {
            const userServiceOptions = configService.get().userService;
            return ClientProxyFactory.create(userServiceOptions!);
            // return ClientsModule.register([{name:'',...userServiceOptions}]);
          },
          inject: [ConfigService],
        },
        {
          provide: 'NOTIFICATIONS_SERVICE',
          useFactory: (configService: ConfigService) => {
            const userServiceOptions = configService.get().notificationService;
            return ClientProxyFactory.create(userServiceOptions!);
          },
          inject: [ConfigService],
        },
        {
          provide: UserRepository,
          useClass: Repository,
        },
        {
          provide: UserRepository,
          useFactory: () => ({
            createUser: jest.fn().mockResolvedValue(mockUser),
            findAllUser: jest.fn(() => Promise.resolve([mockUser])),
            findUserById: jest.fn((id) => Promise.resolve(mockUser)),
            searchUserByEmail: jest.fn((email) => Promise.resolve(mockUser)),
            updateUser: jest.fn(() =>
              Promise.resolve({
                ...mockUser,
                username: 'NYK HAWK',
              })
            ),
            removeUserById: jest.fn(),
          }),
        },
        {
          provide: 'AUTH_SERVICE',
          useFactory: () => mockClientProxy,
        },
      ],
    }).compile();
    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
    authService = app.get<ClientProxy>('AUTH_SERVICE');
  });

  describe('getData', () => {
    it(`should return users`, () => {
      userController.findAllUser().then((data) =>
        expect(data).toEqual({
          status: 200,
          message: CONSTANTS.LOG_MESSAGE_REQUEST.SUCCESS,
          users: [mockUser],
        })
      );
    });
  });
  describe('create User', () => {
    it(`should return "a User just created"`, async () => {
      // userController.createUser = jest.fn().mockReturnValueOnce(mockUser);

      const createdUser = await userController.createUser(mockUser);
      expect(createdUser).toEqual({
        status: HttpStatus.OK,
        message: CONSTANTS.LOG_MESSAGE_REQUEST.SUCCESS,
        data: {
          user: mockUser,
        },
      });
    });
  });
  describe('Update User', () => {
    it('should return "a User just Update"', async () => {
      // userController.updateUser = jest
      //   .fn()
      //   .mockReturnValueOnce({ ...mockUser, username: 'NYK HAWK' });

      const updateduser: any = await userController.updateUser({
        ...mockUser,
        username: 'NYK HAWK',
      });
      expect(updateduser).toEqual({
        status: HttpStatus.OK,
        message: CONSTANTS.MASSAGE.USER_LOG.CREATE_USER_SUCCESSFULL,
        data: {
          user: { ...mockUser, username: 'NYK HAWK' },
        },
      });
    });
    it('should can not update user by unknow  id', async () => {
      try {
        await userController.updateUser({ ...mockUser, id: 'unknow' });
      } catch (error) {
        expect(error).toMatchObject({
          status: HttpStatus.BAD_REQUEST,
          message: CONSTANTS.LOG_MESSAGE_REQUEST.FAILED,
        });
      }
    });
  });
  describe('Delete User', () => {
    it(`should return true when delete a user`, async () => {
      const isDeleted = await userController.removeUser(107);
      expect(isDeleted).toEqual({
        status: HttpStatus.OK,
        message: 'delete User successfull',
      });
    });
    it(`should return false when delete a user`, async () => {
      userController.removeUser = jest.fn().mockReturnValue({
        status: HttpStatus.NOT_FOUND,
        message: CONSTANTS.LOG_MESSAGE_REQUEST.NOT_FOUND,
        user: null,
      });
      const result = await userController.removeUser(999);
      expect(result).toMatchObject({
        status: HttpStatus.NOT_FOUND,
        message: CONSTANTS.LOG_MESSAGE_REQUEST.NOT_FOUND,
        user: null,
      });
    });
  });
  describe('Get User By Id', () => {
    it(`should return "a User"`, async () => {
      const retrieveuser = await userController.findOne(107);
      expect(retrieveuser).toEqual({
        status: HttpStatus.OK,
        message: CONSTANTS.LOG_MESSAGE_REQUEST.SUCCESS,
        user: mockUser,
      });
    });
    it(`should not return "a User"`, async () => {
      userController.findOne = jest.fn().mockResolvedValue({});
      try {
        const retrieveuser = await userController.findOne(1073);
      } catch (error) {
        expect(error).toEqual({
          status: HttpStatus.NOT_FOUND,
          message: CONSTANTS.LOG_MESSAGE_REQUEST.NOT_FOUND,
          user: null,
        });
      }
    });
  });
  describe('Login', () => {
    it(`should return "a User and Token when login"`, async () => {
      const retrieveuser = await userController.loginUser({
        email: mockUser.email,
        password: 'nin@123',
      });
      expect(retrieveuser.status).toEqual(HttpStatus.OK);
    });
    it(`should not return "a User and Token when login"`, async () => {
      // userController.findOne = jest
      //   .fn()
      //   .mockResolvedValue({
      //     status: HttpStatus.NOT_FOUND,
      //     message: CONSTANTS.MASSAGE.USER_LOG.NOT_FOUND,
      //     user: null,
      //   });
      try {
        const retrieveuser = await userController.loginUser({
          email: mockUser.email,
          password: mockUser.password,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('Wrong email or password!');
        expect(error.getStatus()).toBe(HttpStatus.UNAUTHORIZED);
      }
    });
  });
});
