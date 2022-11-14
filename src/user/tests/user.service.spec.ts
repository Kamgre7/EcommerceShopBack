import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { v4 as uuid } from 'uuid';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { BasketService } from '../../basket/basket.service';
import { CheckoutService } from '../../checkout/checkout.service';
import { MailService } from '../../mail/mail.service';

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

describe('UserService', () => {
  let service: UserService;

  const mockUserRepository = {
    createUser: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((user) =>
      Promise.resolve({
        id: uuid(),
        email: 'email@example.com',
      }),
    ),
  };
  const mockBasketService = {};
  const mockMailService = {};
  const mockCheckoutService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
        {
          provide: BasketService,
          useValue: mockBasketService,
        },
        {
          provide: CheckoutService,
          useValue: mockMailService,
        },
        {
          provide: MailService,
          useValue: mockCheckoutService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user record and return id, mail', async () => {
    expect(await service.createUser(registerDto)).toEqual({
      id: expect.any(String),
      email: registerDto.email,
    });
  });
});
