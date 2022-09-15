import { UserEntity } from '../user/entities/user.entity';
import { RegisterUserResponse, UserAddressResponse } from '../types';

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
