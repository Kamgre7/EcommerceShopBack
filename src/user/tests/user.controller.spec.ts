import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { UserRole } from '../../types';
import { UserEntity } from '../entities/user.entity';

const registerDto = {
  firstName: 'FirstName',
  lastName: 'LastName',
  password: 'qwerty123',
  email: 'test@example.com',
  postalCode: '112334',
  country: 'Germany',
  address: 'Street 12z',
  city: 'Berlin',
  mobilePhone: 123456789,
};

const updateDto = {
  firstName: 'FirstName',
  lastName: 'LastName',
  email: 'test@example.com',
};

const user = {
  id: uuid(),
  firstName: 'FirstName',
  lastName: 'LastName',
  email: 'test@example.com',
  pwdHash: 'string1234',
  pwdSalt: 'string1234',
  currentTokenId: uuid(),
  role: UserRole.USER,
  activationToken: null,
  createdAt: new Date(),
  modifiedAt: new Date(),
  active: true,
};

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    createUser: jest.fn((registerDto) => ({
      id: uuid(),
      email: registerDto.email,
    })),

    editUserInfo: jest.fn((updateDto, user) => ({
      isSuccess: true,
      message: 'User information updated successfully',
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    expect(controller.createUser(registerDto)).toEqual({
      id: expect.any(String),
      email: 'test@example.com',
    });

    expect(mockUserService.createUser).toHaveBeenCalled();
  });

  it('should update a user', () => {
    expect(controller.editUserInfo(user as UserEntity, updateDto)).toEqual({
      isSuccess: true,
      message: expect.any(String),
    });
  });
});
