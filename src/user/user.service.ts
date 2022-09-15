import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { hashPassword, randomSalt } from '../utils/hash-password';
import { UserAddressEntity } from './entities/user-address.entity';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { userAddressFilter } from '../utils/userFilter';

@Injectable()
export class UserService {
  async createUser(createUserDto: CreateUserDto) {
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

    const newUserAddress = new UserAddressEntity();
    newUserAddress.address = address;
    newUserAddress.city = city;
    newUserAddress.country = country;
    newUserAddress.mobilePhone = mobilePhone;
    newUserAddress.postalCode = postalCode;

    await newUserAddress.save();

    newUserAddress.user = newUser;
    await newUserAddress.save();

    return { id: newUser.id, email: newUser.email };
  }

  async createUserAddress(
    createUserAddressDto: CreateUserAddressDto,
    userId: string,
  ) {
    const { city, address, country, mobilePhone, postalCode } =
      createUserAddressDto;

    const user = await UserEntity.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return { isSuccess: false };
    }

    const newUserAddress = new UserAddressEntity();
    newUserAddress.address = address;
    newUserAddress.city = city;
    newUserAddress.country = country;
    newUserAddress.mobilePhone = mobilePhone;
    newUserAddress.postalCode = postalCode;

    await newUserAddress.save();

    newUserAddress.user = user;
    await newUserAddress.save();

    return { isSuccess: true };
  }

  async findUserAddress(id: string) {
    const user = await UserEntity.findOne({
      where: {
        id: 'f7d5df5e-d62e-4fd8-bff7-0f5353b216a6',
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