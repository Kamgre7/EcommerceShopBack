import { UserEntity } from '../user/entities/user.entity';
import {
  RegisterUserResponse,
  UserAddressResponse,
  UserInfoSuccessfulResponse,
  UserRole,
} from '../types';

export const userAddressFilter = (user: UserEntity): UserAddressResponse[] => {
  const { address } = user;
  return address.map(({ address, city, postalCode, country, mobilePhone }) => ({
    address,
    city,
    postalCode,
    country,
    mobilePhone,
  }));
};

export const userFilter = (user: UserEntity): RegisterUserResponse => {
  const { id, email } = user;
  return { id, email };
};

export const userInfoFilter = (
  user: UserEntity,
): UserInfoSuccessfulResponse => {
  const { id, firstName, lastName, email } = user;

  return {
    id,
    firstName,
    lastName,
    email,
    address: userAddressFilter(user),
  };
};

export const checkUser = (userId: string, user: UserEntity) =>
  user.id !== userId && user.role !== UserRole.ADMIN;
