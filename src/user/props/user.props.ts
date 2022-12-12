import {
  CreateUserAddressResponse,
  EditUserInfoResponse,
  LoginSuccessfulResponse,
  UserEditPwdInterface,
  UserFilterResponse,
  UserInfoSuccessfulResponse,
  UserRole,
} from '../../types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { userApiInformation, userApiMessage } from '../../utils/api-messages';
import { CreateUserAddressDto } from '../dto/create-user-address.dto';

export class UserActivationProp {
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isSuccess: boolean;

  @ApiProperty({
    type: String,
    example: userApiMessage.activateUserAccountResponse,
  })
  message: string;
}

export class UserAddressProp extends CreateUserAddressDto {
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: userApiInformation.addressId,
  })
  id: string;
}

export class UserInfoResponseProp implements UserInfoSuccessfulResponse {
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: userApiInformation.userId,
  })
  id: string;

  @ApiProperty({
    type: String,
    example: userApiInformation.firstName,
  })
  firstName: string;

  @ApiProperty({
    type: String,
    example: userApiInformation.lastName,
  })
  lastName: string;

  @ApiProperty({
    type: String,
    example: userApiInformation.email,
  })
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

  @ApiProperty({
    type: String,
    example: userApiInformation.userId,
  })
  id: string;

  @ApiProperty({
    type: String,
    example: userApiInformation.firstName,
  })
  firstName: string;

  @ApiProperty({
    type: String,
    example: userApiInformation.lastName,
  })
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
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isSuccess: boolean;
}

export class UserFilterResponseProp implements UserFilterResponse {
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: userApiInformation.userId,
  })
  id: string;

  @ApiProperty({
    type: String,
    example: userApiInformation.email,
  })
  email: string;
}

export class EditUserInfoResponseProp implements EditUserInfoResponse {
  @ApiProperty()
  isSuccess: true;

  @ApiProperty({
    type: String,
    example: userApiMessage.editUserInfoResponse,
  })
  message: string;
}

export class EditUserPwdResponseProp implements UserEditPwdInterface {
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isSuccess: boolean;

  @ApiProperty({
    type: String,
    example: userApiMessage.editUserPwdResponse,
  })
  message: string;
}

export class RecoverUserPwdResponseProp {
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isSuccess: boolean;

  @ApiPropertyOptional()
  message: string;
}

export class UserDeleteAccountProp {
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isSuccess: boolean;

  @ApiPropertyOptional({
    type: String,
  })
  message: string;
}
