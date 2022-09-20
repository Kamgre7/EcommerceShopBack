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

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
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

export interface UserInfoSuccessfulResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: UserAddressResponse[];
}

export interface UserInfoFailedResponse {
  isSuccess: false;
  message: string;
}

export type UserInfoResponse =
  | UserInfoSuccessfulResponse
  | UserInfoFailedResponse;

export interface UserActivationInterface {
  isSuccess: boolean;
  message: string;
}

export interface UserEditPwdInterface {
  isSuccess: boolean;
  message: string;
}

export type UserDeleteAccount =
  | { isSuccess: true }
  | {
      isSuccess: false;
      message: string;
    };
