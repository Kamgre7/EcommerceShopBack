import { UserEntity } from '../user/entities/user.entity';
import {
  RegisterUserResponse,
  UserAddressInterface,
  UserInfoSuccessfulResponse,
  UserRole,
} from '../types';

export const userAddressFilter = (user: UserEntity): UserAddressInterface[] => {
  const { address } = user;
  return address.map(
    ({ id, address, city, postalCode, country, mobilePhone }) => ({
      id,
      address,
      city,
      postalCode,
      country,
      mobilePhone,
    }),
  );
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
