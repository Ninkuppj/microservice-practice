import { Test, TestingModule } from '@nestjs/testing';

import { CONSTANTS } from '@config';
import { HttpStatus } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { UserRepository } from './user.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@shared';
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
describe('UserRepository', () => {
  let repositories: UserRepository;

  // beforeAll(async () => {
  //   const app = await Test.createTestingModule({
  //     providers: [
  //       UserRepository,
  //       {
  //         provide: getRepositoryToken(UserRepository),
  //         useFactory: () => ({
  //           createUser: jest.fn().mockResolvedValue(mockUser),
  //           updateUser: jest
  //             .fn()
  //             .mockResolvedValue({ ...mockUser, username: 'NYK HAWK' }),
  //           findUserById: jest.fn().mockResolvedValue(mockUser),
  //           searchUserByEmail: jest.fn().mockResolvedValue(mockUser),
  //           findAllUser: jest.fn().mockResolvedValue([mockUser]),
  //           removeUserById: jest.fn((id) => Promise.resolve(true)),
  //         }),
  //       },
  //       {
  //         provide: Repository<User>,
  //         useFactory: () => ({
  //           save: jest.fn((data) => Promise.resolve(mockUser)),
  //           update: jest.fn((data) =>
  //             Promise.resolve({ ...mockUser, username: 'NYK HAWK' })
  //           ),
  //           find: jest.fn((data) => Promise.resolve([mockUser])),
  //           findOne: jest.fn((id) => Promise.resolve(mockUser)),
  //           // searchUserByEmail: jest.fn((id) => Promise.resolve(mockUser)),
  //           delete: jest.fn((id) => Promise.resolve(true)),
  //         }),
  //       },
  //     ],
  //   }).compile();

  //   repositories = app.get<UserRepository>(UserRepository);
  // });
  let mockDataSource: Partial<DataSource>;

  beforeEach(async () => {
    mockDataSource = {
      createEntityManager: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    repositories = module.get<UserRepository>(UserRepository);
  });

  // describe('findAllUser', () => {
  //   it('should return "All User in repositories"', () => {
  //     repositories
  //       .findAllUser()
  //       .then((data) => expect(data).toEqual([mockUser]));
  //   });
  // });
  describe('findOne', () => {
    it('should return "a User in repositories"', async () => {
      const mockFindOne = jest.fn().mockResolvedValue('foundUser');
      repositories.findOne = mockFindOne;

      const userId = 1;
      const result = await repositories.findUserById(userId);

      expect(mockFindOne).toHaveBeenCalledWith({
        relations: { role: true },
        where: { id: userId },
      });
      expect(result).toBe('foundUser');
    });
    it('should return "a User in repositories"', async () => {
      repositories.findUserById = jest.fn();
      const result = await repositories.findUserById(999);
      expect(result).toEqual(undefined);
    });
  });
  describe('createUser', () => {
    it('should return "User just Create in repositories"', async () => {
      // Mocking the createUser method\
      const mockSave = jest.fn().mockResolvedValue('createdUser');
      repositories.save = mockSave;

      const createUserDTO = {
        /* user data */
      };
      const result = await repositories.createUser(mockUser);

      // expect(mockSave).toHaveBeenCalledWith({
      //   ...createUserDTO,
      //   password: expect.any(String), // Assuming hashPassword works correctly
      // });
      expect(result).toBe('createdUser');
    });
    //   it('should do not Create User in repositories"', async () => {
    //     repositories.createUser = jest.fn();
    //     const createdUser = await repositories.createUser({} as any);
    //     expect(createdUser).toEqual(undefined);
    //   });
    // });
    // describe('searchUserByEmail', () => {
    //   it('should return "user by email of User in repositories"', () => {
    //     // Mocking the getUserById method
    //     repositories.searchUserByEmail('nin@123').then((data) => {
    //       expect(data).toEqual(mockUser);
    //     });
    //   });
  });
  // describe('updateUser', () => {
  //   it('should return "user just updated"', () => {
  //     repositories
  //       .updateUser({ ...mockUser, username: 'NYK HAWK' })
  //       .then((result) => {
  //         expect(result).toStrictEqual({ ...mockUser, username: 'NYK HAWK' });
  //       });
  //   });
  // });

  // describe('removeUser', () => {
  //   it('should delete User', async () => {
  //     const isDeleted = await repositories.removeUserById(mockUser.id);
  //     expect(isDeleted).toEqual(true);
  //     // Verify that the method was called with the correct argument
  //   });
  // });
});
