import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { IsNull, Not } from 'typeorm';
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
  EditUserInfoResponse,
  LoginResponse,
  RegisterUserResponse,
  UserActivationInterface,
  UserAddressInterface,
  UserDeleteAccount,
  UserEditPwdInterface,
  UserInfoResponse,
} from '../types';
import { MailService } from '../mail/mail.service';
import { userActivationToken } from '../utils/user-activation-token';
import { EditUserPwdDto } from './dto/edit-user-pwd.dto';
import { BasketService } from '../basket/basket.service';
import { CheckoutService } from '../checkout/checkout.service';
import { EditUserInfoDto } from './dto/edit-user-info.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => MailService))
    private mailService: MailService,
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,
    @Inject(forwardRef(() => CheckoutService))
    private checkoutService: CheckoutService,
  ) {}

  private static async createUserAddress(
    createUserAddress: CreateUserAddressDto,
    user: UserEntity,
  ) {
    const newUserAddress = new UserAddressEntity();

    for (const [key, value] of Object.entries(createUserAddress)) {
      newUserAddress[key] = value;
    }

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

    newUser.activationToken = userActivationToken(newUser.id);
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
      newUser.activationToken,
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

  async checkIfUserLogged(user: UserEntity): Promise<LoginResponse | null> {
    const userInfo = await UserEntity.findOne({
      where: {
        id: user.id,
        currentTokenId: Not(IsNull()),
      },
    });

    return userInfo
      ? {
          isSuccess: true,
          id: userInfo.id,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          role: userInfo.role,
        }
      : null;
  }

  async findAllUsers(): Promise<UserInfoResponse[]> {
    const users = await UserEntity.find({
      relations: ['address'],
    });

    return users.map((user) => userInfoFilter(user));
  }

  async findUserAddress(user: UserEntity): Promise<UserAddressInterface[]> {
    const userAddressInfo = await UserEntity.findOne({
      where: {
        id: user.id,
      },
      relations: ['address'],
    });

    return userAddressFilter(userAddressInfo);
  }

  async findOneUserAddress(
    addressId: string,
    user: UserEntity,
  ): Promise<UserAddressEntity | null> {
    const singleUserAddress = await UserAddressEntity.findOne({
      where: {
        id: addressId,
        user: user.valueOf(),
      },
    });

    return singleUserAddress ?? null;
  }

  async activateUserAccount(token: string): Promise<UserActivationInterface> {
    const user = await UserEntity.findOne({
      where: {
        activationToken: token,
      },
    });

    if (!user) {
      return {
        isSuccess: false,
        message: "This user doesn't exist",
      };
    } else if (user.active) {
      return {
        isSuccess: false,
        message: 'This user is already activated',
      };
    }

    user.active = true;
    user.activationToken = null;
    await user.save();

    return {
      isSuccess: true,
      message: 'User activation was successful',
    };
  }

  async editUserPassword(
    editUserPwdDto: EditUserPwdDto,
    user: UserEntity,
  ): Promise<UserEditPwdInterface> {
    const currentPassword = hashPassword(
      editUserPwdDto.currentPassword,
      user.pwdSalt,
    );

    const newPassword = hashPassword(editUserPwdDto.newPassword, user.pwdSalt);

    if (user.pwdHash !== currentPassword) {
      return {
        isSuccess: false,
        message: 'Wrong current password! Try again',
      };
    } else if (user.pwdHash === newPassword) {
      return {
        isSuccess: false,
        message: 'Current and new password are the same',
      };
    }

    user.pwdHash = newPassword;
    user.modifiedAt = new Date();
    await user.save();

    await this.mailService.sendUserEditPwdMail(
      user.email,
      'Ecommerce Shop - Change password confirmation',
      user.firstName,
      user.lastName,
    );

    return {
      isSuccess: true,
      message: 'Password changed successfully',
    };
  }

  async editUserInfo(
    editUserInfo: EditUserInfoDto,
    user: UserEntity,
  ): Promise<EditUserInfoResponse> {
    const userInfo = await UserEntity.findOne({
      where: {
        id: user.id,
      },
    });

    for (const [key, value] of Object.entries(editUserInfo)) {
      userInfo[key] = value;
    }

    userInfo.modifiedAt = new Date();
    await userInfo.save();

    return {
      isSuccess: true,
      message: 'User information updated successfully',
    };
  }

  async removeUser(
    userId: string,
    user: UserEntity,
  ): Promise<UserDeleteAccount> {
    if (checkUser(userId, user)) {
      return {
        isSuccess: false,
        message: "You can't delete another user account",
      };
    }

    await this.basketService.clearBasket(user);
    await this.checkoutService.clearOrderHistory(user);

    await UserAddressEntity.delete({
      user: user.valueOf(),
    });

    await user.remove();

    return { isSuccess: true };
  }
}
