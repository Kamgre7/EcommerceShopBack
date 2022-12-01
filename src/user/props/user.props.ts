import {
  CreateUserAddressResponse,
  EditUserInfoResponse,
  LoginSuccessfulResponse,
  UserAddressInterface,
  UserEditPwdInterface,
  UserFilterResponse,
  UserInfoSuccessfulResponse,
  UserRole,
} from '../../types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserActivationProp {
  @ApiProperty()
  isSuccess: boolean;

  @ApiProperty()
  message: string;
}

export class UserAddressProp implements UserAddressInterface {
  @ApiProperty()
  id: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  postalCode: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  mobilePhone: number;
}

export class UserInfoResponseProp implements UserInfoSuccessfulResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty({
    type: UserAddressProp,
    isArray: true,
  })
  address: UserAddressProp[];

  @ApiProperty({
    enum: UserRole,
    enumName: 'UserRole',
    default: UserRole.USER,
  })
  role: UserRole;
}

export class LoginSuccessfulResponseProp implements LoginSuccessfulResponse {
  @ApiProperty()
  isSuccess: true;

  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({
    enum: UserRole,
    enumName: 'UserRole',
    default: UserRole.USER,
  })
  role: UserRole;
}

export class CreateUserAddressResponseProp
  implements CreateUserAddressResponse
{
  @ApiProperty()
  isSuccess: boolean;
}

export class UserFilterResponseProp implements UserFilterResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;
}

export class EditUserInfoResponseProp implements EditUserInfoResponse {
  @ApiProperty()
  isSuccess: true;

  @ApiProperty()
  message: string;
}

export class EditUserPwdResponseProp implements UserEditPwdInterface {
  @ApiProperty()
  isSuccess: boolean;

  @ApiProperty()
  message: string;
}

export class RecoverUserPwdResponseProp {
  @ApiProperty()
  isSuccess: boolean;

  @ApiPropertyOptional()
  message: string;
}

export class UserDeleteAccountProp {
  @ApiProperty()
  isSuccess: boolean;

  @ApiPropertyOptional()
  message: string;
}
