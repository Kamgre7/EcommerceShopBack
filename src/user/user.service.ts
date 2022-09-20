import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { hashPassword, randomSalt } from '../utils/hash-password';
import { UserAddressEntity } from './entities/user-address.entity';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import {
  checkUser,
  userAddressFilter,
  userFilter,
  userInfoFilter,
} from '../utils/user-filter';
import {
  CreateUserAddressResponse,
  RegisterUserResponse,
  UserAddressResponse,
  UserInfoResponse,
} from '../types';
import { BasketEntity } from '../basket/entities/basket.entity';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => MailService))
    private mailService: MailService,
  ) {}

  private static async createUserAddress(
    { city, address, country, mobilePhone, postalCode }: CreateUserAddressDto,
    user: UserEntity,
  ) {
    const newUserAddress = new UserAddressEntity();
    newUserAddress.address = address;
    newUserAddress.city = city;
    newUserAddress.country = country;
    newUserAddress.mobilePhone = mobilePhone;
    newUserAddress.postalCode = postalCode;

    await newUserAddress.save();

    newUserAddress.user = user;
    await newUserAddress.save();
  }

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<RegisterUserResponse> {
    const {
      firstName,
      lastName,
      password,
      city,
      address,
      country,
      mobilePhone,
      postalCode,
      email,
    } = createUserDto;

    const user = await UserEntity.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return {
        isSuccess: false,
      };
    }

    const newUser = new UserEntity();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.pwdSalt = randomSalt(64);
    newUser.pwdHash = hashPassword(password, newUser.pwdSalt);

    await newUser.save();

    await UserService.createUserAddress(
      { city, address, country, mobilePhone, postalCode },
      newUser,
    );

    await this.mailService.sendUserActivationLinkMail(
      newUser.email,
      'Ecommerce - Registration user link',
      newUser.firstName,
      newUser.lastName,
      newUser.id,
    );

    return userFilter(newUser);
  }

  async createAdditionalUserAddress(
    createUserAddressDto: CreateUserAddressDto,
    user: UserEntity,
  ): Promise<CreateUserAddressResponse> {
    await UserService.createUserAddress(createUserAddressDto, user);

    return { isSuccess: true };
  }

  async findOneUser(
    user: UserEntity,
    userId: string,
  ): Promise<UserInfoResponse> {
    if (checkUser(userId, user)) {
      return {
        isSuccess: false,
        message: "You can't see another user profile",
      };
    }
    const userInfo = await UserEntity.findOne({
      where: {
        id: userId,
      },
      relations: ['address'],
    });
    return userInfoFilter(userInfo);
  }

  async findAllUsers(): Promise<UserInfoResponse[]> {
    const users = await UserEntity.find({
      relations: ['address'],
    });
    return users.map((user) => userInfoFilter(user));
  }

  async findUserAddress(user: UserEntity): Promise<UserAddressResponse[]> {
    return userAddressFilter(user);
  }

  async removeUser(userId: string, user: UserEntity) {
    if (checkUser(userId, user)) {
      return {
        isSuccess: false,
        message: "You can't delete another user account",
      };
    }

    await BasketEntity.delete({
      user: user.valueOf(),
    });

    await UserAddressEntity.delete({
      user: user.valueOf(),
    });

    await user.remove();

    return { isSuccess: true };
  }
}
