import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEditPwdInterface } from '../../types';

export class EditUserPwdDto {
  @IsString()
  @MinLength(6)
  @ApiProperty({
    type: String,
    example: 'currentPwd',
    minLength: 6,
  })
  currentPassword: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    type: String,
    example: 'newPwd',
    minLength: 6,
  })
  newPassword: string;
}

export class EditUserPwdResponseProp implements UserEditPwdInterface {
  @ApiProperty()
  isSuccess: boolean;

  @ApiProperty()
  message: string;
}
