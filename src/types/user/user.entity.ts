export interface UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  pwdHash: string;
  pwdSalt: string;
  currentTokenId: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface UserAddressInterface {
  id: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  mobilePhone: number;
}

export interface UserFilterResponse {
  id: string;
  email: string;
}

export type RegisterUserResponse =
  | {
      isSuccess: false;
    }
  | UserFilterResponse;

export interface CreateUserAddressResponse {
  isSuccess: boolean;
}

export type UserAddressResponse = Omit<UserAddressInterface, 'id'>;
