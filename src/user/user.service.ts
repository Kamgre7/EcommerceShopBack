import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { hashPassword, randomSalt } from '../utils/hash-password';
import { UserAddressEntity } from './entities/user-address.entity';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { userAddressFilter, userFilter } from '../utils/user-filter';
import {
  CreateUserAddressResponse,
  RegisterUserResponse,
  UserAddressResponse,
} from '../types';

@Injectable()
export class UserService {
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

    return userFilter(newUser);
  }

  async createAdditionalUserAddress(
    createUserAddressDto: CreateUserAddressDto,
    userId: string,
  ): Promise<CreateUserAddressResponse> {
    const user = await UserEntity.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return { isSuccess: false };
    }

    await UserService.createUserAddress(createUserAddressDto, user);

    return { isSuccess: true };
  }

  async findUserAddress(id: string): Promise<UserAddressResponse[]> {
    const user = await UserEntity.findOne({
      where: {
        id,
      },
      relations: ['address'],
    });

    return userAddressFilter(user);
  }

  /* findAll() {
    return `This action returns all user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }*/
}
